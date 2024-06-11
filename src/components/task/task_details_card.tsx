import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Image,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import moment from "moment";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";

import { HandleLogout } from "@/components/auth";
import type {
  ActivityLogInput,
  CreateActivityLogMutation,
} from "@/graphql/generated/graphql";
import {
  EScheduleType,
  ESubmissionStatus,
  Interface,
} from "@/graphql/generated/graphql";
import {
  ApproveSubmission,
  CreateActivityLog,
  DeleteTask,
  FindAssignedTaskById,
  FindTaskById,
} from "@/services/api";
import {
  formatDateAndTime,
  isImageOrVideoURL,
} from "@/utils/helpers/functions";

import { Core } from "..";
import { Icons } from "../icons";

interface ITaskDetailsCardProps {
  id: string;
  from: string;
}

interface IPerson {
  _id?: string;
  first_name: string;
  last_name: string;
  photo_url: string;
}

const TaskDetailsCard: React.FC<ITaskDetailsCardProps> = ({ id, from }) => {
  const [task, setTask] = useState<ITaskAssigned | any>();
  const [assignedTo, setAssignedTo] = useState<IPerson[]>();
  const [fail, setFail] = useState<IAlertSuccessData>();
  const [success, setSuccess] = useState<IAlertSuccessData>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [session, setSession] = useState<any>();
  const [allSubmissions, setAllSubmissions] = useState<any>();
  const { push } = useRouter();
  const user: IUser = useSelector((state: any) => state.user.user);

  useQuery(["taskById"], () => FindTaskById({ findTaskByIdId: id }), {
    onSuccess: ({ findTaskById }) => {
      if (findTaskById) {
        setTask(findTaskById);
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
    enabled: Boolean(id) && from !== "track",
    refetchOnMount: true,
  });

  const { refetch } = useQuery(
    ["findAssignedTaskById"],
    () => FindAssignedTaskById({ assignedTaskId: id }),
    {
      onSuccess: ({ findAssignedTaskById }) => {
        if (findAssignedTaskById) {
          setTask(findAssignedTaskById);

          setAssignedTo([
            {
              _id: findAssignedTaskById.userId?._id || "",
              first_name: findAssignedTaskById.userId?.first_name || "",
              last_name: findAssignedTaskById.userId?.last_name || "",
              photo_url: findAssignedTaskById.userId?.photo_url || "",
            },
          ]);
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
      enabled: Boolean(id) && from === "track",
      refetchOnMount: true,
    }
  );

  const { mutate: deleteMutation } = useMutation("deleteTask", DeleteTask, {
    onSuccess: () => {
      setSuccess({
        status: true,
        title: "Deleted",
        description: "Task deleted successfully.",
      });
      setTimeout(() => {
        push("/tasks");
      }, 2000);
    },
    onError: () => {
      setFail({
        status: true,
        title: "Failed",
        description: "Failed to delete task",
      });
    },
  });

  const { mutate: approveMutation } = useMutation(
    "approveTask",
    ApproveSubmission,
    {
      onSuccess: () => {
        setSuccess({
          status: true,
          title: "Success",
          description: "Task Completion Approved.",
        });
        refetch();
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

  useEffect(() => {
    if (task?.submissions) {
      const modifiedSubmissions = task.submissions.map(
        (submission: any, index: number) => ({
          ...submission,
          active: index === 0, // Set to true for the first submission, false for others
        })
      );

      setAllSubmissions(modifiedSubmissions);
      setSession(task?.submissions[0]);
    }
  }, [task?.submissions]);

  const handleItemClick = (clickedItem: any) => {
    const updatedSubmissions = allSubmissions.map((submission: any) => ({
      ...submission,
      active: submission === clickedItem,
    }));

    setAllSubmissions(updatedSubmissions);
    setSession(clickedItem);
  };

  const onDeleteClick = () => {
    onOpen();
  };

  const { mutate: activityLogMutation } = useMutation<
    CreateActivityLogMutation,
    unknown,
    ActivityLogInput
  >((variables) => CreateActivityLog({ activityLogInput: variables }));

  const confirmAction = (_: string) => {
    deleteMutation({
      taskId: _,
    });
    activityLogMutation({
      user_name: `${user?.first_name} ${user?.last_name}`,
      belongsTo: String(user.company.subAdmin ? user._id : user.belongsTo),
      role: String(
        user?.admin
          ? "SUPER-ADMIN"
          : !user?.company?._id
          ? `SUPER's Users`
          : user?.company?.subAdmin
          ? "CLIENT-ADMIN"
          : user?.company?.employeeType
      ),
      user_id: user?._id || "",
      interface: Interface.Web,
      dateTime: moment().toDate(),
      activity: "Task Deleted",
    });
    onClose();
  };

  let subTasks;
  if (from === "list") {
    subTasks = task?.subtasks;
  } else if (from === "track") {
    subTasks = session?.subtasks;
  }
  const reviewData = [
    {
      avatarSrc: assignedTo?.length ? assignedTo[0]?.photo_url || "" : "",
      review: session?.remarks,
      userName: assignedTo?.length
        ? `${assignedTo[0]?.first_name} ${assignedTo[0]?.last_name}`
        : "",
      dateTime: "",
    },
    // {
    //   avatarSrc: "",
    //   review: `What a wonderful little cottage! More spacious and adorable than the pictures show. We never met our hosts, but we felt welcomed and...`,
    //   userName: "John Doe",
    //   dateTime: "1 months ago",
    // },
    // {
    //   avatarSrc: "",
    //   review: `What a wonderful little cottage! More spacious and adorable than the pictures show. We never met our hosts, but we felt welcomed and...`,
    //   userName: "Jones",
    //   dateTime: "4 months ago",
    // },
  ];

  return (
    <>
      <Core.Modal
        isOpen={isOpen}
        onClose={onClose}
        onClick={confirmAction}
        id={id}
      />
      <Card
        w={"100%"}
        maxW={"1100px"}
        size="sm"
        p={2}
        borderRadius={"15px"}
        backgroundColor={"white.100"}
        className="task-details-card"
      >
        <Core.Alert show={fail} theme="error" />
        <Core.Alert show={success} theme="success" />
        {!task?.title ? (
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
            <CardHeader
              display={"flex"}
              justifyContent="space-between"
              alignItems={"start"}
            >
              <Core.H3 size="md" color={"textColor"}>
                {task?.title}
              </Core.H3>
              {session && <Core.Badge status={String(session?.status)} />}
            </CardHeader>
            <CardBody>
              <Core.H5 size="sm" color="textColor" pb="2">
                Description:
              </Core.H5>
              <Text
                fontSize={"sm"}
                background={"orange.50"}
                borderRadius={"5px"}
                padding={"2px 6px"}
              >
                {task?.detail}
              </Text>
              <ul style={{ paddingTop: "1%" }}>
                {subTasks?.map((_: ISubTask, i: number) => (
                  <li key={i}>
                    {_.detail}&nbsp;
                    {_.completed ? (
                      <Icons.BiCheck
                        color="green"
                        style={{ display: "inline" }}
                      />
                    ) : (
                      <Icons.RxCross2
                        color="red"
                        style={{ display: "inline" }}
                      />
                    )}
                  </li>
                ))}
              </ul>
              <Flex mt="12" columnGap={"7%"} flexWrap={"wrap"}>
                {/* --------- Due Date start --------- */}
                <Box>
                  {from === "track" ? (
                    task?.scheduleType !== EScheduleType.Always && (
                      <>
                        <Core.H5 size="sm" color="textColor" mb="2">
                          Due Date:
                        </Core.H5>
                        <Text
                          display={"flex"}
                          alignItems={"center"}
                          columnGap={"5px"}
                          fontSize="xs"
                          color="red.500"
                          fontWeight={"bold"}
                          fontFamily={"Verdana"}
                          opacity={"0.7"}
                        >
                          <Icons.BsCalendar2Date />
                          {moment(task?.deadline)
                            .subtract(5, "hours")
                            .format("MMMM Do YYYY")}
                          &nbsp;
                          <Icons.BiTimeFive />
                          {moment(task?.deadline)
                            .subtract(5, "hours")
                            .format("h:mm a")}
                        </Text>
                      </>
                    )
                  ) : from === "list" ? (
                    <>
                      <Core.H5 size="sm" mb="2">
                        Created on:
                      </Core.H5>
                      <Text
                        display={"flex"}
                        alignItems={"center"}
                        columnGap={"5px"}
                        fontSize="xs"
                        color="green.500"
                        fontWeight={"bold"}
                        fontFamily={"Verdana"}
                        opacity={"0.7"}
                      >
                        <Icons.BsCalendar2Date />
                        {moment(task?.createdAt).format("MMMM Do YYYY")}&nbsp;
                        <Icons.BiTimeFive />
                        {moment(task?.createdAt).format("h:mm a")}
                      </Text>
                    </>
                  ) : (
                    ""
                  )}
                </Box>
                {/* --------- Due Date end --------- */}

                {/* --------- Assigned to start --------- */}
                {from === "track" && (
                  <>
                    {task?.userId && (
                      <Box>
                        <Core.H5 as="h6" size="sm" color="textColor" mb="2">
                          Picked by:
                        </Core.H5>
                        <Text
                          color="gray.400"
                          fontSize={"sm"}
                          fontWeight={"bold"}
                        >
                          {`${task?.userId.first_name} ${task?.userId.last_name}`}
                        </Text>
                      </Box>
                    )}
                    {task?.assignedToFacilityRef && (
                      <Box>
                        <Core.H5 as="h6" size="sm" color="textColor" mb="2">
                          Assigned to Facility:
                        </Core.H5>
                        <Text
                          color="gray.400"
                          fontSize={"sm"}
                          fontWeight={"bold"}
                        >
                          {task?.assignedToFacilityRef.facility}
                        </Text>
                      </Box>
                    )}
                  </>
                )}
                {/* --------- Assigned to end --------- */}

                {/* <Box>
                  <Core.H5 size="sm" mb="3">
                    Attached Files :
                  </Core.H5>
                  <Text opacity={0.5}> -- no file render yet -- </Text>
                 // <Core.AttachmentGroup attachments={attachments} />
                </Box> */}
                {/* <Box>
                  
                  <Core.H5 as="h6" size="sm" mb="2">
                                 
                    Assigned to
                                 
                  </Core.H5>
                                 
                  <Core.PersonsGroup persons={assignedTo} />
                                 
                </Box> */}
              </Flex>
              {/* --------- Attached Files start --------- */}
              {task?.media.length > 0 && (
                <Core.H5
                  display="block"
                  size="sm"
                  color={"textColor"}
                  mt={"20px"}
                  mb="2"
                >
                  Attached Files:
                </Core.H5>
              )}
              <Flex gap={"8px"} flexWrap={"wrap"}>
                {task?.media?.map((attachment: string, index: number) => {
                  return (
                    <Box key={index}>
                      <Box
                        key={index}
                        borderRadius={"10px"}
                        overflow={"hidden"}
                        marginRight={"5px"}
                        maxWidth={"150px"}
                        height={"150px"}
                      >
                        {isImageOrVideoURL(attachment) === "image" ? (
                          <Image
                            src={attachment}
                            width="100%"
                            height="100%"
                            objectFit={"cover"}
                            alt="Attached Images"
                          />
                        ) : (
                          <video
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                            controls
                          >
                            <source src={attachment} type={"video/mp4"} />
                            Your browser does not support the video tag.
                          </video>
                        )}
                      </Box>
                    </Box>
                  );
                })}
              </Flex>
              {/* --------- Attached Files end --------- */}
            </CardBody>

            <CardFooter
              justifyContent={"flex-end"}
              sx={{
                "& > button": {
                  minW: "136px",
                },
              }}
            >
              {/* {!users?.length && ( */}
              <Flex columnGap={"5px"}>
                {!assignedTo?.length && (
                  <>
                    <Button
                      variant="ghost"
                      colorScheme="orange"
                      leftIcon={<Icons.TbFilePencil />}
                      size="sm"
                      onClick={() => {
                        push(
                          {
                            pathname: `/tasks/edit`,

                            query: { id },
                          },
                          undefined,
                          {
                            shallow: true,
                          }
                        );
                      }}
                    >
                      Update
                    </Button>
                    <Button
                      variant="ghost"
                      colorScheme="red"
                      leftIcon={<Icons.AiOutlineDelete />}
                      size="sm"
                      onClick={() => {
                        onDeleteClick();
                      }}
                    >
                      Delete
                    </Button>
                  </>
                )}
                {from === "track" &&
                  session?.status === ESubmissionStatus.Reviewing && (
                    <Button
                      variant="ghost"
                      colorScheme="green"
                      leftIcon={<Icons.BiCheck />}
                      size="sm"
                      onClick={() => {
                        approveMutation({
                          submissionId: session._id,
                          taskId: id,
                          approverId: user._id || "",
                        });
                      }}
                    >
                      Approve Submission!
                    </Button>
                  )}
              </Flex>
              {/* // )} */}
            </CardFooter>
          </>
        )}
      </Card>
      {/* --------- Comments start ---------  */}
      {from === "track" && (
        <Box
          mt="12"
          borderRadius={"20px"}
          padding={"20px"}
          backgroundColor={"white.200"}
        >
          <Core.H5 size="sm" mb="3">
            Comments
          </Core.H5>
          <Core.Comments comments={reviewData} />
        </Box>
      )}
      {/* --------- Comments end --------- */}
      {/* --------- Submissions start --------- */}
      {allSubmissions && (
        <>
          <Core.H5 size="sm" display="block" mt="10px" mb="10px">
            Submissions Activity:
          </Core.H5>
          <Card
            width={"100%"}
            maxW={"1100px"}
            size="md"
            borderRadius={"15px"}
            backgroundColor={"white.100"}
          >
            <CardBody>
              {allSubmissions?.map((value: any) => {
                return (
                  <Text
                    key={String(value.date)}
                    onClick={() => handleItemClick(value)}
                    fontSize="md"
                    color={value.active === true ? "white.500" : "gray.500"}
                    fontWeight={"bold"}
                    display={"inline-block"}
                    alignItems={"center"}
                    borderRadius={"5px"}
                    cursor={"pointer"}
                    padding="10px"
                    mr="10px"
                    backgroundColor={
                      value.active === true ? "gray.500" : "gray.200"
                    }
                    _hover={{
                      color: "white.500",
                      backgroundColor: "gray.500",
                    }}
                    mb="10px"
                    transition={"all .3s ease"}
                  >
                    {task?.scheduleType === EScheduleType.Always
                      ? `submission`
                      : formatDateAndTime(value.date)}
                  </Text>
                );
              })}
            </CardBody>
          </Card>
        </>
      )}
      {/* --------- Submissions end --------- */}
    </>
  );
};

export default TaskDetailsCard;
