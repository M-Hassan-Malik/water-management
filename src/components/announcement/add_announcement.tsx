import { Box, Flex, FormControl, FormLabel } from "@chakra-ui/react";
import { useFormik } from "formik";
import { memo, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";

import { HandleLogout } from "@/components/auth";
import {
  Alert,
  // Alert,
  Button,
  Input,
  Textarea,
} from "@/components/core";
import type {
  PostTickerInput,
  PostTickerMutation,
} from "@/graphql/generated/graphql";
import { GetPost, PostTicker } from "@/services/api";

import { addValidationSchema } from "./announcement.validator";

interface IAddAnnouncementFormProps {}

const AddAnnouncementForm: React.FC<IAddAnnouncementFormProps> = () => {
  const [fail, setFail] = useState<IAlertSuccessData>();
  const [success, setSuccess] = useState<IAlertSuccessData>();
  const user: IUser = useSelector((state: any) => state.user.user);
  const [prevData, setPrevData] = useState<IAddAnnouncementInput>({
    title: "",
    description: "",
    expiryDate: null,
  });

  useQuery("getPost", () => GetPost(), {
    onSuccess({ getPost }) {
      setPrevData({
        title: getPost.data?.title ? getPost.data.title : prevData.title,
        description: getPost.data?.message
          ? getPost.data.message
          : prevData.description,
        expiryDate: getPost.data?.expiration
          ? new Date(getPost.data.expiration)
          : prevData.expiryDate,
      });
    },
    onError(_: any) {
      if (
        _?.response?.errors?.length &&
        _?.response?.errors[0]?.message === "Not Authorised!"
      )
        HandleLogout();
    },
    enabled: !user.company._id,
    refetchOnMount: true,
  });

  const { mutate, isLoading } = useMutation<
    PostTickerMutation,
    unknown,
    PostTickerInput
  >((variables) => PostTicker({ postTickerInput: variables }), {
    onSuccess: ({ postTicker }) => {
      setSuccess({
        status: true,
        title: "Success",
        description: postTicker.message || "",
      });
    },
    onError: (_: any) => {
      setFail({
        status: true,
        title: "Failed",
        description: _?.response?.errors[0]?.message,
      });
    },
  });

  const { handleSubmit, handleChange, values, errors, touched } =
    useFormik<IAddAnnouncementInput>({
      initialValues: {
        title: prevData.title ? prevData.title : "",
        description: prevData.description ? prevData.description : "",
        expiryDate: prevData.expiryDate ? prevData.expiryDate : null,
      },
      enableReinitialize: true,
      onSubmit: (inputValues) => {
        if (user?._id && !user?.company?._id)
          mutate({
            message: inputValues.description,
            title: inputValues.title,
            expiration: inputValues.expiryDate,
            postedBy: user._id,
          });
      },
      validationSchema: addValidationSchema,
    });

  return (
    <>
      <Alert show={success} theme="success" />
      <Alert show={fail} theme="error" />
      {/* {query?.slug !== "add" && !values.title ? (
        <Flex
          width={"100%"}
          height={"38vh"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Core.BtnSpinner size="md" />
        </Flex>
      ) : ( */}
      <Box
        maxWidth={"800px"}
        borderRadius="10px"
        padding="20px"
        boxShadow="0px 2px 5px 2px rgba(0,0,0,0.05)"
        backgroundColor="white.100"
      >
        <Flex flexDirection={"column"} rowGap={"10px"} pb="20px">
          <FormControl width="100%" isRequired>
            <FormLabel>Title</FormLabel>
            <Input
              onChange={handleChange}
              name="title"
              value={String(values.title)}
              placeholder="Title"
              type="text"
              error={errors.title}
              touched={touched.title}
            />
          </FormControl>
          {/* </Flex>
        <Flex columnGap={"10px"}> */}
          <FormControl width="100%" isRequired>
            <FormLabel>Description</FormLabel>
            <Textarea
              onChange={handleChange}
              value={String(values.description)}
              name="description"
              placeholder="Description"
              error={errors.description}
              touched={touched.description}
              rows={4}
            />
          </FormControl>
          <FormControl width="100%" isRequired>
            <FormLabel>Expiry Date</FormLabel>
            <Input
              name="expiryDate"
              type="date"
              value={String(values.expiryDate)}
              error={errors.expiryDate}
              touched={touched.expiryDate}
              onChange={handleChange}
            />
          </FormControl>
        </Flex>
        <Flex justifyContent="end">
          <Button btnOrangeMd onClick={handleSubmit} isLoading={isLoading}>
            Add
          </Button>
        </Flex>
      </Box>
      {/* // )} */}
    </>
  );
};

export default memo(AddAnnouncementForm);
