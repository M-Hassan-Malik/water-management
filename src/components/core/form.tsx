import { Button, Text } from "@chakra-ui/react";
import moment from "moment";
import { useRouter } from "next/router";
import { memo, useContext, useState } from "react";
import { useCookies } from "react-cookie";
import { useMutation } from "react-query";
import {
  type ActivityLogInput,
  type CreateActivityLogMutation,
  EmployeeType,
  type ForgetPasswordInput,
  type ForgetPasswordMutation,
  Interface,
  type LoginInput,
  type LoginMutation,
  type ResetPasswordInput,
  type ResetPasswordMutation,
  type TemporaryPasswordInput,
  type UpdateTemporaryPasswordMutation,
  type VerifyOtpInput,
  type VerifyOtpMutation,
} from "src/graphql/generated/graphql";

import { HandleLogout } from "@/components/auth";
import { InputsContext } from "@/pages/_app";
import {
  CreateActivityLog,
  forgetPassword,
  Login,
  ResetPassword,
  UpdateTemporaryPassword,
  UserById,
  VerifyOtp,
} from "@/services/api";
import { theme } from "@/utils/configurations";
import { requestNotificationPermission } from "@/utils/helpers/functions";
import { verifyJWT } from "@/utils/helpers/jwt";

import { Core } from "..";

interface FormProps {
  BottomView?: React.ReactNode;
  OtpFields?: React.ReactNode;
}

const Form = ({
  OtpFields,
  BottomView,
  fields = [],
  actionText = "Not Defined",
  slug,
}: FormProps & IPageConfigurations) => {
  const { replace, push } = useRouter();
  const [isLoader, setIsLoader] = useState(false);
  const [error, setError] = useState("");
  const [, setCookie] = useCookies(["auth"]);
  const contextData: any = useContext(InputsContext);
  const [success, setSuccess] = useState<IAlertSuccessData>();

  // const actionBtnLink = () => {
  //   if (slug === "sign_in") return "/dashboard";
  //   if (slug === "forget_password") return "/auth/otp";
  //   if (slug === "otp") return "/auth/new-password";
  //   if (slug === "new_password") return "/dashboard";
  //   return "/";
  // };

  const activityLogMutation = useMutation<
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

  const loginMutation = useMutation<LoginMutation, unknown, LoginInput>(
    (variables) => Login({ loginInput: variables }),
    {
      async onSuccess(data) {
        if (data.login.temporary_password) {
          contextData.setInputs({
            ...contextData.inputs,
            openNewPassword: true,
          });
          await setCookie("auth", data.login.token, {
            path: "/",
            maxAge: 60 * 30, // 30 minutes in seconds
          });
          push("/auth/new-password");
        } else {
          const verified = verifyJWT(data.login.token);
          if (verified) {
            const user = await UserById({ userByIdId: String(verified.id) });
            if (
              // Employee Type SubAdmin || Manager || Lifeguard
              user.userById &&
              user.userById.company &&
              (user.userById.company?.employeeType === EmployeeType.Subadmin ||
                user.userById.company?.employeeType === EmployeeType.Manager ||
                user.userById.company?.employeeType === EmployeeType.Lifeguard)
            ) {
              activityLogMutation.mutate({
                user_name: `${user.userById?.first_name} ${user.userById?.last_name}`,
                belongsTo: user.userById.belongsTo,
                // role: "Sub-Admin",
                role: user.userById.company?.employeeType,
                user_id: user.userById._id,
                interface: Interface.Web,
                dateTime: moment().toDate(),
                activity: "Login",
              });
              await setCookie("auth", data.login.token, {
                path: "/",
                maxAge: 60 * 30, // 30 minutes in seconds
              });
              replace("/dashboard");
            } else if (
              // Client Admin with First time login
              user.userById?.company?.subAdmin &&
              !user.userById?.company?.park?._id
            ) {
              activityLogMutation.mutate({
                user_name: `${user.userById?.first_name} ${user.userById?.last_name}`,
                belongsTo: user.userById._id,
                role: "Client Admin",
                user_id: user.userById._id,
                interface: Interface.Web,
                dateTime: moment().toDate(),
                activity: "On-Boarded",
              });
              await setCookie("auth", data.login.token, {
                path: "/",
                maxAge: 60 * 30, // 30 minutes in seconds
              });
              replace("/complete-profile");
            } else {
              activityLogMutation.mutate({
                user_id: user.userById?._id || "",
                user_name: `${user.userById?.first_name} ${user.userById?.last_name}`,
                belongsTo: user.userById?.belongsTo || user.userById?._id,
                role: "Other Users",
                interface: Interface.Web,
                dateTime: moment().toDate(),
                activity: "Login",
              });
              await setCookie("auth", data.login.token, {
                path: "/",
                maxAge: 60 * 30, // 30 minutes in seconds
              });

              let path: any = "";
              if (window !== undefined) {
                path = localStorage.getItem("path");
              }
              await replace(`${path || "/dashboard"}`);
            }
          }
        }
      },
      onError(loginError: any) {
        setError(loginError?.response?.errors[0]?.message);
        setIsLoader(false);
      },
    }
  );

  const forgetMutation = useMutation<
    ForgetPasswordMutation,
    unknown,
    ForgetPasswordInput
  >((variables) => forgetPassword({ forgetPasswordInput: variables }), {
    onSuccess(data) {
      if (data?.forgetPassword) {
        contextData.setInputs({
          ...contextData.inputs,
          openOTPRoute: true,
        });
        push(
          {
            pathname: "/auth/otp",
          },
          undefined,
          {
            shallow: true,
          }
        );
      }
      if (!forgetMutation.isLoading) {
        setIsLoader(false);
      }
    },
    onError(_: any) {
      if (
        _?.response?.errors?.length &&
        _?.response?.errors[0]?.message === "Not Authorised!"
      )
        HandleLogout();
      setError(_?.response?.errors[0]?.message);
      setIsLoader(false);
    },
  });

  const temporaryPasswordMutation = useMutation<
    UpdateTemporaryPasswordMutation,
    unknown,
    TemporaryPasswordInput
  >(
    (variables) =>
      UpdateTemporaryPassword({ temporaryPasswordInput: variables }),
    {
      async onSuccess(data) {
        if (data.updateTemporaryPassword.token) {
          await setCookie("auth", data.updateTemporaryPassword.token, {
            path: "/",
            maxAge: 60 * 30, // 30 minutes in seconds
          });
          setSuccess({
            status: true,
            description: "Password updated successfully",
            title: "Password Updated",
          });

          const verified = verifyJWT(data.updateTemporaryPassword.token);
          if (verified) {
            const user = await UserById({ userByIdId: String(verified.id) });

            if (
              user.userById &&
              user.userById.company &&
              (user.userById.company.employeeType === EmployeeType.Subadmin ||
                user.userById.company.employeeType === EmployeeType.Manager ||
                user.userById.company.employeeType === EmployeeType.Lifeguard)
            ) {
              activityLogMutation.mutate({
                user_name: `${user.userById?.first_name} ${user.userById?.last_name}`,
                belongsTo: user.userById.created_by,
                role: String(user.userById.company?.employeeType),
                user_id: user.userById._id,
                interface: Interface.Web,
                dateTime: moment().toDate(),
                activity: "Login",
              });
              await setCookie("auth", data.updateTemporaryPassword.token, {
                path: "/",
                maxAge: 60 * 30, // 30 minutes in seconds
              });
              replace(
                {
                  pathname: "/dashboard",
                },
                undefined,
                {
                  shallow: true,
                }
              );
            } else if (
              user.userById &&
              user?.userById?.company &&
              user?.userById?.company?.subAdmin &&
              !user?.userById?.company?.park?._id
            ) {
              await setCookie("auth", data.updateTemporaryPassword.token, {
                path: "/",
                maxAge: 60 * 30, // 30 minutes in seconds
              });
              replace(
                {
                  pathname: "/complete-profile",
                },
                undefined,
                {
                  shallow: true,
                }
              );
            } else {
              await setCookie("auth", data.updateTemporaryPassword.token, {
                path: "/",
                maxAge: 60 * 30, // 30 minutes in seconds
              });
              replace(
                {
                  pathname: "/dashboard",
                },
                undefined,
                {
                  shallow: true,
                }
              );
            }
          }
        }
      },
    }
  );

  const resetPasswordMutation = useMutation<
    ResetPasswordMutation,
    unknown,
    ResetPasswordInput
  >((variables) => ResetPassword({ resetPasswordInput: variables }), {
    onSuccess(data) {
      if (data?.resetPassword) {
        temporaryPasswordMutation.mutateAsync({
          email: contextData.inputs.email,
          temporary_password: false,
        });
        setIsLoader(false);
        // replace(
        //   {
        //     pathname: "/dashboard",
        //   },
        //   undefined,
        //   {
        //     shallow: true,
        //   }
        // );
      }
    },
    onError(_: any) {
      if (
        _?.response?.errors?.length &&
        _?.response?.errors[0]?.message === "Not Authorised!"
      )
        HandleLogout();
      setError(_?.response?.errors[0]?.message);
      setIsLoader(false);
    },
  });

  const verifyOTPMutation = useMutation<
    VerifyOtpMutation,
    unknown,
    VerifyOtpInput
  >((variables) => VerifyOtp({ verifyOtpInput: variables }), {
    onSuccess(data) {
      if (data?.verifyOtp) {
        setIsLoader(false);
        contextData.setInputs({
          ...contextData.inputs,
          openNewPassword: true,
          openOTPRoute: false,
        });

        push(
          {
            pathname: "/auth/new-password",
          },
          undefined,
          {
            shallow: true,
          }
        );
      }
    },
    onError(_: any) {
      if (
        _?.response?.errors?.length &&
        _?.response?.errors[0]?.message === "Not Authorised!"
      )
        HandleLogout();
      setError(_?.response?.errors[0]?.message);
      setIsLoader(false);
    },
  });

  const submitHandler = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setIsLoader(true);
    let result: any = null;
    switch (slug) {
      case "sign_in":
        if (
          !contextData.inputs.email.length ||
          !contextData.inputs.password.length
        ) {
          setError("Enter Username and Password");
          setIsLoader(false);
        } else {
          setError("");
          let deviceToken = "";
          try {
            deviceToken = await requestNotificationPermission();
            if (process.env.NODE_ENV !== "production")
              console.log({ deviceToken });
          } catch (_) {
            if (process.env.NODE_ENV !== "production") console.log(_);
          }
          loginMutation.mutate({
            email: contextData.inputs.email,
            password: contextData.inputs.password,
            interface: Interface.Web,
            deviceToken: deviceToken || "",
          });
        }
        break;
      case "forgot_password":
        if (
          !contextData.inputs.email.length ||
          !contextData.inputs.email.includes("@")
        ) {
          setError("Enter Correct Email");
          setIsLoader(false);
        } else {
          forgetMutation.mutate({
            email: contextData.inputs.email,
          });
        }
        break;
      case "new_password":
        if (
          contextData.inputs.password === "" ||
          contextData.inputs.confirmPassword === ""
        ) {
          setError("Enter Password");
          setIsLoader(false);
        } else if (
          contextData.inputs.password !== contextData.inputs.confirmPassword
        ) {
          setError("Passwords do not match");
          setIsLoader(false);
        } else {
          result = await resetPasswordMutation
            .mutateAsync({
              email: contextData.inputs.email,
              new_password: contextData.inputs.password,
            })
            .catch((newPasswordError) => {
              setError(newPasswordError);
              setIsLoader(false);
            });
          if (result?.resetPassword) {
            temporaryPasswordMutation.mutate({
              email: contextData.inputs.email,
              temporary_password: false,
            });
            setIsLoader(false);
          }
        }
        break;
      case "otp":
        if (!contextData.inputs.otp.length) {
          setError("Enter OTP Code");
          setIsLoader(false);
        } else {
          verifyOTPMutation.mutate({
            otp: Number(contextData.inputs.otp),
          });
        }
        break;
      default:
        break;
    }
  };

  return (
    <form>
      {fields &&
        fields.map((_) => <Core.Field {..._} key={_.key} formName={slug} />)}
      {BottomView}
      {OtpFields}
      <Core.Alert show={success} theme="success" />
      <Text
        style={{
          fontSize: "12px",
          color: "red",
          height: "22px",
          marginTop: "-5px",
        }}
      >
        {error && error}
      </Text>
      <Button
        variant="primary"
        type="submit"
        backgroundColor={theme.colors.orange}
        textColor={theme.colors.white}
        size="md"
        height="48px"
        width={"100%"}
        onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
          submitHandler(e)
        }
      >
        {isLoader ? <Core.BtnSpinner size="lg" /> : actionText}
      </Button>
    </form>
  );
};

export default memo(Form);
