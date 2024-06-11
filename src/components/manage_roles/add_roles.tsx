import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useSelector } from "react-redux";

import { Core } from "@/components";
import { HandleLogout } from "@/components/auth";
import PermissionsList from "@/components/core/permissions_list/permissions_list";
import type {
  AddRoleMutation,
  FindRoleByIdQuery,
  IntModule,
  IntOperation,
  Role,
  RoleInput,
  RoleUpdateInput,
  UpdateRoleMutation,
} from "@/graphql/generated/graphql";
import { EmployeeType } from "@/graphql/generated/graphql";
import {
  AddRole,
  FindRoleById,
  GetFacilities,
  UpdateRole,
} from "@/services/api";
import {
  getDefinedPatternedName,
  removeCommonObjects,
} from "@/utils/helpers/functions";

import {
  addValidationSchema,
  addValidationSchemaForAdmin,
  updateValidationSchema,
  updateValidationSchemaForAdmin,
} from "./roles.validator";

interface IAddRoleFormProps {
  pageType: PageType;
}

interface IFacilitiesData {
  value: string;
  name: string;
}

const clientModuleViewPermissions: ModuleViewPermissions[] = [
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
      "report-templates.track",
      "report-templates.assign",
      "report-templates.submission",
    ],
  },
  {
    name: "tasks",
    views: ["tasks", "tasks.add", "tasks.edit", "tasks.track", "tasks.details"],
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

const adminModuleViewPermissions: ModuleViewPermissions[] = [
  {
    name: "email-&-notifications",
    views: [
      "email-&-notifications",
      "email-&-notifications.view",
      "email-&-notifications.add",
      "email-&-notifications.edit",
    ],
  },
];

const operationViewPermissionsForSuperAdminAndAdminUsers: OperationViewPermissions[] =
  [
    {
      name: "manage-admin",
      views: [
        "admin-manage-users",
        "manage-users.add",
        "manage-users.edit",
        "manage-users.view",
      ],
    },
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
      name: "about-us",
      views: ["about-us.edit"],
    },
    {
      name: "eula",
      views: ["eula.edit"],
    },
    {
      name: "faq",
      views: ["faq.edit"],
    },
    {
      name: "privacy-policy",
      views: ["privacy-policy.edit"],
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
      name: "payment",
      views: ["track.payments", "payment.details", "payment-records.track"],
    },
    {
      name: "geo-locations",
      views: [
        "geo-locations",
        "geo-locations.add",
        "geo-locations.edit",
        "geo-locations.view",
        "geo-locations.requests",
        "geo-locations.user-locations-listing",
        "geo-locations.users-live-location",
      ],
    },
  ];

const operationViewPermissionsForClientAndEmployee: OperationViewPermissions[] =
  [
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
        "employees",
        "employees.add",
        "employees.edit",
        "employees.view",
        "departments",
        "departments.add",
        "departments.view",
        "departments.edit",
        "departments.action",
      ],
    },
    {
      name: "geo-locations",
      views: [
        "geo-locations",
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
      views: [
        "subscriptions",
        "subscription.add",
        "subscription.edit",
        "subscription.view",
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
  ];

const AddRoleForm: React.FunctionComponent<IAddRoleFormProps> = ({
  pageType,
}) => {
  const user: IUser = useSelector((state: any) => state.user.user);
  const { push, query } = useRouter();
  const queryClient = useQueryClient();
  const [actionRoleId, setActionRoleId] = useState("");
  const [success, setSuccess] = useState<IAlertSuccessData>();
  const [fail, setFail] = useState<IAlertSuccessData>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [facilities, setFacilities] = useState<IFacilitiesData[]>([]);

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
  const operationViewPermissions: OperationViewPermissions[] = useMemo(
    () =>
      user?.company?._id && (user?.company?.employee || user?.company?.subAdmin)
        ? operationViewPermissionsForClientAndEmployee
        : operationViewPermissionsForSuperAdminAndAdminUsers,
    []
  );

  const evaluateClient = (): boolean => {
    return (
      Boolean(user.company._id) &&
      user.company.employeeType !== (EmployeeType.Pectora as any) &&
      user.company.employeeType !== (EmployeeType.Imported as any)
    );
  };

  const [prevData, setPrevData] = useState<FindRoleByIdQuery["findRoleById"]>({
    active: true,
    name: "",
    facility: "",
    user_id: "",
    _id: "",
    modules: [{ name: "", views: [""] }],
    operations: [{ name: "", views: [""] }],
  });

  const [modulesAndOperationsForActions, setModulesAndOperationsForActions] =
    useState<{
      modules: Array<IFeatureType>;
      operations: Array<IFeatureType>;
    }>();

  useQuery(
    "getFacilitiesForAddRole",
    () => GetFacilities({ userId: user._id || "" }),
    {
      onSuccess({ getFacilities }) {
        const facilityData: IFacilitiesData[] = [
          { name: "Select Facility", value: "" },
        ];
        getFacilities.forEach((item) => {
          if (item.active) {
            facilityData.push({
              name: item.facility,
              value: item._id ? item._id : "",
            });
          }
        });
        setFacilities(facilityData);
      },
      enabled: evaluateClient(),
      refetchOnMount: true,
    }
  );

  const { mutate: mutateCreateRole } = useMutation<
    AddRoleMutation,
    unknown,
    RoleInput
  >((variables) => AddRole({ roleInput: variables }), {
    onSuccess: () => {
      setIsLoading(false);
      setSuccess({
        status: true,
        title: "Added",
        description: "The role has been added successfully.",
      });
      setTimeout(() => {
        push("/manage-roles");
      }, 1000);
    },
    onError: (_: any) => {
      const errorMsg = _?.response?.errors[0]?.message || "Unable to add role.";
      setIsLoading(false);
      setFail({
        status: true,
        title: "Failed",
        description: errorMsg,
      });
    },
  });

  const { mutate: mutateUpdateRole } = useMutation<
    UpdateRoleMutation,
    unknown,
    RoleUpdateInput
  >((variables) => UpdateRole({ roleUpdateInput: variables }), {
    onSuccess: () => {
      setIsLoading(false);
      setSuccess({
        status: true,
        title: "Updated",
        description: "The role has been updated successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["mapRole"] });
      setTimeout(() => {
        push("/manage-roles");
      }, 1000);
    },
    onError: (_: any) => {
      setIsLoading(false);
      setFail({
        status: true,
        title: "Submit Failed",
        description: "Updating Role Failed.",
      });
    },
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

  useQuery(["mapRole"], () => FindRoleById({ findRoleByIdId: actionRoleId }), {
    onSuccess: ({ findRoleById }) => {
      setPrevData(findRoleById);
      const features: {
        modules: Array<ModuleViewPermissions>;
        operations: Array<OperationViewPermissions>;
      } = {
        modules:
          findRoleById?.modules?.map((item) => ({
            name: item ? (item.name as unknown as EModules) : ("" as EModules),
            views: item
              ? (item.views as unknown as EModuleViews[])
              : ["" as EModuleViews],
          })) || [],
        operations:
          findRoleById?.operations?.map((item) => ({
            name: item
              ? (item.name as unknown as EOperations)
              : ("" as EOperations),
            views: item
              ? (item.views as unknown as EOperationViews[])
              : ["" as EOperationViews],
          })) || [],
      };

      if (features.modules.length || features.operations.length) {
        setModulesAndOperationsForActions(features);
      }
    },
    onError(_: any) {
      if (
        _?.response?.errors?.length &&
        _?.response?.errors[0]?.message === "Not Authorised!"
      )
        HandleLogout();
      const errorMsg =
        _?.response?.errors[0]?.message || "Unable to get roles.";
      setFail({
        status: true,
        title: "Fetching Failed",
        description: errorMsg,
      });
    },
    refetchOnMount: true,
    enabled: Boolean(actionRoleId) && pageType !== "create", // Enable the query when actionRoleId is truthy, and pageType is not "create"
  });

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
      adminModuleViewPermissions.forEach((obj) => {
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
    } else if (!user?.company?.subAdmin && !user?.company?.employee) {
      // For Admin's Users
      // Filter Modules
      user?.modules?.forEach((userModuleObj: any) => {
        if (userModuleObj.name) {
          const views = userModuleObj.views
            .filter((view: any) =>
              adminModuleViewPermissions.some((module) =>
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
    } else if (user?.company?.subAdmin || user?.company?.employee) {
      // For Client Admin
      const operations = user?.operations.filter(
        (operation) =>
          !defaultPermissions.some((dp) => dp.name === operation.name)
      );

      // Filter Modules
      user?.package?.modules?.forEach((userModuleObj: any) => {
        if (userModuleObj.name) {
          const views = userModuleObj.views
            .filter((view: any) =>
              clientModuleViewPermissions.some((module) =>
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
    setModulePermissions(tempModulePermissions);
    setOperationPermissions(tempOperationPermissions);
  }, [user?.active, modulesAndOperationsForActions]);

  const { handleSubmit, handleChange, values, errors, touched, setFieldValue } =
    useFormik<Role>({
      initialValues: {
        active: prevData.active ? prevData.active : false,
        name: prevData.name ? prevData.name : "",
        user_id: prevData.user_id ? prevData.user_id : String(user._id),
        facility: prevData.facility,
        _id: prevData._id ? prevData._id : "",
        modules: prevData.modules
          ? prevData.modules
          : [{ name: "", views: [""] }],
        operations: prevData.operations
          ? prevData.operations
          : [{ name: "", views: [""] }],
      },
      enableReinitialize: true,
      onSubmit: (inputValues): void => {
        setIsLoading(true);

        if (
          !modulePermissions.some((_) => _.name.active) &&
          !operationPermissions.some((_) => _.name.active)
        ) {
          setFail({
            status: true,
            title: "Failed",
            description: "Please select at least a Module or an Operation",
          });
          setIsLoading(false);
          return;
        }

        const roleModules: ModuleViewPermissions[] = [];
        modulePermissions?.forEach((module) => {
          if (module.name.active) {
            const views: EModuleViews[] = [];
            module.views.forEach(
              (view: any) => view.active && views.push(view.key)
            );
            roleModules.push({
              name: module.name.key as EModules,
              views: views as EModuleViews[],
            });
          }
        });

        const roleOperations: OperationViewPermissions[] = [];
        operationPermissions?.forEach((module) => {
          if (module.name.active) {
            const views: EOperationViews[] = [];
            module.views.forEach(
              (view: any) => view.active && views.push(view.key)
            );
            roleOperations.push({
              name: module.name.key as EOperations,
              views: views as EOperationViews[],
            });
          }
        });

        const modules: IntModule[] = roleModules.map((module) => {
          return {
            name: module.name,
            views: module.views,
          };
        });

        let operations: IntOperation[] = roleOperations.map((operation) => {
          return {
            name: operation.name,
            views: operation.views,
          };
        });
        operations = operations.concat(defaultPermissions);

        if (pageType === "edit") {
          mutateUpdateRole({
            _id: String(query.id),
            active: inputValues.active,
            facility: evaluateClient() ? inputValues.facility : null,
            modules,
            operations,
            name: inputValues.name,
          });
        } else {
          mutateCreateRole({
            active: inputValues.active,
            name: inputValues.name,
            facility: evaluateClient() ? inputValues.facility : null,
            user_id: user?.belongsTo ? user.belongsTo : inputValues.user_id,
            modules,
            operations,
          });
        }
      },
      validationSchema:
        pageType === "edit"
          ? evaluateClient()
            ? updateValidationSchema
            : updateValidationSchemaForAdmin
          : evaluateClient()
          ? addValidationSchema
          : addValidationSchemaForAdmin,
    });

  useEffect(() => {
    if (pageType && query.id) {
      setActionRoleId(String(query.id));
    }
  }, [pageType, query.id]);

  const statusHandler = (value: string) => {
    const active = value === "true";
    setFieldValue("active", active);
  };

  return (
    <Box>
      <Core.Alert show={success} theme="success" />
      <Core.Alert show={fail} theme="error" />
      {/* <Core.FormHeading3 
color="textColor" title="Role Details" /> */}
      <Flex columnGap={"20px"} pb="20px" mb="30px">
        <Box width="32%">
          <FormControl isRequired isInvalid={!!errors.name && touched.name}>
            <FormLabel>Role</FormLabel>
            <Core.Input
              name="name"
              placeholder="Enter Role"
              type="text"
              onChange={handleChange}
              value={getDefinedPatternedName(values.name)}
              errorBorderColor="red.300"
              error={errors.name}
              touched={touched.name}
              isDisabled={pageType === "view"}
            />
          </FormControl>
        </Box>
        <Box width="32%">
          <FormControl>
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
          </FormControl>
        </Box>
        {evaluateClient() && (
          <FormControl
            isRequired
            isInvalid={!!errors.facility && touched.facility}
          >
            <FormLabel>Facility</FormLabel>
            <Core.Select
              name="facility"
              placeholder="Select Facility"
              isDisabled={pageType === "view"}
              list={facilities}
              value={String(values.facility)}
              onChange={handleChange}
              error={errors.facility}
              touched={touched.facility}
            />
          </FormControl>
        )}
      </Flex>

      <Flex justifyContent={"space-between"} columnGap={"20px"}>
        {modulePermissions.length > 0 && (
          <>
            <Box w="50%">
              <Core.FormHeading3
                color="textColor"
                title="Module Permissions"
                // searchBox
              />
              <PermissionsList
                permissions={modulePermissions}
                setPermissions={setModulePermissions}
                isDisabled={pageType === "view"}
                disableViews={false}
              />
            </Box>
            <Box borderLeft={"1px solid"} borderColor={"gray.200"}></Box>
          </>
        )}
        <Box w="50%">
          <Core.FormHeading3
            color="textColor"
            title="Operation Permissions"
            // searchBox
          />
          <PermissionsList
            permissions={operationPermissions}
            setPermissions={setOperationPermissions}
            isDisabled={pageType === "view"}
            disableViews={false}
          />
        </Box>
      </Flex>

      {pageType !== "view" && (
        <Flex
          columnGap={"10px"}
          justifyContent="end"
          borderTop={"1px solid"}
          borderColor={"gray.200"}
        >
          <Core.Button
            btnOrangeMd
            onClick={handleSubmit}
            isDisabled={values?.name === ""}
            isLoading={isLoading}
          >
            {pageType === "edit" ? "Update" : "Add"}
          </Core.Button>
        </Flex>
      )}
    </Box>
  );
};

export default AddRoleForm;
