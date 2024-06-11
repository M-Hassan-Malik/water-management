import * as Yup from "yup";

import { EmployeeType } from "@/graphql/generated/graphql";

export const validationSchema = (pageType: PageType) =>
  Yup.object().shape({
    first_name: Yup.string().required("First Name is required"),
    last_name: Yup.string().required("Last Name is required"),
    location: Yup.array().min(1, "At least one location is required"),
    role: Yup.string(),
    email: Yup.string().required("Email is required"),
    phone:
      pageType === "create"
        ? Yup.object().shape({
            code: Yup.string().required("Phone Code is required"),
            phoneNo: Yup.string().required("Phone Number is required"),
          })
        : Yup.object().shape({
            code: Yup.string().notRequired(),
            phoneNo: Yup.string().notRequired(),
          }),
    password:
      pageType === "create"
        ? // Yup.string()
          //     .required("Password is required")
          //     .min(8, "Password must be at least 8 characters long")
          Yup.string()
            .required("New Password is required")
            .test(
              "contains-uppercase",
              "Password must contain at least one uppercase letter",
              (value) => {
                return /[A-Z]/.test(value);
              }
            )
            .test(
              "contains-lowercase",
              "Password must contain at least one lowercase letter",
              (value) => {
                return /[a-z]/.test(value);
              }
            )
            .test(
              "contains-number",
              "Password must contain at least one number",
              (value) => {
                return /\d/.test(value);
              }
            )
            .test(
              "contains-special-char",
              "Password must contain at least one special character",
              (value) => {
                return /[!@#$%^&*]/.test(value);
              }
            )
            .test(
              "has-min-length",
              "Password must be at least 8 characters long",
              (value) => {
                return value.length >= 8;
              }
            )
        : Yup.string().min(8, "Password must be at least 8 characters long"),
    confirm_password:
      pageType === "create"
        ? Yup.string()
            .required("Confirm Password is required")
            .oneOf([Yup.ref("password")], "Passwords must match")
        : Yup.string().oneOf([Yup.ref("password")], "Passwords must match"),
    employeeType: Yup.string()
      .oneOf([
        EmployeeType.Subadmin,
        EmployeeType.Manager,
        EmployeeType.Lifeguard,
      ])
      .required("Employee type is required"),
    department: Yup.string().required("Department is required"),
    photo_url: Yup.string().url("Invalid photo URL"),
    access: Yup.string().oneOf(
      ["WEB", "MOBILE", "BOTH"],
      "Access type is required"
    ),
  });
