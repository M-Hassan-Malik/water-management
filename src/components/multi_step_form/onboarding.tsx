import {
  Alert,
  Box,
  ButtonGroup,
  chakra,
  Flex,
  Progress,
} from "@chakra-ui/react";
import axios from "axios";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useMutation, useQuery } from "react-query";

import { Core, MultiStepForm } from "@/components";
import { OnboardSubAdmin, UserById } from "@/services/api";
import { verifyJWT } from "@/utils/helpers/jwt";

import { Icons } from "../icons";
import { validationSchema } from "./complete_profile.validator";

interface IOnboardingProps {}

const Onboarding: React.FunctionComponent<IOnboardingProps> = (_props) => {
  const [cookies] = useCookies(["auth"]);

  const router = useRouter();
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(33.33);
  const [userId, setUserId] = useState<string>("");
  const [success, setSuccess] = useState<IAlertSuccessData>();
  const [fail, setFail] = useState<IAlertSuccessData>();
  const [formCompleted, setFormCompleted] = useState(false);
  const [profilePicture, setProfilePicture] = useState("");
  const [parkLogo, setParkLogo] = useState("");

  const setUser = useCallback(() => {
    if (cookies?.auth) {
      const verified = verifyJWT(cookies?.auth);
      if (verified) setUserId(verified.id);
    } else {
      router.replace("/auth/login");
    }
  }, []);

  const [initialValues, setInitialValues] = useState<CompleteProfileInputs>({
    user_id: "",
    step1: {
      first_name: "",
      last_name: "",
      profile_img: "",
    },
    step2: {
      park_logo: "",
      park_name: "",
    },
    step3: {
      city: "Los Angeles",
      country: "US",
      facility: "",
      state: "CA",
      address: "",
      GPS: { lat: 33.84870341736182, lng: -117.85884079920385 },
    },
  });

  const getFormDataFromLocalStorage = () => {
    const formData = localStorage.getItem("form_data");
    const parsedData = formData !== null ? JSON.parse(formData) : null;
    return parsedData !== null ? parsedData : {};
  };

  const saveFormDataToLocalStorage = (stepNo: number, data: any) => {
    const formData = localStorage.getItem("form_data");
    let parsedData = formData !== null ? JSON.parse(formData) : null;
    if (parsedData === null) {
      parsedData = {};
    }
    if (stepNo === 1) {
      parsedData.user_id = userId;
    }
    parsedData[`step${stepNo}`] = data;
    localStorage.setItem("form_data", JSON.stringify(parsedData));
  };

  const { mutate: onBoardingMutation } = useMutation(OnboardSubAdmin, {
    async onSuccess() {
      setSuccess({
        status: true,
        title: "Submitted",
        description: "Information added successfully.",
      });
      setFormCompleted(true);
      localStorage.removeItem("form_data");
      localStorage.setItem("path", "/dashboard");
      setTimeout(() => {
        router.replace("/dashboard");
      }, 500);
    },
    onError(err: any) {
      setFail({
        status: true,
        title: "Something went wrong",
        description: err?.response?.errors[0]?.message,
      });
    },
  });

  const {
    handleSubmit,
    handleChange,
    values,
    errors,
    touched,
    isSubmitting,
    setSubmitting,
    setValues,
    setFieldValue,
    handleBlur,
  } = useFormik<CompleteProfileInputs>({
    initialValues,
    onSubmit: async (inputValues) => {
      saveFormDataToLocalStorage(step, inputValues.step3);

      if (!inputValues.step3.address)
        setFail({
          status: true,
          title: "Warning",
          description: "Please Enter Address",
        });

      // When you upload DP

      if (profilePicture) {
        const fileName = `${userId}/DP`;
        const formData = new FormData();
        formData.append(fileName, profilePicture);

        const resp: any = await axios.post(
          `${process.env.FRONT_END_URL}/api/s3/uploadFile`,
          formData
        );
        if (resp?.data?.results[0] && resp.data.results[0]?.Location)
          inputValues.step1.profile_img = resp.data.results[0]?.Location;
      }

      // When you upload Park Logo

      if (parkLogo) {
        const fileName = `${userId}/logo`;
        const formData = new FormData();
        formData.append(fileName, parkLogo);

        const resp: any = await axios.post(
          `${process.env.FRONT_END_URL}/api/s3/uploadFile`,
          formData
        );
        if (resp?.data?.results[0] && resp.data.results[0]?.Location)
          inputValues.step2.park_logo = resp.data.results[0]?.Location;
      }

      onBoardingMutation({
        subAdminOnboardInput: {
          _id: userId,
          userData: {
            first_name: inputValues.step1.first_name,
            last_name: inputValues.step1.last_name,
            profile_img: inputValues.step1.profile_img,
          },
          parkData: {
            name: inputValues.step2.park_name,
            park_logo: inputValues.step2.park_logo,
          },
          parkLocationData: {
            address: inputValues.step3.address,
            facility: inputValues.step3.facility,
            city: inputValues.step3.city,
            country: inputValues.step3.country,
            GPS: inputValues.step3.GPS,
            state: inputValues.step3.state,
          },
        },
      });
    },
    validationSchema,
  });

  const handleBeforeUnload = (e: BeforeUnloadEvent) => {
    if (!formCompleted) {
      e.preventDefault();
      e.returnValue = "";
    }
  };

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useQuery(["onBoardingUserById"], () => UserById({ userByIdId: userId }), {
    onSuccess: (data) => {
      const userData = data.userById;
      if (userData?.admin) {
        router.replace("/dashboard");
      }
      const prevValues: CompleteProfileInputs = {
        user_id: userData ? userData._id : "",
        step1: {
          first_name: userData ? userData.first_name : "",
          last_name: userData ? userData.last_name : "",
          profile_img: userData?.photo_url ? userData.photo_url : "",
        },
        step2: {
          park_name: "",
          park_logo: "",
        },
        step3: {
          city: "Los Angeles",
          country: "US",
          facility: "",
          state: "CA",
          address: "",
          GPS: { lat: 33.84870341736182, lng: -117.85884079920385 },
        },
      };
      const formData = localStorage.getItem("form_data");
      if (formData === null) {
        setValues(prevValues);
        localStorage.setItem("form_data", JSON.stringify(prevValues));
      } else if (
        formData !== null &&
        JSON.parse(formData).user_id !== userData?._id
      ) {
        setValues(prevValues);
        localStorage.setItem("form_data", JSON.stringify(prevValues));
      }
    },
    onError(err: any) {
      setFail({
        status: true,
        title: "Failed",
        description: err?.response?.errors[0]?.message,
      });
    },
    enabled: Boolean(userId),
  });

  useEffect(() => {
    setUser();
    const initValues = getFormDataFromLocalStorage();
    if (Object.keys(initValues).length) {
      setValues(initValues);
      setInitialValues(initValues);
    }
  }, [step, userId]);

  useEffect(() => {
    if (fail) setSubmitting(false);
  }, [fail]);

  const next = () => {
    console.log("next");
    switch (step) {
      case 1:
        if (!errors.step1) {
          saveFormDataToLocalStorage(1, values.step1);
          setProgress(progress + 33.33);
          setStep(step + 1);
        }
        break;
      case 2:
        if (!errors.step2) {
          saveFormDataToLocalStorage(2, values.step2);
          setProgress(progress + 33.33);
          setStep(step + 1);
        }
        break;
      default:
        break;
    }
  };

  const percentage = Math.floor(progress);

  return (
    <>
      <Core.Alert show={success} theme="success" />
      <Core.Alert show={fail} theme="error" />
      {console.log("errors: ", errors)}
      <Flex width={"full"} height={"full"} justify={"center"} align={"center"}>
        <Box maxWidth={800} width={"700px"}>
          <Alert status="info" columnGap={"10px"}>
            <Icons.BsInfoCircle />
            Please! Complete Profile first to unlock the Dashboard.
          </Alert>
          <Box
            borderWidth="1px"
            rounded="lg"
            shadow="1px 1px 3px rgba(0,0,0,0.3)"
            width={"100%"}
            p={6}
            m="10px auto"
            as="form"
          >
            <Box
              position={"relative"}
              width={"100%"}
              textAlign={"center"}
              mb="5%"
            >
              <chakra.span
                pos="absolute"
                top="15px"
                left="38%"
                zIndex={10}
                px={2}
                pt={1}
                pb={1.5}
                fontSize="sm"
                fontWeight="bold"
                lineHeight="14px"
                color="black"
                transform="translate(50%,-50%)"
                bg="white"
                borderRadius={"5px"}
                mb={"-5px"}
              >
                {percentage === 33
                  ? "Step 1/3"
                  : percentage === 66
                  ? "Step 2/3"
                  : percentage === 99
                  ? "Step 3/3"
                  : ""}
              </chakra.span>
              <Progress
                hasStripe
                value={progress}
                colorScheme="orange"
                size="lg"
                mx="5%"
                // py="3"
                isAnimated
                height="32px"
              ></Progress>
              {/* <Box as="block">{progress}</Box> */}
            </Box>

            {step === 1 ? (
              <MultiStepForm.Form1
                values={values}
                errors={errors}
                touched={touched}
                handleChange={handleChange}
                setFieldValue={setProfilePicture}
                handleBlur={handleBlur}
              />
            ) : step === 2 ? (
              <MultiStepForm.Form2
                values={values}
                errors={errors}
                touched={touched}
                handleChange={handleChange}
                setFieldValue={setParkLogo}
                handleBlur={handleBlur}
              />
            ) : (
              <MultiStepForm.Form3
                values={values}
                errors={errors}
                touched={touched}
                handleChange={handleChange}
                setFieldValue={setFieldValue}
              />
            )}
            <ButtonGroup mt="5%" w="100%">
              <Flex w="100%" justifyContent="space-between">
                <Flex>
                  {/* <Button
                  onClick={() => {
                    setStep(step - 1);
                    setProgress(progress - 33.33);
                  }}
                  isDisabled={step === 1}
                  colorScheme="teal"
                  variant="solid"
                  w="7rem"
                  mr="5%"
                >
                  Back
                </Button>
                <Button
                  w="7rem"
                  isDisabled={step === 3}
                  onClick={next}
                  //   () => {
                  //   setStep(step + 1);
                  //   if (step === 3) {
                  //     setProgress(100);
                  //   } else {
                  //     setProgress(progress + 33.33);
                  //   }
                  // }
                  colorScheme="teal"
                  variant="outline"
                >
                  Next
                </Button> */}
                  <Core.Button
                    btnOrangeMd
                    width="7rem"
                    mt="0"
                    mr="5%"
                    onClick={() => {
                      setStep(step - 1);
                      setProgress(progress - 33.33);
                    }}
                    isDisabled={step === 1}
                  >
                    Back
                  </Core.Button>
                  <Core.Button
                    btnOutlineOrange
                    width="7rem"
                    mt="0"
                    mr="5%"
                    isDisabled={step === 3}
                    onClick={next}
                    //   () => {
                    //   setStep(step + 1);
                    //   if (step === 3) {
                    //     setProgress(100);
                    //   } else {
                    //     setProgress(progress + 33.33);
                    //   }
                    // }
                  >
                    Next
                  </Core.Button>
                </Flex>
                {step === 3 ? (
                  <Core.Button
                    width="95px"
                    mt="0"
                    size="md"
                    btnBlue
                    type="submit"
                    button="Submit"
                    onClick={handleSubmit}
                    isLoading={isSubmitting}
                    isDisabled={isSubmitting}
                  />
                ) : null}
              </Flex>
            </ButtonGroup>
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default Onboarding;
