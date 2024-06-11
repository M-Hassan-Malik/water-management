import * as Yup from "yup";

export const addValidationSchema = Yup.object({
  first_name: Yup.string().required("First Name is required"),
  last_name: Yup.string().required("Last Name is required"),
  email: Yup.string().notRequired().email().required("Email is required"),
  password: Yup.string()
    .notRequired()
    .required("Password is required")
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
    ),
  type: Yup.string().required("Type is required"),
  package: Yup.string().required("Package is required"),
  phone: Yup.object().shape({
    code: Yup.string().required("Phone Code is required"),
    phoneNo: Yup.string().required("Phone Number is required"),
  }),
});

export const UpdateValidationSchema = Yup.object({
  first_name: Yup.string().required("First Name is required"),
  last_name: Yup.string().required("Last Name is required"),
  email: Yup.string().email().required("Email is required"),
  password: Yup.string()
    .nullable()
    .test("password-validation", "Invalid password", (value) => {
      if (!value) return true; // Skip the validation if value is null or undefined
      return (
        /[A-Z]/.test(value) &&
        /[a-z]/.test(value) &&
        /\d/.test(value) &&
        /[!@#$%^&*]/.test(value) &&
        value.length >= 8
      );
    }),
  type: Yup.string().required("Type is required"),
  phone: Yup.object().shape({
    code: Yup.string().required("Phone Code is required"),
    phoneNo: Yup.string().required("Phone Number is required"),
  }),
});
