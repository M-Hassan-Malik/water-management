import {
  Box,
  Card,
  Flex,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  Switch,
} from "@chakra-ui/react";
import axios from "axios";
import moment from "moment";
import { Types } from "mongoose";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import type { UseMutateFunction } from "react-query";
import { useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";

import { Core } from "@/components";
import { HandleLogout } from "@/components/auth";
import { FileInput } from "@/components/training";
import type {
  AttachTaskToTrainingInput,
  AttachTaskToTrainingMutation,
  TaskAssigned,
  UserInput,
} from "@/graphql/generated/graphql";
import {
  EAssignBy,
  EAssignerComponentId,
  EPriority,
  EScheduleType,
  FAQStatus,
} from "@/graphql/generated/graphql";
import {
  AttachTaskToTraining,
  FindMyUsers,
  GetFacilities,
  GetFailedVAT,
  GetPectoraAuth,
  ManageRolesListing,
} from "@/services/api";
import { parseCsvFile, parseExcelFile } from "@/utils/parseFile";

interface IAssignerProps {
  id: EAssignerComponentId;
  showDueDate: boolean;
  mutate: UseMutateFunction<any, any, any>;
  _id: string;
  status: "error" | "idle" | "loading" | "success";
  isLoading: boolean;
  showScheduling: boolean;
  enableExternalUsers: boolean;
}

interface IVATList {
  _id: string;
  title: string;
  detail: string;
  deadline: string;
}

const priorityList = [
  {
    name: "Standard",
    value: EPriority.Standard,
  },
  {
    name: "Low",
    value: EPriority.Low,
  },
  {
    name: "Alert",
    value: EPriority.Alert,
  },
  {
    name: "Emergency",
    value: EPriority.Emergency,
  },
];

const VATcolumns = ["title", "detail", "deadline"];
const userColumns = ["first_name", "last_name", "email", "status", "external"];
const facilityColumns = ["facility", "city", "state", "country", "active"];
const roleColumns = ["name", "activeUsers", "status"];

const Assigner: React.FC<IAssignerProps> = ({
  id,
  _id,
  mutate,
  status,
  showDueDate,
  isLoading,
  showScheduling,
  enableExternalUsers,
}) => {
  const { replace } = useRouter();

  // For In Service Training to Get Pectora Users
  // const filterByOptions =
  //   id === EAssignerComponentId.Training ||
  //   id === EAssignerComponentId.InService
  //     ? ["Name", "dynamicObjects"]
  //     : ["Name"];

  const filterByOptions = ["Name"];

  const scheduleList =
    id === EAssignerComponentId.Task
      ? [
          {
            name: "One-time",
            value: EScheduleType.OneTime,
          },
          {
            name: "Daily",
            value: EScheduleType.Daily,
          },
          {
            name: "Weekly",
            value: EScheduleType.Weekly,
          },
          {
            name: "Monthly",
            value: EScheduleType.Monthly,
          },
          {
            name: "Always",
            value: EScheduleType.Always,
          },
        ]
      : id === EAssignerComponentId.Report
      ? [
          {
            name: "One-time",
            value: EScheduleType.OneTime,
          },
          {
            name: "Daily",
            value: EScheduleType.Daily,
          },
          {
            name: "Weekly",
            value: EScheduleType.Weekly,
          },
          {
            name: "Monthly",
            value: EScheduleType.Monthly,
          },
          {
            name: "Always",
            value: EScheduleType.Always,
          },
        ]
      : [
          {
            name: "One-time",
            value: EScheduleType.OneTime,
          },
          {
            name: "Daily",
            value: EScheduleType.Daily,
          },
          {
            name: "Weekly",
            value: EScheduleType.Weekly,
          },
          {
            name: "Monthly",
            value: EScheduleType.Monthly,
          },
        ];

  const assignByList =
    id === EAssignerComponentId.EmailNotification ||
    id === EAssignerComponentId.Training ||
    id === EAssignerComponentId.InService
      ? [
          {
            name: EAssignBy.User,
            value: EAssignBy.User,
          },
        ]
      : [
          {
            name: EAssignBy.Facility,
            value: EAssignBy.Facility,
          },
          {
            name: EAssignBy.User,
            value: EAssignBy.User,
          },
          {
            name: EAssignBy.Role,
            value: EAssignBy.Role,
          },
        ];

  const reduxUser: IUser = useSelector((state: any) => state.user.user);
  const [users, setUsers] = useState<IUser[] | any[]>([]);
  const [roles, setRoles] = useState<IRole[] | any[]>([]);
  const [facilities, setFacilities] = useState<IParkLocation[] | any[]>([]);
  const [pectoraUsers, setPectoraUsers] = useState<IUser[] | any[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<IUser[] | any[]>([]);
  const [importedUsers, setImportedUsers] = useState<IUser[] | any[]>([]);
  const [overAllUsers, setOverAllUsers] = useState<IUser[] | any[]>([]);
  const [tableFilters, setTableFilters] = useState<ITableFilters | null>(null);
  const [showVATs, setShowVATs] = useState<boolean>(false);
  const [pectoraFetching, setPectoraFetching] = useState<boolean>(false);
  const [fail, setFail] = useState<IAlertSuccessData>();
  const [success, setSuccess] = useState<IAlertSuccessData>();
  const [dueDate, setDueDate] = useState<Date>();
  const [assignBy, setAssignBy] = useState<EAssignBy>(EAssignBy.User);
  const [selectedUserIds, setSelectedUserIds] = useState<string | []>([]);
  const [selectedFacilityId, setSelectedFacilityId] = useState();
  const [selectedVATId, setSelectedVATId] = useState<string>("");
  const [selectedRoleIds, setSelectedRoleIds] = useState<string[]>([]);
  const [VATs, setVATs] = useState<IVATList[]>();
  const [scheduleType, setScheduleType] = useState<EScheduleType>(
    EScheduleType.OneTime
  );
  const [priority, setPriority] = useState<EPriority>(EPriority.Standard);

  const { refetch: fetchRole, isFetching: isRolesFetching } = useQuery(
    ["RolesListing"],
    () => ManageRolesListing({ userId: reduxUser._id || "" }),
    {
      onSuccess: ({ manageRolesListing }) => {
        setRoles(manageRolesListing);
      },
      onError(_: any) {
        if (
          _?.response?.errors?.length &&
          _?.response?.errors[0]?.message === "Not Authorised!"
        )
          HandleLogout();

        setFail({
          status: true,
          title: "Filter",
          description: _?.response?.errors[0]?.message,
        });
      },
      // Enable the query when userId is truthy
      enabled: Boolean(reduxUser._id),
    }
  );

  const { refetch: fetchUsers, isFetching: isUsersLoading } = useQuery(
    ["findAllMyUsers", tableFilters?.dynamicObjectId],
    () =>
      FindMyUsers({
        ownerId: reduxUser?._id || "",
        facilityId: tableFilters?.dynamicObjectId,
      }),
    {
      onSuccess({ findMyUsers }) {
        setUsers(
          findMyUsers.map((_) => ({
            _id: String(_._id),
            first_name: _.first_name,
            last_name: _.last_name,
            email: _.email,
            status: _.status,
            external: String(_.company?.employeeType),
          }))
        );
      },
      onError(_: any) {
        if (
          _?.response?.errors?.length &&
          _?.response?.errors[0]?.message === "Not Authorised!"
        )
          HandleLogout();
      },
      refetchOnMount: true,
    }
  );

  const { refetch: fetchFacility, isFetching: isFacilityLoading } = useQuery(
    "getFacilitiesAtAssingerModule",
    () =>
      GetFacilities({
        userId: reduxUser?._id || "",
        filter: { _id, moduleId: id },
      }),
    {
      onSuccess({ getFacilities }) {
        const tempData: any[] = [];
        getFacilities.forEach((_) => {
          if (_?.active) {
            tempData.push({
              _id: _._id,
              facility: _.facility,
              city: _.city,
              state: _.state,
              country: _.country,
              status: _.active,
            });
          }
        });
        setFacilities(tempData);
      },
      onError(_: any) {
        if (
          _?.response?.errors?.length &&
          _?.response?.errors[0]?.message === "Not Authorised!"
        )
          HandleLogout();
      },
      refetchOnMount: true,
      enabled:
        id === EAssignerComponentId.Training ||
        id === EAssignerComponentId.InService,
    }
  );

  const { isLoading: isLoadingVATs } = useQuery(
    ["getFailedVATAttach"],
    () =>
      GetFailedVAT({
        facilityId: String(reduxUser?.company?.location[0]?._id),
      }),
    {
      onSuccess: ({ getFailedVAT }) => {
        const data: IVATList[] = getFailedVAT.flatMap((_) => ({
          _id: _._id || "",
          title: _.taskAssignedRef.title || "",
          detail: _.taskAssignedRef.detail || "",
          deadline: _.taskAssignedRef.deadline || "",
        }));

        setVATs(data);
      },
      onError(_: any) {
        if (
          _?.response?.errors?.length &&
          _?.response?.errors[0]?.message === "Not Authorised!"
        )
          HandleLogout();
      },
      enabled: showVATs && Boolean(reduxUser?.company?.location[0]?._id),
      refetchOnMount: true,
    }
  );

  const requestAPI = async (auth: any) => {
    setPectoraFetching(true);
    const { data }: IResponseAPI = await axios.post(
      `${process.env.FRONT_END_URL}/api/pectora/users`,
      {
        x_auth_id: auth.X_Auth_Id,
        x_auth_token: auth.X_Auth_Token,
      }
      // {
      //   headers: {
      //     x_auth_id: auth.X_Auth_Id,
      //     x_auth_token: auth.X_Auth_Token,
      //   },
      // }
    );
    const temp = data.data.data.flatMap((_: any): any => ({
      _id: _.id,
      first_name: _.first_name,
      last_name: _.last_name,
      email: _.email,
      phone: _.phone,
      external: "PECTORA",
    }));
    setPectoraUsers(temp);
    setFilteredUsers(temp);
    setPectoraFetching(false);
  };

  useEffect(() => {
    const tempUsers = pectoraUsers.filter((item: ITableFilters | any) => {
      const nameMatch =
        tableFilters?.Name &&
        item.first_name
          ?.toLowerCase()
          .startsWith(tableFilters.Name.toLowerCase());
      const emailMatch =
        tableFilters?.Email &&
        item?.email?.toLowerCase().startsWith(tableFilters.Email.toLowerCase());

      if (tableFilters?.Name && !tableFilters?.Email) {
        // Condition 1: Only tableFilters?.Name exists
        return nameMatch;
      }

      if (!tableFilters?.Name && tableFilters?.Email) {
        // Condition 2: Only tableFilters?.Email exists
        return emailMatch;
      }

      if (tableFilters?.Name && tableFilters?.Email) {
        // Condition 3: Both tableFilters?.Name and tableFilters?.Email exist
        return nameMatch || emailMatch;
      }

      // Default condition: No filters
      return true;
    });

    setFilteredUsers(tempUsers);
  }, [tableFilters?.Name]);

  const { isLoading: isPectoraUsersLoading } = useQuery(
    ["getPectoraAuthAtAssigner", tableFilters?.dynamicObjectId],
    () => GetPectoraAuth({ facilityId: tableFilters?.dynamicObjectId || "" }),
    {
      onSuccess({ getPectoraAuth }) {
        setSelectedUserIds([]);
        requestAPI(getPectoraAuth);
      },
      onError(_: any) {
        if (
          _?.response?.errors?.length &&
          _?.response?.errors[0]?.message === "Not Authorised!"
        )
          HandleLogout();
        setSelectedUserIds([]);
        setPectoraUsers([]);
      },
      refetchOnMount: true,
      enabled: Boolean(tableFilters?.dynamicObjectId) && enableExternalUsers,
    }
  );

  useEffect(() => {
    if (enableExternalUsers) {
      const arr = [...filteredUsers, ...importedUsers, ...users].sort(
        (a, b) => {
          if (a.external === "PECTORA" && b.external !== "PECTORA") {
            return 1;
          }
          if (a.external !== "PECTORA" && b.external === "PECTORA") {
            return -1;
          }
          return 0;
        }
      );
      setOverAllUsers(arr);
    }
  }, [filteredUsers, users]);

  useEffect(() => {
    if (importedUsers.length) {
      const sorted = [...filteredUsers, ...importedUsers, ...users].sort(
        (a, b) => {
          if (a.external === "PECTORA" && b.external !== "PECTORA") {
            return 1;
          }
          if (a.external !== "PECTORA" && b.external === "PECTORA") {
            return -1;
          }
          return 0;
        }
      );
      setOverAllUsers(sorted);
    }
  }, [importedUsers]);

  const { mutate: mutateVAT, isLoading: isLoadingVAT } = useMutation<
    AttachTaskToTrainingMutation,
    unknown,
    AttachTaskToTrainingInput
  >(
    (variables) =>
      AttachTaskToTraining({ attachTaskToTrainingInput: variables }),
    {
      onSuccess: ({ attachTaskToTraining }) => {
        setSuccess({
          status: true,
          title: "Success",
          description: attachTaskToTraining,
        });
        replace(`/trainings/track`);
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

  const onSubmit = (): void => {
    if (showDueDate && scheduleType !== EScheduleType.Always && !dueDate) {
      setFail({
        status: true,
        title: "Error",
        description: "Please select Due Date",
      });
      return;
    }
    let mutationObj: any = {};

    // For VAT
    if (assignBy === EAssignBy.User && showVATs && selectedUserIds.length) {
      // implement link vat mutation here
      mutationObj = {
        id: _id,
        assigner_id: reduxUser?._id,
        assignTo: selectedUserIds, // For users to assign multiple IDs
        scheduleType,
        priority,
        assignBy,
        dueDate,
      };

      // Mutation Declared for VAT is in this component
      mutateVAT({
        VAT_id: selectedVATId,
        trainingId: _id,
        createdBy: reduxUser?._id as string,
        assignTo: selectedUserIds as string,
        dueDate,
        priority,
      });
    } else if (
      assignBy === EAssignBy.User &&
      !showVATs &&
      selectedUserIds.length
    ) {
      if (id === EAssignerComponentId.EmailNotification) {
        // for email&Notification Feature
        mutationObj = {
          id: _id,
          assigner_id: reduxUser?._id,
          assignTo: selectedUserIds,
          assignBy,
          priority,
        };
      }
      // for PECTOEA or File IMPORTED Users
      else if (
        (id === EAssignerComponentId.Training ||
          id === EAssignerComponentId.InService) &&
        (filteredUsers.length || importedUsers.length)
      ) {
        if (tableFilters && !tableFilters?.dynamicObjectId) {
          setFail({
            status: true,
            title: "Error",
            description:
              "When selecting external users, Please select Facility from dropdown",
          });
          return;
        }

        let externalUsers: any[] = selectedUserIds as any[];
        const usersSegregation: { internal: string[]; external: string[] } = {
          internal: [],
          external: [],
        };

        externalUsers?.forEach((_: string) => {
          if (_.includes("-")) usersSegregation.external.push(_);
          else usersSegregation.external.push(_);
        });

        externalUsers = [];

        filteredUsers.forEach((pectoraUser: IUser) => {
          if (
            pectoraUser?._id &&
            usersSegregation.external.includes(pectoraUser._id)
          ) {
            externalUsers.push({
              _id: pectoraUser._id.replace(/-/g, "").substring(0, 24), //   .replace(/-/g, "") to remove - and .substring(0, 24) to get first 24 Characters of string
              first_name: pectoraUser.first_name,
              last_name: pectoraUser.last_name,
              email: pectoraUser.email,
              access: FAQStatus.MOBILE,
              rec_email: "",
              stripeCustomerId: "",
              photo_url: "",
              operations: [
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
              modules: [],
              phone: {
                code: "+1",
                phoneNo: "+12345678910",
              },
              scopes: [],
              company: {
                subAdmin: false,
                park: reduxUser.company.park._id,
                location: tableFilters && tableFilters.dynamicObjectId,
                employee: true,
                employeeType: "PECTORA",
              },
              liveLocation: {
                lat: 0.0,
                lng: 0.0,
              },
              package: reduxUser.package?._id,
              belongsTo: reduxUser.company.subAdmin
                ? reduxUser._id
                : reduxUser.belongsTo,
              created_by: reduxUser._id,
              password: "Demo123*",
              deviceToken: "",
              admin: false,
              active: true,
              temporary_password: true,
              themeId: "",
            } as UserInput);
          }
        });

        importedUsers.forEach((importedUser: IUser) => {
          if (
            importedUser?._id &&
            usersSegregation.external.includes(importedUser._id)
          ) {
            externalUsers.push({
              _id: importedUser._id, //   .replace(/-/g, "") to remove - and .substring(0, 24) to get first 24 Characters of string
              first_name: importedUser.first_name,
              last_name: importedUser.last_name,
              email: importedUser.email,
              access: FAQStatus.MOBILE,
              rec_email: "",
              stripeCustomerId: "",
              photo_url: "",
              operations: [
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
              modules: [],
              phone: {
                code: "+1",
                phoneNo: "+12345678910",
              },
              scopes: [],
              company: {
                subAdmin: false,
                park: reduxUser.company.park._id,
                location: tableFilters && tableFilters?.dynamicObjectId,
                employee: true,
                employeeType: "IMPORTED",
              },
              liveLocation: {
                lat: 0.0,
                lng: 0.0,
              },
              package: reduxUser.package?._id,
              belongsTo: reduxUser.company.subAdmin
                ? reduxUser._id
                : reduxUser.belongsTo,
              created_by: reduxUser._id,
              password: "Demo123*",
              deviceToken: "",
              admin: false,
              active: true,
              temporary_password: true,
              themeId: "",
            } as UserInput);
          }
        });

        // to get internal users
        usersSegregation.internal = (selectedUserIds as string[]).filter(
          (selectedUser) =>
            externalUsers.every(
              (_) =>
                String(_._id) !==
                String(selectedUser).replace(/-/g, "").substring(0, 24)
            )
        );

        mutationObj = {
          id: _id,
          assigner_id: reduxUser?._id,
          scheduleType,
          assignTo: usersSegregation.internal, // For users to assign multiple IDs
          priority,
          assignBy,
          dueDate,
          facilityId: tableFilters?.dynamicObjectId,
          externalUsers, // if there are pectora users
        };
      }

      // for Only DB users
      else {
        mutationObj = {
          id: _id,
          assigner_id: reduxUser?._id,
          assignTo: selectedUserIds, // For users to assign multiple IDs
          scheduleType,
          priority,
          assignBy,
          dueDate,
        };
      }

      mutate(mutationObj);
    }
    // To only assign one ID
    else if (
      assignBy === EAssignBy.Facility &&
      !showVATs &&
      selectedFacilityId
    ) {
      if (id === EAssignerComponentId.EmailNotification) {
        // for email&Notification Feature
        mutationObj = {
          id: _id,
          assigner_id: reduxUser?._id,
          assignTo: selectedFacilityId,
          assignBy,
          priority,
        };
      } else {
        mutationObj = {
          id: _id,
          assigner_id: reduxUser?._id,
          assignTo: selectedFacilityId,
          scheduleType,
          priority,
          assignBy,
          dueDate,
        };
      }

      mutate(mutationObj);
    }
    // For Assign by Role
    else if (assignBy === EAssignBy.Role && !showVATs && selectedRoleIds) {
      if (id === EAssignerComponentId.EmailNotification) {
        // for email&Notification Feature
        mutationObj = {
          id: _id,
          assigner_id: reduxUser?._id,
          assignTo: selectedFacilityId,
          assignBy,
          priority,
        };
      } else {
        mutationObj = {
          id: _id,
          assigner_id: reduxUser?._id,
          assignTo: selectedRoleIds,
          scheduleType,
          priority,
          assignBy,
          dueDate,
        };
      }

      mutate(mutationObj);
    } else {
      setFail({
        status: true,
        title: "Warning",
        description: "Please select Users/Facility to assign",
      });
    }
  };
  const currentDateTime = moment().format("YYYY-MM-DDTHH:mm");

  const handleFileChange = async (file: File) => {
    const tempFuc = (row: number, col: number): void => {
      throw new Error(
        `File is not properly structured, at Row ${row} & Column ${col}`
      );
    };

    try {
      let parsedData: any[] = [];
      if (file.name.endsWith(".csv")) {
        parsedData = await parseCsvFile(file);
      } else if (file.name.endsWith(".xlsx")) {
        parsedData = await parseExcelFile(file);
      }
      const usersFiltered = parsedData.slice(1).flatMap((_: any, i: number) => {
        return {
          _id: String(new Types.ObjectId()),
          first_name: _?.length && _[0]?.length > 1 ? _[0] : tempFuc(i + 1, 1),
          last_name: _?.length && _[1]?.length > 1 ? _[1] : tempFuc(i + 1, 2),
          email:
            _?.length && String(_[2]).includes("@") ? _[2] : tempFuc(i + 1, 3),

          status: !!(_?.length && _[3]?.toLowerCase() === "active"),
          external: "IMPORTED",
        };
      });
      setSelectedUserIds([]);
      setImportedUsers(usersFiltered);
    } catch (error: any) {
      setFail({
        status: true,
        title: "Warning",
        description: error?.message,
      });
      console.error("Error parsing file:", error);
    }
  };

  return (
    <>
      <Core.Alert show={fail} theme="error" />
      <Core.Alert show={success} theme="success" />
      <Flex
        flexDirection={"column"}
        alignItems={"center"}
        borderRadius={"15px"}
        backgroundColor={"gray.200"}
        padding={"15px"}
        marginTop={"15px"}
        marginBottom={"10px"}
      >
        <Flex
          width={"100%"}
          //  maxWidth={"250px"}
          justifyContent={"space-between"}
          mb="-10px"
        >
          <div></div>
          <div>
            <Box maxWidth={"400px"} position={"relative"}>
              {(id === EAssignerComponentId.Training ||
                id === EAssignerComponentId.InService) &&
                !isUsersLoading &&
                !isPectoraUsersLoading &&
                !pectoraFetching && (
                  <Card
                    // position={"absolute"}
                    // right={"0"}
                    padding={"6px"}
                    width={"260px"}
                    // borderColor={"#3f5e88"}
                    // borderWidth={"5px"}
                    // display={"flex"}
                    justifyContent={"start"}
                    alignItems={"center"}
                  >
                    <Core.H6 color="black.500">
                      Import users from CSV/Excel file.
                    </Core.H6>
                    <FileInput onFileChange={handleFileChange} />
                  </Card>
                )}
            </Box>
            <FormControl maxWidth={"250px"} mt={"15px"}>
              {/* <FormLabel>Assign By</FormLabel> */}
              <Card
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                // width={"100%"}

                minHeight="40px"
                backgroundColor={"white.200"}
                padding={"10px"}
              >
                <RadioGroup
                  value={String(assignBy)}
                  onChange={(value: EAssignBy) => {
                    setAssignBy(value);
                    if (value === EAssignBy.Facility) {
                      fetchFacility();
                    } else if (value === EAssignBy.Role) {
                      fetchRole();
                    } else {
                      fetchUsers();
                    }
                  }}
                >
                  <Stack spacing={5} direction="row">
                    {assignByList.map((item, index) => (
                      <Radio key={index} colorScheme="green" value={item.value}>
                        {item.name}
                      </Radio>
                    ))}
                  </Stack>
                </RadioGroup>
              </Card>
            </FormControl>
          </div>
          <div></div>
        </Flex>
        <Core.Table
          maxHeight="300px"
          tableData={
            showVATs
              ? overAllUsers || users || []
              : assignBy === EAssignBy.Role
              ? roles || []
              : assignBy === EAssignBy.Facility
              ? facilities
              : enableExternalUsers
              ? overAllUsers
              : users || []
          }
          columns={
            showVATs
              ? userColumns
              : assignBy === EAssignBy.Role
              ? roleColumns
              : assignBy === EAssignBy.Facility
              ? facilityColumns
              : userColumns
          }
          shadow
          title={
            showVATs
              ? "Select Users"
              : assignBy === EAssignBy.Role
              ? "Select Role"
              : assignBy === EAssignBy.Facility
              ? "Select Facility"
              : id === EAssignerComponentId.InService
              ? "Trainers"
              : "Select Users"
          }
          // To get Facilities Dropdown
          filterBy={filterByOptions}
          dynamicObjectsFilter={facilities}
          setTableFilters={setTableFilters}
          // mt="15px"
          // when multipleItemsSelection start
          selectRows={
            showVATs
              ? false
              : assignBy !== EAssignBy.Facility
              ? true
              : undefined
          }
          selectedIds={
            showVATs
              ? selectedUserIds
              : assignBy === EAssignBy.Role
              ? selectedRoleIds
              : assignBy !== EAssignBy.Facility
              ? selectedUserIds
              : undefined
          }
          setSelectedIds={
            showVATs
              ? setSelectedUserIds
              : assignBy === EAssignBy.Role
              ? setSelectedRoleIds
              : assignBy !== EAssignBy.Facility
              ? setSelectedUserIds
              : undefined
          }
          // when multipleItemsSelection end
          //------------------------------------------------------------------------
          // when single Item Selection start
          selectSingleRows={
            showVATs ? true : assignBy === EAssignBy.Facility ? true : undefined
          }
          selectedId={
            showVATs
              ? selectedUserIds
              : assignBy === EAssignBy.Facility
              ? selectedFacilityId
              : assignBy === EAssignBy.Role
              ? selectedRoleIds
              : undefined
          }
          setSelectedId={
            showVATs
              ? setSelectedUserIds
              : assignBy === EAssignBy.Facility
              ? setSelectedFacilityId
              : assignBy === EAssignBy.Role
              ? setSelectedRoleIds
              : undefined
          }
          // when single Item Selection end
          isLoading={
            isPectoraUsersLoading ||
            pectoraFetching ||
            isRolesFetching ||
            isFacilityLoading ||
            isUsersLoading
          }
        />
        {id === EAssignerComponentId.Training && (
          <Box>
            <FormControl mt={"15px"}>
              <Card
                p={"10px"}
                display={"felx"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <FormLabel htmlFor="email-alerts" mb="0">
                  Attach VAT Remediation with Training?
                </FormLabel>
                <Switch
                  id="email-alerts"
                  onChange={(e) => {
                    e.preventDefault;
                    setShowVATs(e.target.checked);
                  }}
                />
              </Card>
            </FormControl>
          </Box>
        )}
      </Flex>
      {showVATs && (
        <Core.Table
          maxHeight="300px"
          tableData={(VATs as TaskAssigned[]) || []}
          columns={VATcolumns}
          shadow
          title={"Remediation VAT"}
          selectSingleRows={true}
          selectedId={selectedVATId}
          setSelectedId={setSelectedVATId}
          isLoading={isLoadingVATs}
        />
      )}

      <Flex
        marginTop={"15px"}
        justifyContent={"flex-start"}
        flexWrap={"wrap"}
        columnGap={"10px"}
      >
        {showScheduling &&
          id !== EAssignerComponentId.EmailNotification &&
          id !== EAssignerComponentId.Training && (
            <Box>
              <FormControl>
                <FormLabel>Schedule Type</FormLabel>
                <Card
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  width={"100%"}
                  minHeight="60px"
                  backgroundColor={"white.200"}
                  padding={"10px"}
                  margin={"0 0 10px 0"}
                >
                  <RadioGroup
                    value={String(scheduleType)}
                    onChange={(value: EScheduleType) => setScheduleType(value)}
                  >
                    <Stack spacing={5} direction="row">
                      {scheduleList.map((item, index) => (
                        <Radio
                          key={index}
                          colorScheme="green"
                          value={item.value}
                        >
                          {item.name}
                        </Radio>
                      ))}
                    </Stack>
                  </RadioGroup>
                </Card>
              </FormControl>
            </Box>
          )}

        <Box>
          <FormControl>
            <FormLabel>Priority Type</FormLabel>
            <Card
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              width={"100%"}
              minHeight="60px"
              backgroundColor={"white.200"}
              padding={"10px"}
              margin={"0 0 10px 0"}
            >
              <RadioGroup
                value={String(priority)}
                onChange={(value: EPriority) => setPriority(value)}
              >
                <Stack spacing={5} direction="row">
                  {priorityList.map((item, index) => (
                    <Radio key={index} colorScheme="green" value={item.value}>
                      {item.name}
                    </Radio>
                  ))}
                </Stack>
              </RadioGroup>
            </Card>
          </FormControl>
        </Box>
        {showDueDate && scheduleType !== EScheduleType.Always && (
          <Box>
            <FormControl>
              <FormLabel>Due Date</FormLabel>
              <Card
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                width={"100%"}
                color={"textColor"}
                minHeight="60px"
                backgroundColor={"white.200"}
                padding={"10px"}
                margin={"0 0 10px 0"}
              >
                <Core.Input
                  name="deadline"
                  type="datetime-local"
                  maxWidth="250px"
                  // color={"white"}
                  size={"sm"}
                  onChange={(e: any) => {
                    setDueDate(e.target.value);
                    // setDueDate(moment(e).toDate());
                  }}
                  min={currentDateTime} // Set the minimum date to the current date and time
                />
              </Card>
            </FormControl>
          </Box>
        )}
      </Flex>

      <Flex columnGap={"10px"} justifyContent="end">
        <Core.Button
          btnOrangeMd
          isLoading={
            isLoading ||
            isLoadingVAT ||
            isPectoraUsersLoading ||
            pectoraFetching
          }
          isDisabled={
            isLoading ||
            isLoadingVAT ||
            isPectoraUsersLoading ||
            pectoraFetching ||
            status === "success" ||
            !!(
              (assignBy === EAssignBy.User && selectedUserIds.length === 0) ||
              (assignBy === EAssignBy.Facility &&
                selectedFacilityId === undefined)
            )
          }
          onClick={onSubmit}
        >
          {id === EAssignerComponentId.EmailNotification ? "Send" : "Assign"}
        </Core.Button>
      </Flex>
    </>
  );
};
export default Assigner;
