import { Box, Flex, FormControl, FormLabel } from "@chakra-ui/react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { memo, useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";

import { Core } from "@/components";
import { HandleLogout } from "@/components/auth";
import {
  Alert,
  Assigner,
  Button,
  Input,
  Select,
  Textarea,
} from "@/components/core";
import {
  type AddEmailAndNotificationInput,
  type AddEmailAndNotificationMutation,
  type AssignEmailAndNotificationInput,
  type AssignEmailAndNotificationMutation,
  EAssignerComponentId,
  type EditEmailAndNotificationInput,
  type EditEmailAndNotificationMutation,
  type EEmailAndNotificationType,
} from "@/graphql/generated/graphql";
import {
  AddEmailAndNotification,
  AssignEmailAndNotification,
  EditEmailAndNotification,
  GetEmailAndNotificationById,
} from "@/services/api";

import {
  addValidationSchema,
  updateValidationSchema,
} from "./email_or_notifications.validator";

const typeList = [
  {
    name: "EMAIL",
    value: "EMAIL",
  },
  {
    name: "NOTIFICATION",
    value: "NOTIFICATION",
  },
];

interface IActionEmailOrNotificationFormProps {}

const ActionEmailOrNotificationForm: React.FC<
  IActionEmailOrNotificationFormProps
> = () => {
  const { replace, query } = useRouter();
  const [fail, setFail] = useState<IAlertSuccessData>();
  const [success, setSuccess] = useState<IAlertSuccessData>();
  const user: IUser = useSelector((state: any) => state.user.user);
  const [prevData, setPrevData] = useState<IAddEmailAndNotificationInput>({
    title: "",
    text: "",
    type: "EMAIL" as EEmailAndNotification,
    createdByRef: "",
  });

  const {
    mutate: mutateAssign,
    isLoading: isLoadingAssign,
    status,
  } = useMutation<
    AssignEmailAndNotificationMutation,
    unknown,
    AssignEmailAndNotificationInput
  >(
    (variables) =>
      AssignEmailAndNotification({
        assignEmailAndNotificationInput: variables,
      }),
    {
      onSuccess: () => {
        setSuccess({
          status: true,
          title: "Success",
          description: "Assigning completed",
        });
        replace("/email-&-notifications");
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

  const { mutate, isLoading } = useMutation<
    AddEmailAndNotificationMutation,
    unknown,
    AddEmailAndNotificationInput
  >(
    (variables) =>
      AddEmailAndNotification({ emailAndNotificationInput: variables }),
    {
      onSuccess: ({ addEmailAndNotification }) => {
        setSuccess({
          status: true,
          title: "Success",
          description: addEmailAndNotification.message || "",
        });
        replace(
          `/email-&-notifications/view/?id=${addEmailAndNotification.data}`
        );
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

  const { mutate: editMutation, isLoading: editIsLoading } = useMutation<
    EditEmailAndNotificationMutation,
    unknown,
    EditEmailAndNotificationInput
  >(
    (variables) =>
      EditEmailAndNotification({ emailAndNotificationInput: variables }),
    {
      onSuccess: () => {
        setSuccess({
          status: true,
          title: "Success",
          description: `Successfully Updated.`,
        });
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

  useQuery(
    ["GetEmailAndNotificationById"],
    () =>
      GetEmailAndNotificationById({ objectId: (query?.id as string) || "" }),
    {
      onSuccess: ({ getEmailAndNotificationById }) => {
        if (getEmailAndNotificationById) {
          setPrevData({
            title: getEmailAndNotificationById?.title || "",
            text: getEmailAndNotificationById?.text || "",
            type:
              (getEmailAndNotificationById?.type as string as EEmailAndNotification) ||
              "",
            createdByRef: String(getEmailAndNotificationById?.createdByRef),
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
          description: "Failed to load data",
        });
      },
      enabled: Boolean(query?.id) && query?.slug !== "add",
      refetchOnMount: true,
    }
  );

  const [isDataArrived, setIsDataArrived] = useState(true);

  useEffect(() => {
    if (prevData.title === "" || prevData.text === "") {
      setIsDataArrived(true);
    } else {
      setIsDataArrived(false);
    }
  }, [prevData]);

  const { handleSubmit, handleChange, values, errors, touched } =
    useFormik<IAddEmailAndNotificationInput>({
      initialValues: {
        title: prevData.title ? prevData.title : "",
        text: prevData.text ? prevData.text : "",
        type: prevData.type
          ? (prevData.type as EEmailAndNotification)
          : ("EMAIL" as EEmailAndNotification),
        createdByRef: prevData.createdByRef ? prevData.createdByRef : "",
      },
      enableReinitialize: true,
      onSubmit: (inputValues) => {
        if (query.slug === "edit") {
          editMutation({
            _id: query?.id as string,
            title: inputValues.title,
            text: inputValues.text,
          });
        } else
          mutate({
            title: inputValues.title,
            text: inputValues.text,
            type: String(inputValues.type) as EEmailAndNotificationType,
            createdByRef: user?._id as string,
          });
      },
      validationSchema:
        query?.slug === "edit" ? updateValidationSchema : addValidationSchema,
    });

  return (
    <>
      <Alert show={success} theme="success" />
      <Alert show={fail} theme="error" />
      {/* {query?.slug !== "add" && !values.title ? ( */}
      {query?.slug !== "add" && isDataArrived && (
        <Flex
          width={"100%"}
          height={"38vh"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Core.BtnSpinner size="md" />
        </Flex>
      )}
      <Box
        borderRadius="10px"
        padding="20px"
        boxShadow="0px 2px 5px 2px rgba(0,0,0,0.05)"
        backgroundColor="white.100"
      >
        <Flex columnGap={"10px"} pb="20px">
          <FormControl isRequired>
            <FormLabel>Subject</FormLabel>
            <Input
              onChange={handleChange}
              name="title"
              value={String(values.title)}
              placeholder="Subject"
              type="text"
              error={errors.title}
              touched={touched.title}
              isDisabled={query?.slug === "view"}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Type</FormLabel>
            <Select
              placeholder="Type"
              name="type"
              value={String(values.type)}
              onChange={handleChange}
              list={typeList}
              error={errors.type}
              touched={touched.type}
              isDisabled={query?.slug === "view"}
            >
              <option value="option1">Email</option>
              <option value="option2">Notification</option>
            </Select>
          </FormControl>
        </Flex>
        <Flex columnGap={"10px"}>
          <FormControl isRequired>
            <FormLabel>Message</FormLabel>
            <Textarea
              onChange={handleChange}
              value={String(values.text)}
              name="text"
              placeholder="Message"
              rows={4}
              error={errors.text}
              touched={touched.text}
              isDisabled={query?.slug === "view"}
            />
          </FormControl>
        </Flex>
        <Flex justifyContent="end">
          {query?.slug !== "view" && (
            <Button
              isDisabled={values.title === "" || values.text === ""}
              btnOrangeMd
              onClick={handleSubmit}
              isLoading={query?.slug === "add" ? isLoading : editIsLoading}
            >
              {query?.slug === "add" ? "Add" : "Update"}
            </Button>
          )}
        </Flex>
      </Box>
      {/* )} */}
      {query?.slug === "view" && (
        <Assigner
          id={EAssignerComponentId.EmailNotification}
          _id={String(query.id)}
          isLoading={isLoadingAssign || editIsLoading}
          mutate={mutateAssign}
          status={status}
          showDueDate={false}
          showScheduling={false}
          enableExternalUsers={false}
        />
      )}
    </>
  );
};

export default memo(ActionEmailOrNotificationForm);
