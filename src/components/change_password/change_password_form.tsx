import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { memo, useState } from "react";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import * as Yup from "yup";

import { ChangePassword } from "@/services/api";

import { Core } from "..";

interface IChangePasswordFormProps {}

const ChangePasswordForm: React.FC<IChangePasswordFormProps> = () => {
  const user: IUser = useSelector((state: any) => state.user.user);

  const [success, setSuccess] = useState<IAlertSuccessData>();
  const [error, setError] = useState<IAlertSuccessData>();
  const [show, setShow] = useState<boolean>(false);
  const [showNew, setShowNew] = useState<boolean>(false);

  const { isLoading, mutate } = useMutation(
    "ChangePasswordMutation",
    ChangePassword,
    {
      onError: () => {
        setError({
          status: true,
          description: "Error in updating password",
          title: "Something went wrong",
        });
      },
    }
  );

  const validationSchema = Yup.object().shape({
    old_password: Yup.string().required("Old Password is required"),
    new_password: Yup.string()
      .required("New Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[!@#$%^&*])/,
        "Password must include at least one special character (!,@,#,$,%,^,&,*)"
      )
      .test(
        "not-same-as-old",
        "New password must not be the same as the old password",
        // eslint-disable-next-line
        function (value) {
          // `this.parent` refers to the form values object, so you can access old_password and new_password here
          const oldPassword = this.parent.old_password;
          const newPassword = value;
          return oldPassword !== newPassword;
        }
      ),
    confirm_password: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("new_password")], "Passwords must match"),
  });

  const {
    handleSubmit,
    handleChange,
    values,
    errors,
    touched,
    isSubmitting,
    setValues,
  } = useFormik<{
    old_password: string;
    new_password: string;
    confirm_password: string;
  }>({
    initialValues: {
      old_password: "",
      confirm_password: "",
      new_password: "",
    },
    onSubmit: (inputValues) => {
      if (inputValues.new_password === inputValues.confirm_password) {
        mutate(
          {
            changePasswordInput: {
              email: user.email,
              new_password: inputValues.new_password,
              old_password: inputValues.old_password,
            },
          },
          {
            onSuccess: () => {
              setSuccess({
                status: true,
                description: "Password updated Succesfully",
                title: "Password Updated",
              });
              setValues({
                old_password: "",
                confirm_password: "",
                new_password: "",
              });
            },
          }
        );
      } else {
        setError({
          title: "Passwords do not match",
          status: true,
          description:
            "The new password and the confirmed new password do not match",
        });
      }
    },
    enableReinitialize: true,
    validationSchema,
  });

  return (
    <Box>
      <Core.Alert show={success} theme="success" />
      <Core.Alert show={error} theme="error" />
      <Flex columnGap={"10px"} pb="20px">
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            disabled
            placeholder="Email"
            type="text"
            defaultValue={user.email}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Old Password</FormLabel>
          <InputGroup size="md" display={"block"}>
            <Core.Input
              placeholder="Old Password"
              type={show ? "text" : "password"}
              name="old_password"
              value={values.old_password}
              onChange={handleChange}
              error={errors.old_password}
              touched={touched.old_password}
            />
            <InputRightElement width="4.5rem">
              <Button
                height="1.75rem"
                size="sm"
                textColor={"textColor"}
                onClick={() => {
                  setShow(!show);
                }}
              >
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
      </Flex>
      <Flex columnGap={"10px"}>
        <FormControl isRequired>
          <FormLabel>New Password</FormLabel>
          <InputGroup size="md" display={"block"}>
            <Core.Input
              placeholder="New Password"
              type={showNew ? "text" : "password"}
              value={values.new_password}
              name="new_password"
              onChange={handleChange}
              error={errors.new_password}
              touched={touched.new_password}
            />
            <InputRightElement width="4.5rem">
              <Button
                height="1.75rem"
                size="sm"
                textColor={"textColor"}
                onClick={() => {
                  setShowNew(!showNew);
                }}
              >
                {showNew ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Confirm Password</FormLabel>
          <Core.Input
            type={showNew ? "text" : "password"}
            placeholder="Confirm Password"
            name="confirm_password"
            value={values.confirm_password}
            onChange={handleChange}
            error={errors.confirm_password}
            touched={touched.confirm_password}
          />
        </FormControl>
      </Flex>
      <Flex columnGap={"10px"} justifyContent="end">
        <Core.Button
          btnOrangeMd
          button="Submit"
          onClick={handleSubmit}
          isLoading={isSubmitting && isLoading}
          isDisabled={isSubmitting && isLoading}
        />
      </Flex>
    </Box>
  );
};

export default memo(ChangePasswordForm);
