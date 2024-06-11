import { Box, Flex, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useFormik } from "formik";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import * as Yup from "yup";

import { UpdateEmail } from "@/services/api";

import { Core } from "..";

interface IUpdateEmailFormProps {}

const UpdateEmailForm: React.FC<IUpdateEmailFormProps> = () => {
  const user: IUser = useSelector((state: any) => state.user.user);

  const [success, setSuccess] = useState<IAlertSuccessData>();
  const [error, setError] = useState<IAlertSuccessData>();
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation(
    "UpdateEmailMutation",
    UpdateEmail,
    {
      onSuccess: () => {
        setSuccess({
          status: true,
          description: "Email updated Succesfully",
          title: "Email Updated",
        });
        queryClient.invalidateQueries({ queryKey: ["FindUserByIdForAuth"] });
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
  const validationSchema = Yup.object().shape({
    password: Yup.string().required("Password is required"),
    new_email: Yup.string()
      .required("Email is required")
      .notOneOf([user.email], "New email cannot be the same as current email")
      .email()
      .required("New Email is required"),
  });
  const { handleSubmit, handleChange, setFieldValue, values, errors, touched } =
    useFormik<IUpdateEmailBody>({
      initialValues: {
        email: user.email ? user.email : "",
        password: "",
        new_email: "",
      },
      onSubmit: (inputValues) => {
        mutate({
          updateEmailInput: {
            email: inputValues.email,
            password: inputValues.password,
            new_email: inputValues.new_email,
          },
        });
      },
      enableReinitialize: true,
      validationSchema,
    });

  return (
    <Box>
      <Core.Alert show={success} theme="success" />
      <Core.Alert show={error} theme="error" />
      <Flex columnGap={"10px"} pb="20px">
        <FormControl isRequired>
          <FormLabel>Current Email</FormLabel>
          <Input
            disabled
            type="text"
            name="email"
            value={user.email}
            placeholder="Current Email"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Password</FormLabel>
          <Core.Input
            placeholder="Password"
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            error={errors.password}
            touched={touched.password}
          />
        </FormControl>
      </Flex>

      <Flex columnGap={"10px"} pb="20px">
        <FormControl
          isRequired
          isInvalid={!!errors.new_email && touched.new_email}
        >
          <FormLabel>New Email</FormLabel>
          <Core.Input
            placeholder="New Email"
            type="email"
            name="new_email"
            value={values.new_email}
            onChange={(e) => {
              e.preventDefault;
              setFieldValue("new_email", e.target.value.toLowerCase().trim());
            }}
            error={errors.new_email}
            touched={touched.new_email}
          />
        </FormControl>
      </Flex>

      <Flex columnGap={"10px"} justifyContent="end">
        <Core.Button
          btnOrangeMd
          button="Submit"
          onClick={handleSubmit}
          isLoading={isLoading}
          // isDisabled={isSubmitting && isLoading}
          isDisabled={isLoading}
        />
      </Flex>
    </Box>
  );
};

export default UpdateEmailForm;
