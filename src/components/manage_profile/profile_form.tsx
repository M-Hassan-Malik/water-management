import {
  Avatar,
  Box,
  // Button,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
// import CountrySelector from "../core/country-list";
import axios from "axios";
import { useFormik } from "formik";
import { memo, useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import * as Yup from "yup";

import { Svg } from "@/assets";
import { Core } from "@/components";
import type { UpdateProfileInput } from "@/graphql/generated/graphql";
import { queryClient, UpdateProfile } from "@/services/api";

// import s3 from "../../utils/aws.config";

interface IProfileFormProps {}
const ProfileForm: React.FunctionComponent<IProfileFormProps> = (_props) => {
  const user: IUser = useSelector((state: any) => state.user.user);
  const [success, setSuccess] = useState<IAlertSuccessData>();
  const [fail, setFail] = useState<IAlertSuccessData>();
  const [fileData, setFile] = useState<File[]>([]);

  const { mutate, isLoading } = useMutation(
    "UpdateProfileMutation",
    UpdateProfile,
    {
      onSuccess: () => {
        setSuccess({
          status: true,
          description: "User profile updated Successfully",
          title: "User Profile Updated",
        });

        queryClient.invalidateQueries({ queryKey: ["FindUserByIdForAuth"] });
      },
      onError: () => {
        setFail({
          status: true,
          description: "Error in updating user profile",
          title: "Something went wrong",
        });
      },
    }
  );
  const validationSchema = Yup.object().shape({
    first_name: Yup.string()
      .required("First Name is must not be empty")
      .min(3, "First Name must be at least 3 characters")
      .max(20, "First Name must be at most 20 characters"),
    last_name: Yup.string()
      .required("Last Name is must not be empty")
      .min(3, "Last name must be at least 3 characters")
      .max(20, "Last name must be at most 20 characters"),
  });

  const removeStorageFiles = async (filesToRemove: string[]): Promise<void> => {
    try {
      await axios.post(`${process.env.FRONT_END_URL}/api/s3/delete-s3-files`, {
        removeFile: filesToRemove,
      });

      return;
    } catch (err: any) {
      console.error(err);
    }
  };

  const { handleSubmit, handleChange, values, errors, touched } =
    useFormik<UpdateProfileInput>({
      initialValues: {
        _id: user._id ? user._id : "",
        first_name: user.first_name ? user.first_name : "",
        last_name: user.last_name ? user.last_name : "",
        park: user.company.park.name ? user.company.park.name : "",
      },

      onSubmit: async (inputValues) => {
        const requestObj: UpdateProfileInput = {
          _id: inputValues._id,
        };

        if (user.first_name !== inputValues.first_name)
          requestObj.first_name = inputValues.first_name;
        if (user.last_name !== inputValues.last_name)
          requestObj.last_name = inputValues.last_name;
        if (user.last_name !== inputValues.last_name)
          requestObj.last_name = inputValues.last_name;
        if (user.company.park.name !== inputValues.park)
          requestObj.park = inputValues.park;

        if (fileData.length) {
          if (
            user?.photo_url &&
            !fileData[0]?.name.includes(
              user.photo_url.split("DP.")[1] as string
            )
          ) {
            removeStorageFiles([user.photo_url]);
          }
          const fileName = `${user._id}/DP`;
          const formData = new FormData();
          // formData.append("file", fileData as any);
          fileData.forEach((file) => {
            formData.append(fileName, file);
          });

          const resp = await axios.post(
            `${process.env.FRONT_END_URL}/api/s3/uploadFile`,
            formData
          );

          if (resp?.data?.results[0] && resp.data.results[0]?.Location)
            requestObj.photo_url = resp.data.results[0]?.Location;
        }

        if (Object.values(requestObj).length === 1 && !fileData.length)
          setFail({
            status: true,
            description: "Warning",
            title: "There is nothing to Change",
          });
        else {
          mutate({
            updateProfileUpdateProfileInput: requestObj,
          });
        }
      },
      validationSchema,
    });

  const [uploadedImage, setUploadedImage] = useState("");

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const file: any = Array.from(event.target.files);
      setFile(file);
      const selectedFile = file[0]; // Get the first selected file

      if (
        selectedFile?.type === "image/jpeg" ||
        selectedFile?.type === "image/jpg" ||
        selectedFile?.type === "image/png" ||
        selectedFile?.type === "image/webp"
      ) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const uploadedImageFromInput = e.target?.result as string;
          const img = new window.Image();
          img.src = uploadedImageFromInput;
          img.onload = () => {
            // const width = img.naturalWidth;
            // const height = img.naturalHeight;

            // const aspectRatio = width / height;
            // const threshold = 0.1;

            // const isAlmostSquare = Math.abs(1 - aspectRatio) < threshold;

            // if (isAlmostSquare) {
            //   console.log("Image is square.");
            setUploadedImage(uploadedImageFromInput);
            // } else {
            //   console.log("Image is not square.");
            //   setError({
            //     status: true,
            //     description: "Image is not square",
            //     title: "Image Size",
            //   });
            // }
          };
        };
        reader.readAsDataURL(selectedFile); // Pass the selectedFile to readAsDataURL
      } else {
        setFail({
          status: true,
          description: "Please select 'png' or 'jpg' format.",
          title: "Image Size!",
        });
      }
    }
  };

  useEffect(() => {
    if (user.photo_url) {
      setUploadedImage(user.photo_url);
    }
  }, [user]);

  return (
    <Box>
      <Core.Alert show={success} theme="success" />
      <Core.Alert show={fail} theme="error" />
      <Flex columnGap={"10px"} flexWrap={"wrap"}>
        <FormControl width={"100%"} mb="20px">
          <Flex justifyContent={"center"} py="20px" mt={1}>
            <Wrap position={"relative"}>
              <WrapItem>
                {uploadedImage && (
                  <Image
                    src={uploadedImage}
                    fallbackSrc="https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
                    width="128px"
                    height="128px"
                    rounded={"full"}
                    alt="logo"
                  />
                )}
                {!uploadedImage && (
                  <Avatar
                    backgroundColor={"#e7c89f"}
                    border={"full solid #e7c89f"}
                    size="2xl"
                    name={String(values.first_name) + values.last_name}
                    src={Svg.avatarPlaceholder.src}
                    rounded={"full"}
                  />
                )}
              </WrapItem>
              <Box position={"absolute"} right={"-3px"} bottom={"5px"}>
                <Core.IconicButton rounded button={"edit"} />
                <Input
                  type="file"
                  id="myFile"
                  name="filename"
                  height="100%"
                  width="100%"
                  position="absolute"
                  top="0"
                  left="0"
                  opacity="0"
                  aria-hidden="true"
                  accept="image/*"
                  onChange={handleFileUpload}
                />
              </Box>
            </Wrap>
          </Flex>
        </FormControl>
        <FormControl isRequired width={"49%"} mb="10px">
          <FormLabel>First Name</FormLabel>
          <Core.Input
            placeholder="First Name"
            type="text"
            onChange={handleChange}
            name="first_name"
            value={values?.first_name || ""}
            error={errors.first_name}
            touched={touched.first_name}
            size="lg"
          />
        </FormControl>
        <FormControl isRequired width={"49%"} mb="10px">
          <FormLabel>Last Name</FormLabel>
          <Core.Input
            type="text"
            placeholder="Last Name"
            onChange={handleChange}
            name="last_name"
            value={values?.last_name || ""}
            error={errors.last_name}
            touched={touched.last_name}
            size="lg"
          />
        </FormControl>
        {user?.company?.subAdmin && (
          <FormControl isRequired width={"49%"} mb="10px">
            <FormLabel>Park Name</FormLabel>
            <Core.Input
              placeholder="Park Name"
              type="text"
              onChange={handleChange}
              name="park"
              value={values?.park || ""}
              error={errors.park}
              touched={touched.park}
              size="lg"
            />
          </FormControl>
        )}
        <FormControl isRequired width={"49%"} mb="10px">
          <FormLabel>Email</FormLabel>
          <Input
            disabled
            placeholder="Email"
            type="email"
            name="email"
            defaultValue={user.email}
            size="lg"
          />
        </FormControl>
      </Flex>
      <Flex columnGap={"10px"} justifyContent="end">
        {/* <Core.Button btnGrayMd>Cancel</Core.Button> */}
        <Core.Button
          button="Update Profile"
          btnOrangeMd
          onClick={handleSubmit}
          isLoading={isLoading}
          isDisabled={
            values?.first_name === "" ||
            values?.last_name === "" ||
            values?.park === "" ||
            isLoading
          }
        />
      </Flex>
    </Box>
  );
};

export default memo(ProfileForm);
