import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

import { Core } from "@/components";
import { HandleLogout } from "@/components/auth";
import PermissionsList from "@/components/core/permissions_list/permissions_list";
import type { InputRegisterClient, Package } from "@/graphql/generated/graphql";
import { FindPackageById } from "@/services/api";

import logo from "../../assets/logo/logo.png";
import { registerClientValidation } from "../../utils/yup_validation/register_client.validator";
import PaymentPage from "./payment_page";

export interface IRegisterClientFields {
  _id?: any;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone: { code: string; phoneNo: string };
  photo_url?: string;
  operations?: OperationViewPermissions[];
  modules?: ModuleViewPermissions[];
  package?: string;
}

interface IRegisterClientProps {
  packageId: string;
}

const RegistrationClient: React.FC<IRegisterClientProps> = ({ packageId }) => {
  const [phoneNumber, setPhoneNumber] = useState<{
    code: string;
    phoneNo: string;
  }>({
    code: "",
    phoneNo: "",
  });
  const moduleViewPermissions: ModuleViewPermissions[] = [
    {
      name: "email-&-notifications",
      views: [
        "email-&-notifications",
        "email-&-notifications.view",
        "email-&-notifications.add",
        "email-&-notifications.edit",
      ],
    },
    {
      name: "tools",
      views: [
        "pool-calculator",
        //  "gallery",
        "documents",
      ],
    },
    {
      name: "report-templates",
      views: [
        "report-templates",
        "report-templates.add",
        "report-templates.edit",
        "report-templates.view",
        "incident-reports",
        "vat-reports",
        "inventory-management",
      ],
    },
    {
      name: "tasks",
      views: [
        "tasks",
        "tasks.add",
        "tasks.edit",
        "tasks.track",
        "tasks.details",
      ],
    },
    {
      name: "trainings",
      views: [
        "trainings",
        "trainings.add",
        "trainings.edit",
        "trainings.assign",
        "trainings.external",
        "trainings.in-service",
        "trainings.track",
      ],
    },
  ];

  const defaultPermissions: OperationViewPermissions[] = [
    {
      name: "manage-roles",
      views: [
        "manage-roles",
        "manage-roles.add",
        "manage-roles.edit",
        "manage-roles.view",
      ],
    },
    {
      name: "dashboard",
      views: ["dashboard"],
    },
    {
      name: "notifications",
      views: ["notifications"],
    },
    {
      name: "password-change",
      views: ["password-change"],
    },
    {
      name: "profile",
      views: ["profile"],
    },
    {
      name: "update-email",
      views: ["email.update"],
    },
    {
      name: "geo-locations",
      views: [
        "geo-locations.add",
        "geo-locations.view",
        "geo-locations.edit",
        "geo-locations.user-locations-listing",
        "geo-locations.users-live-location",
        "point-of-interests-in-facilities",
        "point-of-interests.add",
      ],
    },
    {
      name: "subscriptions",
      views: ["subscription.my-subscription", "subscription.modification"],
    },
    {
      name: "employees",
      views: [
        "employees.add",
        "employees.edit",
        "employees.view",
        "employees",
        "departments",
        "departments.add",
        "departments.view",
        "departments.edit",
        "departments.action",
      ],
    },
    {
      name: "activity-logs",
      views: ["activity-logs", "activity-logs.user", "activity-logs.details"],
    },
    {
      name: "payment",
      views: ["payment-logs", "payment.details", "payment.subscription"],
    },
    {
      name: "announcement",
      views: ["announcement.add"],
    },
  ];

  const [pageNumber, setPageNumber] = useState<number>(0);
  const [show, setShow] = useState(false);
  const [success] = useState<IAlertSuccessData>();
  const [fail, setFail] = useState<IAlertSuccessData>();
  const [packageData, setPackageData] = useState<Package>();
  const [payload, setPayload] = useState<InputRegisterClient>();

  const [modulesForActions, setModulesForActions] = useState<{
    modules: Array<IFeatureType>;
  }>();

  const [modulePermissions, setModulePermissions] = useState<
    {
      name: { key: string; active: boolean };
      views: { key: string; active: boolean }[];
    }[]
  >([]);

  const [prevData, setPrevData] = useState<IRegisterClientFields>({
    _id: "",
    email: "",
    first_name: "",
    last_name: "",
    modules: [{ name: "" as EModules, views: ["" as EModuleViews] }],
    operations: [{ name: "" as EOperations, views: ["" as EOperationViews] }],
    photo_url: "",
    password: "",
    phone: { code: "", phoneNo: "" },
    package: "",
  });

  const { handleSubmit, handleChange, setFieldValue, values, errors, touched } =
    useFormik<InputRegisterClient>({
      initialValues: {
        email: prevData.email ? prevData.email : "",
        first_name: prevData.first_name ? prevData.first_name : "",
        last_name: prevData.last_name ? prevData.last_name : "",
        modules: prevData.modules
          ? prevData.modules
          : [
              {
                name: "" as EModules,
                views: ["" as EModuleViews],
              },
            ],
        operations: prevData.operations
          ? prevData.operations
          : [
              {
                name: "" as EOperations,
                views: ["" as EOperationViews],
              },
            ],
        password: "",
        phone:
          prevData.phone.phoneNo && prevData.phone?.code
            ? prevData.phone
            : { code: "", phoneNo: "" },
        package: prevData.package ? prevData.package : "",
        paymentDetails: {
          method: "MANUAL",
          amount: 0,
        },
      },
      enableReinitialize: true,

      onSubmit: (inputValues) => {
        if (!modulePermissions.some((_) => _.name.active)) {
          setFail({
            status: true,
            title: "Failed",
            description: "Please select at least a Module or an Operation",
          });
          return;
        }

        const modules: ModuleViewPermissions[] = [];

        // Active Modules Filter
        modulePermissions?.forEach((m) => {
          if (m.name.active) {
            const views: EModuleViews[] = [];
            m.views.forEach((view: any) => view.active && views.push(view.key));
            modules.push({
              name: m.name.key as EModules,
              views: views as EModuleViews[],
            });
          }
        });

        setPayload({
          email: inputValues.email,
          first_name: inputValues.first_name,
          last_name: inputValues.last_name,
          password: inputValues.password,
          phone: inputValues.phone,
          modules,
          operations: defaultPermissions,
          package: packageId,
          paymentDetails: inputValues.paymentDetails,
        });

        setPageNumber(1);
      },
      validationSchema: registerClientValidation,
    });

  const { data, isFetching } = useQuery(
    "findSpecificPackage",
    () => FindPackageById({ packageId }),
    {
      onSuccess({ findPackageById }) {
        if (findPackageById) {
          setPrevData((prev) => ({
            ...prev,
            package: findPackageById.title.toUpperCase(),
          }));
          setPackageData(findPackageById);
          setModulesForActions({
            modules: findPackageById.modules as Array<IFeatureType>,
          });
        }
      },
      onError(_: any) {
        if (
          _?.response?.errors?.length &&
          _?.response?.errors[0]?.message === "Not Authorised!"
        )
          HandleLogout();
        setFail({
          status: true,
          title: "Failed",
          description: "Failed to fetch package",
        });
      },
      refetchOnMount: true,
    }
  );

  useEffect(() => {
    const tempModulePermissions: {
      name: {
        key: string;
        active: boolean;
      };
      views: {
        key: string;
        active: boolean;
      }[];
      price?: number;
    }[] = [];

    moduleViewPermissions.forEach((userModuleObj: any) => {
      if (userModuleObj.name) {
        const views = userModuleObj.views
          .filter((view: any) =>
            moduleViewPermissions.some((module) => module.views.includes(view))
          )
          .map((view: any) => ({ key: view, active: false }));
        tempModulePermissions.push({
          name: { key: String(userModuleObj.name), active: false },
          views,
        });
      }
    });

    if (modulesForActions?.modules) {
      modulesForActions.modules.forEach((aModule) => {
        tempModulePermissions.forEach((f) => {
          if (f.name.key === aModule.name) {
            f.name.active = true;
            f.views.forEach((v) => {
              if (aModule.views.includes(v.key)) v.active = true;
            });
          }
        });
      });
    }
    setModulePermissions(tempModulePermissions);
  }, [modulesForActions]);

  return (
    <Box>
      {isFetching ? (
        <Box>Loading....</Box>
      ) : data ? (
        <Box>
          <Core.Alert show={success} theme="success" />
          <Core.Alert show={fail} theme="error" />
          {pageNumber === 0 ? (
            <Box maxWidth={"1200px"} marginX={"auto"}>
              <Box width="140px" py={"50px"} marginX={"auto"}>
                <Image src={logo} alt="logo" />
              </Box>
              <Box className="bg-white" padding={"20px"} rounded={"20px"}>
                <Core.FormHeading3
                  color="textColor"
                  title="Client-Admin User"
                />
                <Flex columnGap={"10px"} pb="20px">
                  <FormControl
                    isRequired
                    isInvalid={!!errors.first_name && touched.first_name}
                  >
                    <FormLabel>First Name</FormLabel>
                    <Core.Input
                      value={values.first_name}
                      name="first_name"
                      placeholder="First Name"
                      type="text"
                      onChange={handleChange}
                      error={errors.first_name}
                      touched={touched.first_name}
                    />
                  </FormControl>
                  <FormControl
                    isRequired
                    isInvalid={!!errors.last_name && touched.last_name}
                  >
                    <FormLabel>Last Name</FormLabel>
                    <Core.Input
                      value={values.last_name}
                      name="last_name"
                      placeholder="Last Name"
                      type="text"
                      onChange={handleChange}
                      error={errors.last_name}
                      touched={touched.last_name}
                    />
                  </FormControl>
                </Flex>
                <Flex columnGap={"10px"} pb="20px">
                  <FormControl
                    isRequired
                    isInvalid={!!errors.email && touched.email}
                  >
                    <FormLabel>Email</FormLabel>
                    <Core.Input
                      value={values.email.toLowerCase().trim()}
                      name="email"
                      placeholder="Enter Email"
                      type="email"
                      onChange={handleChange}
                      error={errors.email}
                      touched={touched.email}
                      autoCompleteOff
                    />
                  </FormControl>
                  <FormControl
                    isRequired
                    isInvalid={!!errors.password && touched.password}
                  >
                    <FormLabel>Password</FormLabel>
                    <InputGroup size="md" display={"block"}>
                      <Core.Input
                        pr="4.5rem"
                        type={show ? "text" : "password"}
                        placeholder="Enter Password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        error={errors.password}
                        touched={touched.password}
                        autoCompleteOff
                      />
                      <InputRightElement width="4.5rem">
                        <Button
                          height="1.75rem"
                          size="sm"
                          textColor={"textColor"}
                          onClick={() => {
                            setShow(!show);
                          }}
                        >
                          {show ? "Hide" : "Show"}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>
                </Flex>
                <Flex columnGap={"10px"} pb="20px">
                  <FormControl
                    isRequired
                    isInvalid={!!errors.email && touched.email}
                  >
                    <FormLabel>Selected Package</FormLabel>
                    <Core.Input
                      value={values?.package?.toUpperCase()}
                      name="package"
                      onChange={() => {}}
                      error={errors.package}
                      touched={touched.package}
                    />
                  </FormControl>
                  <FormControl
                    isRequired
                    isInvalid={!!errors.phone?.phoneNo && touched.phone?.code}
                  >
                    <FormLabel>Phone:</FormLabel>
                    <Core.PhoneNumber
                      phoneNumber={phoneNumber}
                      setPhoneNumber={setPhoneNumber}
                      setFieldValue={setFieldValue}
                    />
                  </FormControl>
                </Flex>

                <Flex justifyContent={"space-between"} columnGap={"20px"}>
                  <Box width="50%">
                    <Core.FormHeading3
                      color="textColor"
                      title="Module Permissions"
                      // searchBox
                    />
                    <PermissionsList
                      permissions={modulePermissions}
                      setPermissions={setModulePermissions}
                      disableViews={true}
                      isDisabled={true}
                    />
                  </Box>
                  <Box borderLeft={"1px solid"} borderColor={"gray.200"}></Box>
                </Flex>

                <Flex columnGap={"10px"} justifyContent="end">
                  <Core.Button btnOrangeMd onClick={handleSubmit}>
                    Proceed to Payment
                  </Core.Button>
                </Flex>
              </Box>
            </Box>
          ) : (
            <Box w="100%" p={4}>
              <Box maxWidth={"570px"} marginX={"auto"}>
                <Box width="140px" py={"50px"} marginX={"auto"}>
                  <Image src={logo} alt="logo" />
                </Box>

                <Core.Button
                  btnBlue
                  onClick={() => setPageNumber(0)}
                  mb="10px"
                  ml="10px"
                >
                  Back
                </Core.Button>

                <Box
                  borderRadius="15px"
                  padding="20px"
                  boxShadow="0px 2px 5px 2px rgba(0,0,0,0.05)"
                  backgroundColor="white.100"
                >
                  {/* <Core.Button btnGray onClick={() => setPageNumber(0)}>
                Back
              </Core.Button> */}
                  {packageData && payload && (
                    <PaymentPage
                      payload={payload}
                      cost={packageData.cost}
                      title={packageData.title}
                    />
                  )}
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      ) : (
        <Box>
          The Selected Package is not available, Please contact
          Administration/Support.
        </Box>
      )}
    </Box>
  );
};

export default RegistrationClient;
