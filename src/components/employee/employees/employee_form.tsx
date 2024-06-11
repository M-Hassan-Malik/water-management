// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import {
  Avatar,
  Box,
  Button,
  Card,
  Flex,
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import axios from "axios";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import type { ChangeEventHandler } from "react";
import { memo, useEffect, useMemo, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";

import { Svg } from "@/assets";
import { Core } from "@/components";
import { HandleLogout } from "@/components/auth";
import PermissionsList from "@/components/core/permissions_list/permissions_list";
import type {
  CreateEmployeeMutation,
  EmployeeInput,
  IntModule,
  IntOperation,
  UpdateEmployeeInput,
  UpdateEmployeeMutation,
} from "@/graphql/generated/graphql";
import { EmployeeType } from "@/graphql/generated/graphql";
import {
  CreateEmployee,
  FindDepartmentsByOwnerId,
  FindEmployeeById,
  FindRoleById,
  FindRolesByUserId,
  UpdateEmployee,
} from "@/services/api";
import { removeCommonObjects } from "@/utils/helpers/functions";

import { validationSchema } from "./employee.validator";

enum FAQStatus {
  MOBILE = "MOBILE",
  WEB = "WEB",
  BOTH = "BOTH",
}

interface IEmployeeFields {
  _id?: any;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  department: string;
  photo_url?: string;
  phone?: IPhoneInput;
  employee: boolean;
  employeeType: EmployeeType;
  role?: IRole;
  subAdmin: boolean;
  location: string[];
  package: string;
  active: boolean;
  modules: IntModule[];
  operations: IntOperation[];
  access?: FAQStatus;
}
interface IAddSubAdminFormProps {
  pageType: PageType;
}

interface ExtendedEmployeeInput extends EmployeeInput {
  confirm_password: string;
}

const AddEmployeeForm: React.FC<IAddSubAdminFormProps> = ({ pageType }) => {
  const { push, query } = useRouter();
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const user: IUser = useSelector((state: any) => state.user.user);
  const [overlayPage, setOverlayPage] = useState(false);
  const [firstTimeSelected, setFirstTimeSelected] = useState(true);
  const [actionUserId, setActionUserId] = useState("");
  const [uploadedImage, setUploadedImage] = useState("");
  const [fail, setFail] = useState<IAlertSuccessData>();
  const [success, setSuccess] = useState<IAlertSuccessData>();
  const [roleId, setRoleId] = useState("");
  const [roles, setRoles] = useState<{ name: string; value: string }[]>([]);
  const [imageUploading, setImageUploading] = useState(false);
  const [fileData, setFileDate] = useState<File>();
  const [phoneNumber, setPhoneNumber] = useState<{
    code: string;
    phoneNo: string;
  }>({
    code: "",
    phoneNo: "",
  });
  // setModulesAndOperationsForActions
  const [modulesAndOperationsForActions, setModulesAndOperationsForActions] =
    useState<{
      modules: IFeatureType[];
      operations: IFeatureType[];
    }>({
      modules: [{ name: "", views: [""] }],
      operations: [{ name: "", views: [""] }],
    });

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

  const defaultPermissions: OperationViewPermissions[] = useMemo(
    () => [
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
        name: "announcement",
        views: ["announcement.add"],
      },
    ],
    []
  );

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
        "report-templates.track",
        "report-templates.assign",
        "report-templates.submission",
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
        "trainings.track",
        "trainings.external",
        "trainings.in-service",
      ],
    },
  ];

  const operationViewPermissions: OperationViewPermissions[] = useMemo(
    () => [
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
        name: "subscriptions",
        views: [
          "subscriptions",
          "subscription.add",
          "subscription.edit",
          "subscription.view",
        ],
      },
      {
        name: "client-admins",
        views: [
          "client-admins",
          "client-admins.add",
          "client-admins.edit",
          "client-admins.view",
        ],
      },
      {
        name: "geo-locations",
        views: [
          "geo-locations",
          "geo-locations.edit",
          "geo-locations.user-locations-listing",
          "geo-locations.view",
          "geo-locations.requests",
          "geo-locations.users-live-location",
          "point-of-interests-in-facilities",
          "point-of-interests.add",
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
        name: "subscriptions",
        views: ["subscription.my-subscription", "subscription.modification"],
      },
    ],
    []
  );

  const [departments, setDepartments] = useState<
    { name: string; value: string }[]
  >([]);

  const [locations, setLocations] = useState<
    { label: string; value: string }[]
  >([]);

  const { mutate: createEmployeeMutation, isLoading: addEmployeeLoading } =
    useMutation<CreateEmployeeMutation, unknown, EmployeeInput>(
      (variables: any) =>
        CreateEmployee({
          employeeInput: variables,
          company: {
            park: user.company.park._id,
          },
        }),
      {
        onSuccess: () => {
          setSuccess({
            status: true,
            title: "Added",
            description: "Employee added successfully.",
          });
          setTimeout(() => {
            push("/employees");
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

  const { mutate: updateEmployeeMutation, isLoading: updateEmployeeLoading } =
    useMutation<UpdateEmployeeMutation, unknown, UpdateEmployeeInput>(
      (variables) => UpdateEmployee({ updateEmployeeInput: { ...variables } }),
      {
        onSuccess: () => {
          setSuccess({
            status: true,
            title: "Updated",
            description: "Employee has been updated successfully.",
          });
          setTimeout(() => {
            push("/employees");
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

  const [prevData, setPrevData] = useState<IEmployeeFields>({
    _id: "",
    email: "",
    first_name: "",
    last_name: "",
    photo_url: "",
    password: "",
    department: "",

    active: true,
    phone: {
      code: "",
      phoneNo: "",
    },
    access: FAQStatus.WEB,
    employee: true,
    location: [],
    subAdmin: false,
    employeeType: EmployeeType.Subadmin,
    // package: "",
    modules: [{ name: "" as EModules, views: ["" as EModuleViews] }],
    operations: [{ name: "" as EOperations, views: ["" as EOperationViews] }],
    role: {
      _id: "",
      active: false,
      modules: [],
      name: "",
      operations: [],
      user_id: "",
    },
  });

  const {
    handleSubmit,
    handleChange,
    values,
    errors,
    touched,
    isSubmitting,
    setFieldValue,
    handleBlur,
  } = useFormik<ExtendedEmployeeInput>({
    initialValues: {
      email: prevData.email,
      first_name: prevData.first_name,
      last_name: prevData.last_name,
      password: "",
      department: prevData.department,
      employeeType: prevData.employeeType,
      phone: prevData.phone,
      photo_url: prevData.photo_url,
      confirm_password: "",
      active: prevData.active,
      location: prevData.location || [],
      package: prevData.package,
      createdBy: user._id || "",
      role: (prevData?.role?._id as any) || "",
      access: prevData.access,
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
    },
    enableReinitialize: true,
    onSubmit: async (inputValues) => {
      let photoURL = "";
      // upload DP
      if (fileData) {
        setImageUploading(true);
        const formData = new FormData();
        // formData.append("file", fileData as any);
        const fileName = `${String(query.id)}/DP`;

        formData.append(fileName, fileData);

        const resp: any = await axios.post(
          `${process.env.FRONT_END_URL}/api/s3/uploadFile`,
          formData
        );
        setImageUploading(false);

        if (resp?.data?.results[0] && resp.data.results[0]?.Location) {
          setFieldValue("photo_url", resp.data.results[0].Location);
          photoURL = resp.data.results[0].Location;
        }
      }

      //
      const userModules: ModuleViewPermissions[] = [];
      modulePermissions?.forEach((module) => {
        if (module.name.active) {
          const views: EModuleViews[] = [];
          module.views.forEach(
            (view) => view.active && views.push(view.key as EModuleViews)
          );
          userModules.push({
            name: module.name.key as EModules,
            views: views as EModuleViews[],
          });
        }
      });

      const userOperations: OperationViewPermissions[] = [];
      operationPermissions?.forEach((operation) => {
        if (operation.name.active) {
          const views: EOperationViews[] = [];
          operation.views.forEach(
            (view) => view.active && views.push(view.key as EOperationViews)
          );
          userOperations.push({
            name: operation.name.key as EOperations,
            views: views as EOperationViews[],
          });
        }
      });

      const modules: IntModule[] = userModules.map((module) => {
        return {
          name: module.name,
          views: module.views,
        };
      });

      let operations: IntOperation[] = userOperations.map((operation) => {
        return {
          name: operation.name,
          views: operation.views,
        };
      });
      operations = operations.concat(defaultPermissions); // assign operation that are default and basic need of any user

      if (pageType === "edit") {
        updateEmployeeMutation({
          _id: prevData._id,
          email: inputValues.email,
          first_name: inputValues.first_name,
          last_name: inputValues.last_name,
          employeeType: inputValues.employeeType,
          active: inputValues.active,
          access: inputValues.access,
          photo_url: fileData && photoURL ? photoURL : undefined,
          location: inputValues.location.map((loc) => loc.value) || null,
          role: inputValues.role || undefined,
          modules,
          operations,
          phone: inputValues?.phone?.phoneNo
            ? inputValues.phone
            : { code: "", phoneNo: "" },
        });
      } else {
        const createMutation = {
          department: inputValues.department,
          email: inputValues.email,
          employeeType: inputValues.employeeType,
          first_name: inputValues.first_name,
          last_name: inputValues.last_name,
          password: inputValues.password,
          photo_url: photoURL,
          location: inputValues.location.map((loc) => loc.value),
          createdBy: user._id || "",
          active: inputValues.active,
          access: inputValues.access,
          role: inputValues.role || undefined,
          modules,
          operations,
          phone: inputValues?.phone?.phoneNo
            ? inputValues.phone
            : { code: "", phoneNo: "" },
        };
        if (user.company.subAdmin && user?.package) {
          createMutation.package = user.package?._id;
        }
        createEmployeeMutation(createMutation);
      }
    },
    validationSchema: validationSchema(pageType),
  });
  useQuery(
    ["mapRoleInFeaturesPermissionsForEmp", roleId],
    () => FindRoleById({ findRoleByIdId: roleId }),
    {
      onSuccess: ({ findRoleById }: { findRoleById: IRole }) => {
        if (findRoleById) setFieldValue("role", roleId);

        const features: {
          modules: ModuleViewPermissions[];
          operations: OperationViewPermissions[];
        } = {
          modules: findRoleById?.modules || [],
          operations: findRoleById?.operations || [],
        };

        if (pageType === "edit") {
          if (!firstTimeSelected) setModulesAndOperationsForActions(features);
          else {
            setFirstTimeSelected(false);
          }
        } else {
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
          title: "Failed",
          description: "Failed to auto-populate roles on permissions.",
        });
      },
      enabled: Boolean(roleId) && !overlayPage,
      refetchOnMount: true,
    }
  );

  useQuery(
    ["populateRoles", values.location],
    () =>
      FindRolesByUserId({
        findRolesByUserIdId: user?._id || "",
        facilityId: values.location?.map((loc) => loc.value),
      }),
    {
      onSuccess: ({ findRolesByUserId }: { findRolesByUserId: IRole[] }) => {
        const roleValues = findRolesByUserId.map((item) => {
          return {
            name: item.name,
            value: String(item._id),
          };
        });
        roleValues.unshift({ name: "Select Role", value: "" });
        setRoles(roleValues);
      },
      onError(_: any) {
        if (
          _?.response?.errors?.length &&
          _?.response?.errors[0]?.message === "Not Authorised!"
        )
          HandleLogout();
        setFail({
          status: true,
          title: "Unable to get roles",
          description: "Failed to get roles",
        });
      },
      // Enable the query when conditions are true
      enabled: Boolean(user?._id) && !overlayPage && Boolean(values.location),
      refetchOnMount: true,
    }
  );

  useQuery(
    ["employeeId"],
    () => FindEmployeeById({ findEmployeeByIdId: actionUserId }),
    {
      onSuccess: ({ findEmployeeById }) => {
        if (findEmployeeById) {
          setPrevData({
            password: "",
            _id: findEmployeeById._id,
            email: findEmployeeById.email,
            last_name: findEmployeeById.last_name,
            first_name: findEmployeeById.first_name,
            department: findEmployeeById.department
              ? findEmployeeById.department
              : "",
            phone: {
              code:
                findEmployeeById.phone && findEmployeeById.phone.code
                  ? findEmployeeById.phone.code
                  : "",
              phoneNo:
                findEmployeeById.phone && findEmployeeById.phone.phoneNo
                  ? findEmployeeById.phone.phoneNo
                  : "",
            },
            photo_url: findEmployeeById.photo_url
              ? findEmployeeById.photo_url
              : "",
            employeeType:
              findEmployeeById.company && findEmployeeById.company.employeeType
                ? findEmployeeById.company.employeeType
                : EmployeeType.Subadmin,
            location:
              findEmployeeById.company &&
              Array.isArray(findEmployeeById.company.location) &&
              findEmployeeById.company.location.length > 0
                ? findEmployeeById.company.location.map((location) => {
                    return {
                      value: location._id,
                      label: location.facility,
                    };
                  })
                : [],
            employee: true,
            subAdmin: false,
            access: findEmployeeById?.access,
            active: findEmployeeById?.active ? findEmployeeById.active : false,
            role: findEmployeeById?.role?._id
              ? (String(findEmployeeById.role._id) as any)
              : roles[0]?.value,
            package:
              findEmployeeById.package && findEmployeeById.package._id
                ? findEmployeeById.package._id
                : "",
            modules: findEmployeeById?.modules?.length
              ? (findEmployeeById.modules as any)
              : [
                  {
                    name: "" as EModules,
                    views: ["" as EModuleViews],
                  },
                ],
            operations: findEmployeeById?.operations?.length
              ? (findEmployeeById.operations as any)
              : [
                  {
                    name: "" as EOperations,
                    views: ["" as EOperationViews],
                  },
                ],
          });

          if (findEmployeeById?.photo_url)
            setUploadedImage(findEmployeeById.photo_url);

          if (findEmployeeById.phone?.phoneNo)
            setPhoneNumber(findEmployeeById.phone);

          if (findEmployeeById.role?._id) {
            setRoleId(String(findEmployeeById?.role?._id));
          }
          const features: {
            modules: ModuleViewPermissions[];
            operations: OperationViewPermissions[];
          } = {
            modules: findEmployeeById?.modules as any,
            operations: findEmployeeById?.operations as any,
          };
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
      enabled: Boolean(actionUserId) && pageType !== "create" && !overlayPage,
      refetchOnMount: true,
    }
  );

  useQuery(
    "getRelatedOwnerDepartments",
    () =>
      FindDepartmentsByOwnerId({
        clientAdminId: user?.company?.subAdmin
          ? String(user?._id)
          : String(user?.created_by),
      }),
    {
      onSuccess({ findDepartmentsByOwnerId }) {
        if (!findDepartmentsByOwnerId.length) setOverlayPage(true);

        const departmentsArray = findDepartmentsByOwnerId
          .map((item: any) => {
            if (item.status)
              return {
                name: item.department,
                value: item._id ? item._id : "",
              };
            return {
              name: "",
              value: item._id ? item._id : "",
            };
          })
          .filter((dpt) => dpt.name);

        departmentsArray.unshift({ name: "Select Department", value: "" });
        setDepartments(departmentsArray);
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
          description: "Failed to fetch departments",
        });
      },
      refetchOnMount: true,
    }
  );

  useEffect(() => {
    if (pageType && query.id) setActionUserId(String(query.id));
  }, [pageType, query.id]);

  // Need to update this to location name
  useEffect(() => {
    const locationsData: { label: string; value: string }[] = [];
    user.company.park.locations.forEach((item) => {
      if (item.active) {
        locationsData.push({
          label: item.facility,
          value: item._id ? item._id : "",
        });
      }
    });
    setLocations(locationsData);
  }, [user]);

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
    }
    // For Client Admin
    else if (user?.company?.subAdmin) {
      const operations = user?.operations.filter(
        (operation) =>
          !defaultPermissions.some((dp) => dp.name === operation.name)
      );

      // Filter Modules
      user?.package?.modules?.forEach((userModuleObj) => {
        if (userModuleObj.name) {
          const views = userModuleObj.views
            .filter((view) =>
              moduleViewPermissions.some((module) =>
                module.views.includes(view as EModuleViews)
              )
            )
            .map((view) => ({ key: view, active: false }));

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
            .map((view: any) => ({ key: view, active: false }));

          tempOperationPermissions.push({
            name: { key: String(userOperationsObj.name), active: false },
            views,
          });
        }
      });
    } else {
      // for Client employees/users
      // Filter Modules
      user?.modules?.forEach((userModuleObj: any) => {
        if (userModuleObj.name) {
          const views = userModuleObj.views
            .filter((view: any) =>
              moduleViewPermissions.some((module) =>
                module.views.includes(view)
              )
            )
            .map((view: any) => ({ key: view, active: false }));

          tempModulePermissions.push({
            name: { key: String(userModuleObj.name), active: false },
            views,
          });
        }
      });

      // Remove default permissions
      const defaultPermissionsRemoved = removeCommonObjects(
        defaultPermissions,
        user?.operations
      );
      // Filter Operations
      defaultPermissionsRemoved?.forEach((userOperationsObj: any) => {
        if (userOperationsObj.name) {
          const views = userOperationsObj.views
            .filter((view: any) =>
              operationViewPermissions.some((module) =>
                module.views.includes(view)
              )
            )
            .map((view: any) => ({ key: view, active: false }));

          tempOperationPermissions.push({
            name: { key: String(userOperationsObj.name), active: false },
            views,
          });
        }
      });
    }

    // MODULES: Run only for Edit/View Action
    if (modulesAndOperationsForActions?.modules) {
      modulesAndOperationsForActions.modules.forEach((aModule) => {
        tempModulePermissions.forEach((tMP) => {
          if (tMP.name.key === aModule.name) {
            tMP.name.active = true;
            tMP.views.forEach((v) => {
              if (aModule.views.includes(v.key)) v.active = true;
            });
          }
        });
      });
    }

    // OPERATIONS: Run only for Edit/View Action
    if (modulesAndOperationsForActions?.operations) {
      modulesAndOperationsForActions.operations.forEach((aOperation) => {
        tempOperationPermissions.forEach((tOP) => {
          if (tOP.name.key === aOperation.name) {
            tOP.name.active = true;
            tOP.views.forEach((v) => {
              if (aOperation.views.includes(v.key)) v.active = true;
            });
          }
        });
      });
    }

    setModulePermissions(tempModulePermissions);
    setOperationPermissions(tempOperationPermissions);
  }, [user.active, modulesAndOperationsForActions]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Get the selected file
    setFileDate(file);
    if (file) {
      const reader = new FileReader(); // Create a FileReader object

      reader.onload = (e) => {
        const uploadedImageFromInput = e.target?.result as string; // Get the image data

        // Set the uploaded image in state
        setUploadedImage(uploadedImageFromInput);
      };

      reader.readAsDataURL(file); // Read the file as data URL
    }
  };

  const statusHandler = (value: string) => {
    const active = value === "true";
    setFieldValue("active", active);
  };

  const accessHandler = (value: string) => {
    setFieldValue("access", value);
  };

  const handleLocationChange = (selectedLocations: any) => {
    setFieldValue("location", selectedLocations);
  };

  const employeeTypeList = [
    {
      name: "Sub-Admin",
      value: EmployeeType.Subadmin,
    },
    {
      name: "Manager",
      value: EmployeeType.Manager,
    },
    {
      name: "Lifeguard",
      value: EmployeeType.Lifeguard,
    },
  ];
  const handleRoleChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const role = e.target.value;
    setFieldValue("role", role);
    setRoleId(role);
  };

  return (
    <Box position={"relative"}>
      {overlayPage && (
        <Flex
          position={"absolute"}
          pt={"100px"}
          justify={"center"}
          alignItems={"center"}
          height={"110%"}
          width={"110%"}
          margin={"-2%"}
          zIndex={20}
          bgColor={"rgba(0,0,0,0.3)"}
          rounded={"10px"}
          py={"50px"}
        >
          <Card
            cursor={"pointer"}
            onClick={() => {
              push("/departments/add");
            }}
          >
            <Text fontSize={"2rem"} margin={"10px"} textAlign={"center"}>
              Please Create a Department First
              <Text fontSize={"1rem"}>Click here to Create Department</Text>
            </Text>
          </Card>
        </Flex>
      )}
      <Core.Alert show={success} theme="success" />
      <Core.Alert show={fail} theme="error" />

      {pageType !== "create" && !values.first_name ? (
        <Flex
          width={"100%"}
          height={"70vh"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Core.BtnSpinner size="md" />
        </Flex>
      ) : (
        <>
          <Flex columnGap={"10px"} pb="20px">
            <FormControl mb="20px" display={"flex"} justifyContent={"start"}>
              <Box>
                {/* <FormLabel
                  fontSize="sm"
                  fontWeight="md"
                  textAlign={"center"}
                  color="textColor.500"
                  m="0"
                  mb={4}
                >
                  User Photo
                </FormLabel> */}
                <Flex
                  // flexDirection={"column"}
                  alignItems="center"
                  justifyContent={"center"}
                  gap={"20px"}
                  mt={1}
                >
                  <Wrap>
                    <WrapItem>
                      {uploadedImage && (
                        <Avatar
                          size="2xl"
                          name={
                            values.first_name || `${values.last_name}` || ""
                          }
                          src={uploadedImage}
                        />
                      )}
                      {!uploadedImage && (
                        <Avatar
                          backgroundColor={"#e7c89f"}
                          border={"15px solid #e7c89f"}
                          size="2xl"
                          name={
                            values.first_name || `${values.last_name}` || ""
                          }
                          src={Svg.avatarPlaceholder.src}
                        />
                      )}
                    </WrapItem>
                  </Wrap>
                  <Button
                    type="button"
                    mt={5}
                    variant="outline"
                    size="sm"
                    fontWeight="medium"
                    _focus={{
                      shadow: "none",
                    }}
                  >
                    <Core.Input
                      type="file"
                      id="myFile"
                      name="filename"
                      height="100%"
                      width="100%"
                      pos="absolute"
                      top="0"
                      left="0"
                      opacity="0"
                      aria-hidden="true"
                      accept="image/*"
                      onChange={handleFileUpload}
                    />
                    Upload
                  </Button>
                </Flex>
              </Box>
            </FormControl>
          </Flex>
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
                onBlur={handleBlur}
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
                onBlur={handleBlur}
                error={errors.last_name}
                touched={touched.last_name}
              />
            </FormControl>
            <FormControl isRequired isInvalid={!!errors.email && touched.email}>
              <FormLabel>Email</FormLabel>
              <Core.Input
                isDisabled={pageType === "view"}
                value={values.email.toLowerCase().trim()}
                name="email"
                placeholder="Enter Email"
                type="email"
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.email}
                touched={touched.email}
                autoCompleteOff
              />
            </FormControl>
          </Flex>
          <Flex columnGap={"10px"} pb="20px">
            <FormControl
              isRequired
              isInvalid={!!errors.password && touched.password}
            >
              <FormLabel>Password</FormLabel>
              <InputGroup display={"block"}>
                <Core.Input
                  // pr="4.5rem"
                  type={show1 ? "text" : "password"}
                  placeholder="Enter password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.password}
                  touched={touched.password}
                  isDisabled={pageType === "view"}
                  pr="80px"
                  autoCompleteOff
                />
                <InputRightElement width="4.5rem">
                  <Button
                    height="1.75rem"
                    size="sm"
                    textColor={"textColor"}
                    onClick={() => {
                      setShow1(!show1);
                    }}
                    isDisabled={pageType === "view"}
                  >
                    {show1 ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl
              isRequired
              isInvalid={!!errors.confirm_password && touched.confirm_password}
            >
              <FormLabel>Confirm Password</FormLabel>
              <InputGroup size="md" display={"block"}>
                <Core.Input
                  // pr="4.5rem"
                  type={show2 ? "text" : "password"}
                  placeholder="Confirm Password"
                  name="confirm_password"
                  value={values.confirm_password}
                  onChange={handleChange}
                  error={errors.confirm_password}
                  touched={touched.confirm_password}
                  onBlur={handleBlur}
                  isDisabled={pageType === "view"}
                  pr={"80px"}
                />
                <InputRightElement width="4.5rem">
                  <Button
                    height="1.75rem"
                    size="sm"
                    textColor={"textColor"}
                    onClick={() => {
                      setShow2(!show2);
                    }}
                    isDisabled={pageType === "view"}
                  >
                    {show2 ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl
            // isRequired
            // isInvalid={
            //   !!errors.phone?.code ||
            //   (!!errors.phone?.phoneNo && touched.phone?.code) ||
            //   touched.phone?.phoneNo
            // }
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
          <Flex columnGap={"10px"} pb="20px">
            <FormControl
              isInvalid={!!errors.employeeType && touched.employeeType}
            >
              <FormLabel>Access Type</FormLabel>
              <Core.Select
                isDisabled={pageType === "view"}
                placeholder="Select Type"
                name="employeeType"
                value={String(values.employeeType)}
                onChange={handleChange}
                onBlur={handleBlur}
                list={employeeTypeList}
                error={errors.employeeType}
                touched={touched.employeeType}
              />
            </FormControl>
            <FormControl
              isInvalid={
                !!errors.location &&
                touched.employeeType &&
                locations?.length > 0
              }
              onBlur={handleBlur}
            >
              <FormLabel>Facility/Location</FormLabel>
              <Core.MultiSelect
                name="location"
                isDisabled={pageType === "view"}
                list={locations}
                placeholder="Select Location"
                isMulti={true}
                onChange={handleLocationChange}
                error={errors.location}
                touched={touched.location}
                value={values.location}
              />
            </FormControl>
            {values.location?.length > 0 && (
              <FormControl
                width={"49%"}
                mb="10px"
                isInvalid={!!errors.role && touched.role}
                onBlur={handleBlur}
              >
                <FormLabel>Role</FormLabel>
                <Core.Select
                  placeholder="Select"
                  name="role"
                  value={String(values.role)}
                  onChange={handleRoleChange}
                  isDisabled={pageType === "view"}
                  error={errors.role}
                  touched={touched.role}
                  list={roles}
                />
              </FormControl>
            )}
            <FormControl
              isRequired
              isInvalid={!!errors.department && touched.department}
              onBlur={handleBlur}
            >
              <FormLabel>Department</FormLabel>
              <Core.Select
                placeholder="Select Department"
                isDisabled={pageType === "view"}
                list={departments}
                name="department"
                value={String(values.department)}
                onChange={handleChange}
                error={errors.department}
                touched={touched.department}
              />
            </FormControl>
          </Flex>
          <Flex columnGap={"10px"} pb="20px">
            <FormControl isInvalid={!!errors.access}>
              <RadioGroup
                value={String(values.access)}
                isDisabled={pageType === "view"}
                onChange={(value: string) => accessHandler(value)}
                name="access"
              >
                <FormLabel>Can access with</FormLabel>
                <Core.RadioButtons
                  data={["Web", "Mobile", "Both"]}
                  colorScheme="green"
                />
              </RadioGroup>
            </FormControl>
          </Flex>
          <Flex columnGap={"10px"} pb="20px">
            <RadioGroup
              value={String(values.active)}
              isDisabled={pageType === "view"}
              onChange={(value) => statusHandler(value)}
              name="status"
            >
              <FormLabel>Status</FormLabel>
              <Stack spacing={5} direction="row" mt="20px">
                <Radio colorScheme="green" value="true">
                  Active
                </Radio>
                <Radio colorScheme="red" value="false">
                  Inactive
                </Radio>
              </Stack>
            </RadioGroup>
          </Flex>
          <Flex justifyContent={"space-between"} columnGap={"20px"}>
            <Box w="50%">
              <Core.FormHeading3
                color="textColor"
                title="Module Permissions"
                // searchBox
              />
              <PermissionsList
                permissions={modulePermissions}
                setPermissions={setModulePermissions}
                // setIsRoleIdChange={setIsRoleIdChange}
                isDisabled={query?.slug === "view"}
                disableViews={false}
              />
            </Box>
            <Box borderLeft={"1px solid"} borderColor={"gray.200"}></Box>
            <Box w="50%">
              <Core.FormHeading3
                color="textColor"
                title="Operation Permissions"
                // searchBox
              />
              <PermissionsList
                permissions={operationPermissions}
                setPermissions={setOperationPermissions}
                // setIsRoleIdChange={setIsRoleIdChange}
                isDisabled={query?.slug === "view"}
                disableViews={false}
              />
            </Box>
          </Flex>
          {pageType !== "view" && (
            <Flex columnGap={"10px"} justifyContent="end">
              <Core.Button
                btnOrangeMd
                onClick={handleSubmit}
                isDisabled={Object.keys(errors).length > 0}
                isLoading={
                  imageUploading ||
                  isSubmitting ||
                  addEmployeeLoading ||
                  updateEmployeeLoading
                }
              >
                {pageType === "edit" ? "Update" : "Add"}
              </Core.Button>
            </Flex>
          )}
        </>
      )}
    </Box>
  );
};

export default memo(AddEmployeeForm);
