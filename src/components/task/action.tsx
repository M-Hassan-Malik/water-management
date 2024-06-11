import {
  Box,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  List,
  ListItem,
} from "@chakra-ui/react";
import axios from "axios";
import { useFormik } from "formik";
import moment from "moment";
import type { StaticImageData } from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";

import { HandleLogout } from "@/components/auth";
import {
  type ActivityLogInput,
  type CreateActivityLogMutation,
  type CreateTaskMutation,
  EmployeeType,
  Interface,
  type TaskInput,
  type TaskUpdateInput,
  type UpdateTaskMutation,
} from "@/graphql/generated/graphql";
import {
  CreateActivityLog,
  CreateTask,
  FindTaskById,
  GetFacilities,
  UpdateTask,
} from "@/services/api";
import { getUniqueNumberDynamic } from "@/utils/helpers/functions";

import { Core } from "..";
import { Icons } from "../icons";
import { addTaskSchema } from "./task.validator";

interface IAddTaskProps {
  pageType: PageType;
  id?: string;
}

interface ITaskFields {
  _id?: string;
  title: string;
  facility: string;
  detail: string;
  subtasks?: ISubTask[];
}

interface IFacilitiesData {
  value: string;
  name: string;
}

const TaskActions: React.FunctionComponent<IAddTaskProps> = ({ pageType }) => {
  const doNotRemoveTheseFiles = useRef<string[] | []>([]);
  const user: IUser = useSelector((state: any) => state.user.user);
  const { push, query } = useRouter();
  const [subTask, setSubTask] = useState<string>("");
  const [error, setError] = useState<IAlertSuccessData>();
  const [isFileUploading, setIsFileUploading] = useState<boolean>(false);
  const [success, setSuccess] = useState<IAlertSuccessData>();
  const [facilities, setFacilities] = useState<IFacilitiesData[]>([]);
  const [attachmentList, setAttachmentList] = useState<StaticImageData[]>([]);
  const [uploadFiles, setUploadFiles] = useState<File[]>([]);
  const [removeFiles, setRemoveFiles] = useState<string[]>([]);
  const [prevData, setPrevData] = useState<ITaskFields>({
    _id: "",
    detail: "",
    facility: "",
    title: "",
    subtasks: [],
  });
  const evaluateClientAndEmployee = (): boolean => {
    return (
      Boolean(user.company._id) &&
      user.company.employeeType !== (EmployeeType.Pectora as any) &&
      user.company.employeeType !== (EmployeeType.Imported as any)
    );
  };

  const uploadHandler = async (): Promise<any> => {
    setIsFileUploading(true);
    try {
      const formData = new FormData();
      // formData.append("file", fileData as any);
      uploadFiles?.forEach((file) => {
        const fileName = `${user._id}/task/${getUniqueNumberDynamic()}`;
        formData.append(fileName, file);
      });

      const result = await axios.post(
        `${process.env.FRONT_END_URL}/api/s3/uploadFile`,
        formData
      );
      setIsFileUploading(false);
      return result;
    } catch (err) {
      console.log("upload", { err });
    }
    return null;
  };

  const removeStorageFiles = async (filesToRemove: string[]): Promise<void> => {
    setIsFileUploading(true);
    try {
      await axios.post(`${process.env.FRONT_END_URL}/api/delete-s3-files`, {
        removeFile: filesToRemove,
      });

      const temp = doNotRemoveTheseFiles.current.filter(
        (doNotRemoveTheseFile: string) =>
          !filesToRemove.includes(doNotRemoveTheseFile)
      );

      doNotRemoveTheseFiles.current = temp;

      setIsFileUploading(false);

      return;
    } catch (err: any) {
      console.log("error space");
      if (err?.response?.data?.failedUrls) {
        doNotRemoveTheseFiles.current = [
          ...doNotRemoveTheseFiles.current,
          ...err.response.data.failedUrls,
        ];
        // setDoNotRemoveTheseFiles(prev1 => {
        //   return [...prev1, ...err.response.data.failedUrls]
        // })
      }
      setIsFileUploading(false);
    }
  };

  useQuery(
    ["taskById"],
    () => FindTaskById({ findTaskByIdId: String(query?.id) }),
    {
      onSuccess: ({ findTaskById }) => {
        if (findTaskById) {
          if (findTaskById?.media?.length) {
            setAttachmentList(findTaskById.media as any);

            doNotRemoveTheseFiles.current = findTaskById.media as string[];
          }

          setPrevData({
            title: findTaskById.title ? findTaskById.title : "",
            detail: findTaskById?.detail ? findTaskById.detail : "",
            facility: findTaskById?.facility ? findTaskById.facility : "",
            subtasks: findTaskById?.subtasks
              ? findTaskById.subtasks?.map((subtask: ISubTask | any) => {
                  return {
                    completed: subtask.completed,
                    detail: subtask.detail,
                  };
                })
              : [],
          });
        }
      },
      enabled: pageType === "edit" && Boolean(query?.id),
      refetchOnMount: true,
    }
  );
  const { mutate: activityLogMutation } = useMutation<
    CreateActivityLogMutation,
    unknown,
    ActivityLogInput
  >((variables) => CreateActivityLog({ activityLogInput: variables }), {
    onError(_: any) {
      if (
        _?.response?.errors?.length &&
        _?.response?.errors[0]?.message === "Not Authorised!"
      )
        HandleLogout();
      setError(_?.response?.errors[0]?.message);
    },
  });

  const { mutate: createTaskMutation, isLoading: addTaskLoading } = useMutation<
    CreateTaskMutation,
    unknown,
    TaskInput
  >(
    (variables) =>
      CreateTask({
        taskInput: variables,
      }),
    {
      onSuccess: ({ createTask }) => {
        setSuccess({
          status: true,
          title: "Added",
          description: "Task added successfully.",
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
          activity: "Task Added",
        });

        setTimeout(() => {
          push(`/tasks/details?id=${createTask?.data?._id}&from=list`);
        }, 1000);
      },
      onError: (_: any) => {
        const errorMsg =
          _?.response?.errors[0]?.message || "Unable to update user.";
        setError({
          status: true,
          title: "Failed",
          description: errorMsg,
        });
      },
    }
  );

  useQuery(
    "getFacilitiesForAddTask",
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
      enabled: evaluateClientAndEmployee(),
      refetchOnMount: true,
    }
  );

  const { mutate: updateTaskMutation, isLoading: updateTaskLoading } =
    useMutation<UpdateTaskMutation, unknown, TaskUpdateInput>(
      (variables) =>
        UpdateTask({
          taskInput: variables,
        }),
      {
        onSuccess: () => {
          setSuccess({
            status: true,
            title: "Updated",
            description: "Task updated successfully.",
          });
          activityLogMutation({
            user_name: `${user?.first_name} ${user?.last_name}`,
            belongsTo: String(
              user.company.subAdmin ? user._id : user.belongsTo
            ),
            role: String(
              user.company.subAdmin
                ? "CLIENT-ADMIN"
                : user.company?.employeeType
            ),
            user_id: user?._id || "",
            interface: Interface.Web,
            dateTime: moment().toDate(),
            activity: "Task Edited",
          });
          setTimeout(() => {
            push("/tasks");
          }, 3000);
        },
        onError: (_: any) => {
          setError({
            status: true,
            title: "Failed",
            description: _?.response?.errors[0]?.message,
          });
        },
      }
    );

  useEffect(() => {}, [doNotRemoveTheseFiles.current]);

  const {
    handleSubmit,
    handleChange,
    setFieldValue,
    values,
    errors,
    touched,
    isSubmitting,
  } = useFormik<TaskInput>({
    initialValues: {
      detail: prevData.detail ? prevData.detail : "",
      title: prevData.title ? prevData.title : "",
      facility: prevData?.facility ? prevData.facility : "",
      subtasks: prevData.subtasks ? prevData.subtasks : [],
      createdBy: user._id ? user._id : "",
      clientAdminRef: user.belongsTo ? user.belongsTo : null,
    },
    enableReinitialize: true,
    onSubmit: async (inputValues) => {
      let files: any = [];
      if (uploadFiles.length) {
        const uploadHandlerResult = await uploadHandler().catch((_: any) => {
          setError({
            status: true,
            title: "Upload failed",
            description: _.message,
          });
        });
        files = uploadHandlerResult?.data?.results?.map((_: any) =>
          String(_.Location)
        );
      }
      if (removeFiles.length) {
        await removeStorageFiles(removeFiles);
      }

      if (pageType === "edit") {
        let newFiles: any[] = [];

        if (files?.length) {
          newFiles = [...files];
        }

        if (doNotRemoveTheseFiles.current?.length) {
          newFiles = [...newFiles, ...doNotRemoveTheseFiles.current];
        }

        updateTaskMutation({
          _id: query?.id as string,
          title: inputValues.title,
          facility: inputValues.facility,
          detail: inputValues.detail,
          subtasks: inputValues.subtasks,
          media: newFiles,
        });
      } else {
        createTaskMutation({
          title: inputValues.title,
          detail: inputValues.detail,
          facility: inputValues.facility,
          subtasks: inputValues.subtasks,
          media: files,
          createdBy: inputValues.createdBy,
          clientAdminRef: inputValues.clientAdminRef,
        });
      }
    },
    validationSchema: addTaskSchema,
  });

  const handleCheckboxChange = (index: number) => {
    if (values.subtasks) {
      const subTaskArray = [...values.subtasks];
      const subtask = subTaskArray[index];
      if (subtask) {
        subTaskArray[index] = {
          detail: subtask.detail,
          completed: !subtask.completed,
        };
      }
      setFieldValue("subtasks", subTaskArray);
    }
  };

  const addSubtask = () => {
    const subTasksExist = values.subtasks && Array.isArray(values.subtasks);
    const subTaskValue: ISubTask = { completed: false, detail: subTask };
    if (subTaskValue.detail !== "") {
      const updatedSubTasks: ISubTask[] =
        subTasksExist && values.subtasks
          ? [...values.subtasks, subTaskValue]
          : [subTaskValue];

      setFieldValue("subtasks", updatedSubTasks);
      setSubTask("");
    }
  };

  const deleteItem = (index: number) => {
    if (values.subtasks) {
      const updatedOptions = [
        ...values.subtasks.slice(0, index),
        ...values.subtasks.slice(index + 1),
      ];

      setFieldValue("subtasks", updatedOptions);
    }
  };
  console.log(user.company);

  return (
    <Box style={{ padding: "10px" }}>
      <Core.Alert show={success} theme="success" />
      <Core.Alert show={error} theme="error" />
      {evaluateClientAndEmployee() && (
        <Flex columnGap={"10px"} pb="20px">
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
            />
          </FormControl>
        </Flex>
      )}
      <Flex columnGap={"10px"} pb="20px">
        <FormControl isRequired isInvalid={!!errors.title && touched.title}>
          <FormLabel>Title:</FormLabel>
          <Core.Input
            isDisabled={pageType === "view"}
            value={values.title}
            name="title"
            placeholder="Enter Title"
            type="text"
            onChange={handleChange}
            error={errors.title}
            touched={touched.title}
          />
        </FormControl>
      </Flex>
      <Flex columnGap={"10px"} pb="20px">
        <FormControl>
          <FormLabel>Sub Tasks:</FormLabel>
          <Box
            flexDirection={"column"}
            alignItems={"center"}
            borderRadius={"15px"}
            backgroundColor={"white.200"}
            padding={"10px 5px"}
          >
            <List spacing={2}>
              {values.subtasks
                ? values.subtasks.map((option, index) => (
                    <ListItem
                      key={index}
                      px={"10px"}
                      py={"5px"}
                      borderRadius={"10px"}
                      // backgroundColor={"#fafafa"}
                    >
                      <Flex justifyContent={"space-between"}>
                        <Box>
                          <Checkbox
                            size="lg"
                            mr={"10px"}
                            onChange={() => handleCheckboxChange(index)}
                            isChecked={option.completed}
                            colorScheme="orange"
                          />
                          {option.detail}
                        </Box>
                        <Icons.RxCross2
                          color="red"
                          fontSize={"20px"}
                          className="cursor-pointer rounded-[20px] hover:bg-[#f5c3c3]"
                          onClick={() => deleteItem(index)}
                        />
                      </Flex>
                    </ListItem>
                  ))
                : null}
            </List>
          </Box>
          <Flex justifyContent={"end"} columnGap={"10px"} mt={"10px"}>
            <Core.Input
              placeholder="Add Subtask"
              type="text"
              onChange={(e) => setSubTask(e.currentTarget.value)}
              value={subTask}
            />
            <Core.IconicButton
              button="add"
              className="w-[70px]"
              size={"md"}
              onClick={addSubtask}
            ></Core.IconicButton>
          </Flex>
        </FormControl>
      </Flex>
      <Flex columnGap={"10px"} pb="20px">
        <FormControl isRequired isInvalid={!!errors.detail && touched.detail}>
          <FormLabel>Task Detail:</FormLabel>
          <Core.Textarea
            placeholder="Type Task Details"
            name="detail"
            rows={3}
            onChange={handleChange}
            value={values.detail}
            errorBorderColor="red.300"
            error={errors.detail}
            touched={touched.detail}
            isDisabled={pageType === "view"}
          />
        </FormControl>
      </Flex>
      <FormControl isInvalid={!!errors.detail && touched.detail}>
        <FormLabel>Attached Files:</FormLabel>
        <Core.AttachmentGroup
          attachments={attachmentList}
          setAttachmentList={setAttachmentList}
          setUploadFiles={setUploadFiles}
          uploadFiles={uploadFiles}
          setRemoveFiles={setRemoveFiles}
          setIsLoading={setIsFileUploading}
        />
      </FormControl>
      <Flex columnGap={"10px"} justifyContent="end">
        <Core.Button
          btnOrangeMd
          button={pageType === "edit" ? "Update Task" : "Add Task"}
          onClick={handleSubmit}
          isDisabled={
            isFileUploading ||
            (isSubmitting && pageType === "edit"
              ? updateTaskLoading
              : addTaskLoading)
          }
          isLoading={
            isFileUploading ||
            (isSubmitting && pageType === "edit"
              ? updateTaskLoading
              : addTaskLoading)
          }
        />
      </Flex>
    </Box>
  );
};

export default TaskActions;
