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
// import moment from "moment-timezone";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
// import { isValidPhoneNumber } from "react-phone-number-input";
import { useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";

import { HandleLogout } from "@/components/auth";
import PermissionsList from "@/components/core/permissions_list/permissions_list";
import type {
  CreateSubAdminMutation,
  InputSubAdmin,
  UpdateSubAdminInput,
  UpdateSubAdminMutation,
} from "@/graphql/generated/graphql";
import {
  CreateSubAdmin,
  FindAllPackages,
  UpdateSubAdmin,
  UserById,
} from "@/services/api";

import { Core } from "..";
import {
  addValidationSchema,
  UpdateValidationSchema,
} from "./sub_admin_user.validator";

// moment.tz.setDefault("Asia/Karachi");

enum FAQStatus {
  MOBILE = "MOBILE",
  WEB = "WEB",
  BOTH = "BOTH",
}

interface ISubAdminFields {
  _id?: any;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone: { code: string; phoneNo: string };
  type: boolean;
  photo_url?: string;
  operations?: OperationViewPermissions[];
  modules?: ModuleViewPermissions[];
  package?: IPackage | string;
  isSubAdmin?: boolean;
  access: FAQStatus | string;
}
interface IAddSubAdminFormProps {
  pageType: PageType;
}

const AddSubAdminForm: React.FC<IAddSubAdminFormProps> = ({ pageType }) => {
  const { push, query } = useRouter();
  // const [phoneNumber, setPhoneNumber] = useState<string>(""); // Define the type of phoneNumber
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
        // "gallery",
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

  const operationViewPermissions: OperationViewPermissions[] = useMemo(
    () => [],
    []
  );

  const user: IUser = useSelector((state: any) => state.user.user);
  const [actionUserId, setActionUserId] = useState("");
  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState<IAlertSuccessData>();
  const [fail, setFail] = useState<IAlertSuccessData>();
  const [subscriptionPackagesWithFields, setSubscriptionPackagesWithFields] =
    useState<IPackage[]>([]);
  const [subscriptionPackages, setSubscriptionPackages] = useState<
    { name: string; value: string }[]
  >([]);

  const [modulesAndOperationsForActions, setModulesAndOperationsForActions] =
    useState<{
      modules: Array<IFeatureType>;
      operations: Array<IFeatureType>;
    }>();

  const [modulePermissions, setModulePermissions] = useState<
    {
      name: { key: string; active: boolean };
      views: { key: string; active: boolean }[];
    }[]
  >([]);

  const [operationPermissions, setOperationPermissions] = useState<
    {
      name: { key: string; active: boolean };
      views: { key: string; active: boolean }[];
    }[]
  >([]);

  const [prevData, setPrevData] = useState<ISubAdminFields>({
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
    type: true,
    isSubAdmin: false,
    access: FAQStatus.WEB,
    // phone: {
    //   code: "",
    //   phoneNo: "",
    // },
  });

  useQuery(
    ["mapSubAdmin&SubAdminUsers"],
    () => UserById({ userByIdId: actionUserId }),
    {
      onSuccess: ({ userById }) => {
        if (userById) {
          setSubscriptionPackages([
            { name: userById.package?.title || "", value: userById._id },
          ]);
          setPrevData({
            email: userById.email,
            first_name: userById.first_name,
            last_name: userById.last_name,
            password: "",
            phone:
              userById?.phone?.phoneNo && userById.phone?.code
                ? userById.phone
                : { code: "", phoneNo: "" },
            type: !!userById.package?.paid,
            package: userById.package?.title || "",
            isSubAdmin: !!userById.company?.subAdmin,
            access: userById.access,
          });

          const features: {
            modules: ModuleViewPermissions[];
            operations: OperationViewPermissions[];
          } = {
            modules: userById?.package?.modules
              ? userById.package.modules.map((item) => {
                  return {
                    name: item ? (item.name as EModules) : ("" as EModules),
                    views: item
                      ? (item.views as EModuleViews[])
                      : ["" as EModuleViews],
                  };
                })
              : [{ name: "" as EModules, views: ["" as EModuleViews] }],
            operations: userById.operations
              ? userById.operations.map((item) => {
                  return {
                    name: item
                      ? (item.name as EOperations)
                      : ("" as EOperations),
                    views: item
                      ? (item.views as EOperationViews[])
                      : ["" as EOperationViews],
                  };
                })
              : [{ name: "" as EOperations, views: ["" as EOperationViews] }],
          };

          if (userById.phone?.phoneNo && userById.phone?.code)
            setPhoneNumber(userById.phone);

          // to check if operations and modules are not empty
          if (features.modules.length || features.operations.length)
            setModulesAndOperationsForActions(features);
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
          title: "Unable to get user",
          description: "Failed to Map User on fields.",
        });
      },
      enabled: Boolean(actionUserId) && pageType !== "create",
      refetchOnMount: true,
    }
    // Enable the query when userId is truthy
  );
  useQuery("subAdminPackageSelection", () => FindAllPackages(), {
    onSuccess({ findAllPackages }) {
      if (findAllPackages.length) {
        const packages = findAllPackages.map((item) => {
          return {
            name: item.title,
            value: item._id ? item._id : "",
          };
        });

        packages.unshift({ name: "Select Package", value: "" });
        setSubscriptionPackages(packages);
        setSubscriptionPackagesWithFields(
          findAllPackages as unknown as IPackage[]
        );
      } else
        setFail({
          status: true,
          title: "Failed",
          description: "Failed to map Packages",
        });
    },
    onError(_err) {
      setFail({
        status: true,
        title: "Failed",
        description: "Failed to fetch packages",
      });
    },
    enabled: pageType !== "edit" && pageType !== "view",
    refetchOnMount: true,
  });

  const { mutate: createSubAdminMutation, isLoading: addSubadminLoading } =
    useMutation<CreateSubAdminMutation, unknown, InputSubAdmin>(
      (variables) => CreateSubAdmin({ createSubAdminInput: variables }),
      {
        onSuccess: () => {
          setSuccess({
            status: true,
            title: "Added",
            description: "User has been added successfully.",
          });
          setTimeout(() => {
            push("/client-admins");
          }, 1000);
        },
        onError: (_: any) => {
          setFail({
            status: true,
            title: "Failed",
            description: _?.response?.errors[0]?.message,
          });
        },
      }
    );
  const { mutate: updateSubAdminMutate, isLoading: updateSubadminLoading } =
    useMutation<UpdateSubAdminMutation, unknown, UpdateSubAdminInput>(
      (variables) => UpdateSubAdmin({ updateSubAdminInput: variables }),
      {
        onSuccess: () => {
          setSuccess({
            status: true,
            title: "Updated",
            description: "User has been updated successfully.",
          });
          setTimeout(() => {
            push("/client-admins");
          }, 1000);
        },
        onError: (_: any) => {
          setFail({
            status: true,
            title: "Failed",
            description: _?.response?.errors[0]?.message,
          });
        },
      }
    );

  const {
    handleSubmit,
    handleChange,
    setFieldValue,
    values,
    errors,
    touched,
    isSubmitting,
  } = useFormik<InputSubAdmin>({
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
      package:
        typeof prevData.package === "string"
          ? prevData.package
          : subscriptionPackages[0]?.value,
      type: prevData.type,
      paymentDetails: {
        method: "MANUAL",
        amount: 0,
      },
      access: prevData.access as FAQStatus,
    },
    enableReinitialize: true,

    onSubmit: (inputValues) => {
      if (!user?._id) {
        setFail({
          status: true,
          title: "Failed",
          description: "Please reload the webpage, user did not load properly.",
        });
        return;
      }
      if (
        !modulePermissions.some((_) => _.name.active) &&
        !operationPermissions.some((_) => _.name.active)
      ) {
        setFail({
          status: true,
          title: "Failed",
          description: "Please select at least a Module or an Operation",
        });
        return;
      }

      const modules: ModuleViewPermissions[] = [];
      let operations: OperationViewPermissions[] = [];
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
      // Active Operation Filter
      operationPermissions?.forEach((o) => {
        if (o.name.active) {
          const views: EOperationViews[] = [];
          o.views.forEach((view: any) => view.active && views.push(view.key));
          operations.push({
            name: o.name.key as EOperations,
            views: views as EOperationViews[],
          });
        }
      });
      operations = operations.concat(defaultPermissions); // assign operation that are default and basic need of any user
      if (pageType === "edit") {
        const bool: boolean = String(inputValues.type) === "true";

        const updateObj = {
          _id: actionUserId,
          first_name: inputValues.first_name,
          last_name: inputValues.last_name,
          password: inputValues.password,
          email: inputValues.email,
          operations,
          type: bool,
          phone:
            inputValues.phone.phoneNo && inputValues.phone.code
              ? inputValues.phone
              : { code: "", phoneNo: "" },
          access: FAQStatus.BOTH,
        };

        updateSubAdminMutate(updateObj);
      } else {
        const bool: boolean = String(inputValues.type) === "true";
        createSubAdminMutation({
          email: inputValues.email,
          first_name: inputValues.first_name,
          last_name: inputValues.last_name,
          password: inputValues.password,
          phone: inputValues.phone,
          modules,
          operations,
          type: bool,
          package: inputValues.package,
          paymentDetails: inputValues.paymentDetails,
          createdBy: String(user._id),
          access: FAQStatus.BOTH,
        });
      }
    },
    validationSchema:
      pageType === "edit" ? UpdateValidationSchema : addValidationSchema,
  });

  useEffect(() => {
    if (pageType && query.id) setActionUserId(String(query.id));
  }, [pageType, query.id]);

  const handlePackageChange = (e: any) => {
    setFieldValue("package", e.target.value);
    const selectedPackage = subscriptionPackagesWithFields.filter(
      (_) => String(_._id) === String(e.target.value)
    )[0] as IPackage;

    const _features: {
      modules: ModuleViewPermissions[];
      operations: OperationViewPermissions[];
    } = {
      modules: selectedPackage?.modules?.map((item) => {
        return {
          name: item ? (item.name as EModules) : ("" as EModules),
          views: item ? (item.views as EModuleViews[]) : ["" as EModuleViews],
        };
      }),
      operations: user?.operations?.map((item) => {
        return {
          name: item ? (item.name as EOperations) : ("" as EOperations),
          views: item
            ? (item.views as EOperationViews[])
            : ["" as EOperationViews],
        };
      }),
    };
    setModulesAndOperationsForActions(_features);
  };

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
    }[] = [];
    const tempOperationPermissions: {
      name: {
        key: string;
        active: boolean;
      };
      views: {
        key: string;
        active: boolean;
      }[];
    }[] = [];

    if (user?.admin) {
      // Filter Modules
      moduleViewPermissions.forEach((obj) => {
        tempModulePermissions.push({
          name: { key: String(obj.name), active: false },
          views: obj.views.map((v) => ({ key: v, active: false })),
        });
      });
      // Filter Operations
      operationViewPermissions.forEach((obj) => {
        tempOperationPermissions.push({
          name: { key: String(obj.name), active: false },
          views: obj.views.map((v) => ({ key: v, active: false })),
        });
      });
    } else {
      const operations = user?.operations.filter(
        (operation) =>
          !defaultPermissions.some((dp) => dp.name === operation.name)
      );

      // Filter Modules
      user?.modules?.forEach((userModuleObj: any) => {
        if (userModuleObj.name) {
          const views = userModuleObj.views
            .filter((view: any) =>
              moduleViewPermissions.some((module) =>
                module.views.includes(view)
              )
            )
            .map((view: any) => ({ key: view, active: true }));
          tempModulePermissions.push({
            name: { key: String(userModuleObj.name), active: false },
            views,
          });
        }
      });

      // Filter Operations
      operations?.forEach((userOperationsObj: any) => {
        if (userOperationsObj.name) {
          const views = userOperationsObj.views
            .filter((view: any) =>
              operationViewPermissions.some((module) =>
                module.views.includes(view)
              )
            )
            .map((view: any) => ({ key: view, active: true }));
          tempOperationPermissions.push({
            name: { key: String(userOperationsObj.name), active: false },
            views,
          });
        }
      });
    }

    // Run only for Edit/View Action
    if (modulesAndOperationsForActions?.modules) {
      modulesAndOperationsForActions.modules.forEach((aModule) => {
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
    // Run only for Edit/View Action
    if (modulesAndOperationsForActions?.operations) {
      modulesAndOperationsForActions.operations.forEach((aOperation) => {
        tempOperationPermissions.forEach((f) => {
          if (f.name.key === aOperation.name) {
            f.name.active = true;
            f.views.forEach((v) => {
              if (aOperation.views.includes(v.key)) v.active = true;
            });
          }
        });
      });
    }

    // if (user?._id) setUserId(user._id);
    setModulePermissions(tempModulePermissions);
    setOperationPermissions(tempOperationPermissions);
  }, [user?.active, modulesAndOperationsForActions]);

  const typeList = [
    {
      name: "PAID",
      value: "true",
    },
    {
      name: "UNPAID",
      value: "false",
    },
  ];

  return (
    <Box>
      <Core.Alert show={success} theme="success" />
      <Core.Alert show={fail} theme="error" />
      <Core.FormHeading3 color="textColor" title="Client-Admin User" />
      <Flex columnGap={"10px"} pb="20px">
        <FormControl
          isRequired
          isInvalid={!!errors.first_name && touched.first_name}
        >
          <FormLabel>First Name</FormLabel>
          <Core.Input
            isDisabled={pageType === "view"}
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
            isDisabled={pageType === "view"}
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
        <FormControl isRequired isInvalid={!!errors.email && touched.email}>
          <FormLabel>Email</FormLabel>
          <Core.Input
            isDisabled={pageType === "view"}
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
              isDisabled={pageType === "view"}
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
                isDisabled={pageType === "view"}
              >
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
      </Flex>
      <Flex
        display={user?.company?.subAdmin ? "none" : "flex"}
        columnGap={"10px"}
        pb="20px"
      >
        <FormControl isInvalid={!!errors.type && touched.type}>
          <FormLabel>Account Type</FormLabel>
          <Core.Select
            isDisabled={pageType === "view"}
            placeholder="Select Type"
            name="type"
            value={String(values.type)}
            onChange={handleChange}
            list={typeList}
            error={errors.type}
            touched={touched.type}
          />
        </FormControl>
        <FormControl isRequired isInvalid={!!errors.package && touched.package}>
          <FormLabel>Package</FormLabel>
          <Core.Select
            placeholder="Select Package"
            isDisabled={pageType !== "create"} // If Query has "Type" other than "create" then it should be disabled
            list={subscriptionPackages}
            name="package"
            value={String(values.package)}
            onChange={handlePackageChange}
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
            isDisabled={pageType === "view"}
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            setFieldValue={setFieldValue}
          />
        </FormControl>
      </Flex>
      {/* For Super Admin and it's Users */}
      {modulePermissions.length > 0 &&
      (user.admin || !user?.company?.subAdmin || !user?.company?.employee) ? (
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
              isDisabled={pageType !== "create"} // If Query has "Type" param then it should be disabled
              disableViews={false}
            />
          </Box>
          <Box borderLeft={"1px solid"} borderColor={"gray.200"}></Box>
        </Flex>
      ) : null}
      {pageType !== "view" && (
        <Flex columnGap={"10px"} justifyContent="end">
          <Core.Button
            btnOrangeMd
            onClick={handleSubmit}
            isDisabled={
              values?.email === "" ||
              values?.first_name === "" ||
              values?.last_name === "" ||
              values?.password === "" ||
              values?.package === "" ||
              values?.phone?.phoneNo === ""
            }
            isLoading={
              isSubmitting && (addSubadminLoading || updateSubadminLoading)
            }
          >
            {pageType === "edit" ? "Update" : "Add"}
          </Core.Button>
        </Flex>
      )}
    </Box>
  );
};

export default AddSubAdminForm;
