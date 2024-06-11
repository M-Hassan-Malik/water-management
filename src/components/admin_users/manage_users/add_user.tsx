import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import type { ChangeEventHandler } from "react";
import { memo, useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useSelector } from "react-redux";

import { Core } from "@/components";
import { HandleLogout } from "@/components/auth";
import PermissionsList from "@/components/core/permissions_list/permissions_list";
import type {
  AddUserAdminMutation,
  InputUser,
  IntModule,
  IntOperation,
  UpdateAdminUserMutation,
} from "@/graphql/generated/graphql";
import {
  AddUserAdmin,
  FindRoleById,
  FindRolesByUserId,
  UpdateAdminUser,
  UserById,
} from "@/services/api";
import { removeCommonObjects } from "@/utils/helpers/functions";

import {
  addValidationSchema,
  updateValidationSchema,
} from "./add_user.validator";

interface IAddUserFormProps {}

enum EmployeeType {
  SUBADMIN = "SUBADMIN",
  MANAGER = "MANAGER",
  LIFEGUARD = "LIFEGUARD",
}

enum FAQStatus {
  MOBILE = "MOBILE",
  WEB = "WEB",
  BOTH = "BOTH",
}

const AddUserForm: React.FunctionComponent<IAddUserFormProps> = (_props) => {
  const { query, push } = useRouter();
  const { id } = useMemo(() => query as unknown as IPageQuery, [query]);
  const user: IUser = useSelector((state: any) => state.user.user);
  const [success, setSuccess] = useState<IAlertSuccessData>();
  const [error, setError] = useState<IAlertSuccessData>();
  const [userId, setUserId] = useState("");
  const [roleId, setRoleId] = useState("");
  const [isNotFirstTime, setIsNotFirstTime] = useState(false);
  const [actionUserId, setActionUserId] = useState("");
  const [roles, setRoles] = useState<{ name: string; value: string }[]>([]);
  const [show, setShow] = useState(false);
  const queryClient = useQueryClient();
  const [phoneNumber, setPhoneNumber] = useState<{
    code: string;
    phoneNo: string;
  }>({
    code: "",
    phoneNo: "",
  });
  const [isRoleIdChange, setIsRoleIdChange] = useState(false);

  const [prevData, setPrevData] = useState<IUser>({
    _id: "",
    active: false,
    admin: false,
    company: {
      location: [],
      park: {
        additionalDetails: {},
        locations: [
          {
            additionalDetails: {},
            address: "",
            facility: "",
            city: "",
            GPS: { lat: 0, lng: 0 },
            state: "",
            _id: "",
            active: false,
            country: "",
          },
        ],
        logo: "",
        name: "",
        _id: "",
      },
      subAdmin: false,
      _id: "",
      employee: false,
      employeeType: EmployeeType.SUBADMIN,
    },
    email: "",
    access: FAQStatus.WEB,
    stripeCustomerId: "",
    first_name: "",
    last_name: "",
    modules: [{ name: "" as EModules, views: ["" as EModuleViews] }],
    operations: [{ name: "" as EOperations, views: ["" as EOperationViews] }],
    phone: {
      code: "",
      phoneNo: "",
      _id: "",
    },
    photo_url: "",
    rec_email: "",
    role: {
      active: false,
      modules: [],
      name: "",
      operations: [],
      _id: "",
      user_id: "",
    },
    scopes: [""],
    password: "",
    deviceToken: "",
    temporary_password: false,
    belongsTo: "",
    created_by: "",
    themeId: "",
    liveLocation: {
      lat: 0.0,
      lng: 0.0,
    },
  });
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

  const moduleViewPermissions: ModuleViewPermissions[] = useMemo(
    () => [
      {
        name: "email-&-notifications",
        views: [
          "email-&-notifications",
          "email-&-notifications.view",
          "email-&-notifications.add",
          "email-&-notifications.edit",
        ],
      },
    ],
    []
  );

  const operationViewPermissions: OperationViewPermissions[] = useMemo(
    () => [
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
          "geo-locations.view",
          "geo-locations.edit",
          "geo-locations.requests",
          "geo-locations.user-locations-listing",
          "geo-locations.users-live-location",
        ],
      },
    ],
    []
  );

  useQuery(
    ["populateRolesInSelect"],
    () => FindRolesByUserId({ findRolesByUserIdId: userId }),
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
        setError({
          status: true,
          title: "Unable to get roles",
          description: "Failed to get roles",
        });
      },
      // Enable the query when userId is truthy
      enabled: Boolean(userId),
    }
  );

  useQuery(
    ["mapUserForAdminUser"],
    () => UserById({ userByIdId: actionUserId }),
    {
      onSuccess: ({ userById }: { userById: IUser }) => {
        if (userById) {
          setPrevData(userById);
          const features: {
            modules: ModuleViewPermissions[];
            operations: OperationViewPermissions[];
          } = {
            modules: userById?.modules || [],
            operations: userById?.operations || [],
          };
          // to check if operations and modules are not empty
          if (features.modules.length || features.operations.length)
            setModulesAndOperationsForActions(features);

          setPhoneNumber(userById.phone);
        }
      },
      onError(_: any) {
        if (
          _?.response?.errors?.length &&
          _?.response?.errors[0]?.message === "Not Authorised!"
        )
          HandleLogout();
        setError({
          status: true,
          title: "Unable to get user",
          description: "Failed to Map User on fields.",
        });
      },
      enabled: Boolean(actionUserId),
    }
  );

  const { mutate: mutateNewUser, isLoading: addUserLoading } = useMutation<
    AddUserAdminMutation,
    unknown,
    InputUser
  >((variables) => AddUserAdmin({ signupInput: variables }), {
    onSuccess: () => {
      setSuccess({
        status: true,
        title: "Added",
        description: "User has been added successfully.",
      });
      setTimeout(() => {
        push("/admin-manage-users");
      }, 1000);
    },
    onError: (_: any) => {
      setError({
        status: true,
        title: "Failed",
        description: _?.response?.errors[0]?.message,
      });
    },
  });

  const { mutate: mutateUpdateUser, isLoading: updateUserLoading } =
    useMutation<UpdateAdminUserMutation, unknown, InputUser>(
      (variables) => UpdateAdminUser({ updateAdminUserInput: variables }),
      {
        onSuccess: () => {
          setSuccess({
            status: true,
            title: "Updated",
            description: "User updated successfully.",
          });
          queryClient.invalidateQueries({ queryKey: ["mapUser"] });
          setTimeout(() => {
            push("/admin-manage-users");
          }, 1000);
        },
        onError: (_: any) => {
          setError({
            status: true,
            title: "Fail to add user",
            description: _?.response?.errors[0]?.message,
          });
        },
      }
    );

  const {
    handleSubmit,
    handleChange,
    values,
    errors,
    touched,
    isSubmitting,
    setFieldValue,
  } = useFormik<IUserInput>({
    initialValues: {
      _id: prevData._id ? prevData._id : "",
      active: prevData.active ? prevData.active : false,
      admin: prevData.admin ? prevData.admin : false,
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
      package: "",
      role: prevData.role ? prevData.role._id : roles[0]?.value,
      access: prevData.access,
      phone: prevData?.phone?.phoneNo
        ? prevData.phone
        : { code: "", phoneNo: "" },
    },
    enableReinitialize: true,
    onSubmit: (inputValues) => {
      if (
        !modulePermissions.some((_) => _.name.active) &&
        !operationPermissions.some((_) => _.name.active)
      ) {
        setError({
          status: true,
          title: "Failed",
          description: "Please select at least a Module or an Operation",
        });
        return;
      }

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

      if (query?.slug === "edit") {
        mutateUpdateUser({
          email: inputValues.email,
          first_name: inputValues.first_name,
          last_name: inputValues.last_name,
          password: inputValues.password,
          _id: inputValues._id,
          active: inputValues.active,
          modules,
          operations,
          role: inputValues.role,
          phone: inputValues.phone,
          access: inputValues.access,
        });
      } else {
        mutateNewUser({
          email: inputValues.email,
          first_name: inputValues.first_name,
          last_name: inputValues.last_name,
          password: inputValues.password,
          active: inputValues.active,
          modules,
          operations,
          role: inputValues.role,
          phone: inputValues.phone,
          access: inputValues.access,
        });
      }
    },
    validationSchema:
      query?.slug === "edit" ? updateValidationSchema : addValidationSchema,
  });

  useQuery(
    ["mapRoleInFeaturesPermissionsForUser", roleId],
    () => FindRoleById({ findRoleByIdId: roleId }),
    {
      onSuccess: ({ findRoleById }: { findRoleById: IRole }) => {
        if (findRoleById) {
          const features: {
            modules: ModuleViewPermissions[];
            operations: OperationViewPermissions[];
          } = {
            modules: findRoleById?.modules || [],
            operations: findRoleById?.operations || [],
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
        setError({
          status: true,
          title: "Failed",
          description: "Failed to auto-populate roles on permissions.",
        });
      },
      enabled: Boolean(roleId),
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

    if (user.admin) {
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

    if (user._id) setUserId(user._id);
    setModulePermissions(tempModulePermissions);
    setOperationPermissions(tempOperationPermissions);
  }, [user.active, modulesAndOperationsForActions]);

  const handleRoleChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const role = e.target.value;

    setFieldValue("role", role);
    setRoleId(role);
    setIsRoleIdChange(true);
    setIsNotFirstTime(true);
  };

  useEffect(() => {
    if (query.slug && id) setActionUserId(id);
  }, [query.slug, id]);

  const statusHandler = (value: string) => {
    const active = value === "true";
    setFieldValue("active", active);
  };

  const accessHandler = (value: string) => {
    setFieldValue("access", value);
  };

  const checkAndUpdateRole = () => {
    if (!isRoleIdChange) {
      const hasActiveChanged = modulePermissions.some(
        (module) =>
          module.views.some((view) => view.active) || module.name.active
      );

      const hasOperationsActiveChanged = operationPermissions.some(
        (module) =>
          module.views.some((view) => view.active) || module.name.active
      );

      if (hasActiveChanged || hasOperationsActiveChanged) {
        setIsNotFirstTime(true);
      }

      if (isNotFirstTime && (hasActiveChanged || hasOperationsActiveChanged)) {
        setRoleId("");
        setFieldValue("role", "");
      }
    }
    setIsRoleIdChange(false);
  };

  useEffect(() => {
    checkAndUpdateRole();
  }, [modulePermissions, operationPermissions]);

  return (
    <Box>
      <Core.Alert show={success} theme="success" />
      <Core.Alert show={error} theme="error" />
      {/* <Core.FormHeading3
        title={`${
          type ? type.charAt(0).toUpperCase() + type.slice(1) : "Add"
        } Details`}
      /> */}
      <Flex columnGap={"10px"} pb="20px" mb="30px" flexWrap={"wrap"}>
        <FormControl
          isRequired
          width={"49%"}
          mb="10px"
          isInvalid={!!errors.first_name && touched.first_name}
        >
          <FormLabel>First Name</FormLabel>
          <Core.Input
            name="first_name"
            placeholder="First Name"
            type="text"
            onChange={handleChange}
            value={values.first_name}
            error={errors.first_name}
            touched={touched.first_name}
            isDisabled={query?.slug === "view"}
          />
        </FormControl>
        <FormControl
          isRequired
          width={"49%"}
          mb="10px"
          isInvalid={!!errors.last_name && touched.last_name}
        >
          <FormLabel>Last Name</FormLabel>
          <Core.Input
            placeholder="Last Name"
            type="text"
            onChange={handleChange}
            name="last_name"
            value={values.last_name}
            error={errors.last_name}
            touched={touched.last_name}
            isDisabled={query?.slug === "view"}
          />
        </FormControl>
        <FormControl
          isRequired
          width={"49%"}
          mb="10px"
          isInvalid={!!errors.email && touched.email}
        >
          <FormLabel>Email</FormLabel>
          <Core.Input
            placeholder="Email"
            type="email"
            onChange={handleChange}
            name="email"
            value={values.email.toLowerCase().trim()}
            error={errors.email}
            touched={touched.email}
            isDisabled={query?.slug === "view"}
          />
        </FormControl>
        {query?.slug !== "view" && (
          <FormControl
            isRequired
            width={"49%"}
            mb="10px"
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
                isDisabled={query?.slug === "view"}
              />
              <InputRightElement width="4.5rem">
                <Button
                  height="1.75rem"
                  size="sm"
                  textColor={"textColor"}
                  onClick={() => {
                    setShow(!show);
                  }}
                  isDisabled={query?.slug === "view"}
                >
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
        )}
        <FormControl
          width={"49%"}
          mb="10px"
          isInvalid={!!errors.role && touched.role}
        >
          <FormLabel>Role</FormLabel>
          <Core.Select
            placeholder="Select"
            name="role"
            value={values.role}
            onChange={handleRoleChange}
            isDisabled={query?.slug === "view"}
            error={errors.role}
            touched={touched.role}
            list={roles}
          />
        </FormControl>
        <FormControl
          width={"49%"}

          // isRequired
          // isInvalid={
          //   !!errors.phone?.code ||
          //   (!!errors.phone?.phoneNo && touched.phone?.code) ||
          //   touched.phone?.phoneNo
          // }
        >
          <FormLabel>Phone:</FormLabel>
          <Core.PhoneNumber
            isDisabled={query?.slug === "view"}
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            setFieldValue={setFieldValue}
          />
        </FormControl>
        <FormControl isInvalid={!!errors.access} mb="10px">
          <RadioGroup
            value={String(values.access)}
            isDisabled={query?.slug === "view"}
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
        <FormControl>
          <FormLabel>Status</FormLabel>
          <RadioGroup
            name="active"
            value={String(values.active)}
            onChange={(value) => statusHandler(value)}
            isDisabled={query?.slug === "view"}
          >
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
      </Flex>
      <>
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
              setIsRoleIdChange={setIsRoleIdChange}
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
              setIsRoleIdChange={setIsRoleIdChange}
              isDisabled={query?.slug === "view"}
              disableViews={false}
            />
          </Box>
        </Flex>
        <Flex
          columnGap={"10px"}
          justifyContent="end"
          display={query?.slug === "view" ? "none" : "flex"}
        >
          {/* <Core.Button btnGrayMd>Cancel</Core.Button> */}
          <Core.Button
            btnOrangeMd
            onClick={handleSubmit}
            isLoading={isSubmitting && (addUserLoading || updateUserLoading)}
            isDisabled={isSubmitting && (addUserLoading || updateUserLoading)}
          >
            {query?.slug === "edit" ? "Update User" : "Add User"}
          </Core.Button>
        </Flex>
      </>
    </Box>
  );
};

export default memo(AddUserForm);
