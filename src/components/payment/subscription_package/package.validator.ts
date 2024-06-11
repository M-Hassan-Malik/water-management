import * as Yup from "yup";

export const addValidationSchema = Yup.object({
  discount: Yup.number(),
  discount_type: Yup.string(),
  active: Yup.string().required(),
  number_of_users: Yup.number()
    .min(1, "Enter the number of users")
    .required("Number of users are required"),
  title: Yup.string().required("Package Name is required"),
  cost: Yup.number()
    .required("Price amount is required")
    .min(0, "Must be greater than or equal to 0"),
  sizeInGB: Yup.number()
    .required("Storage size is required")
    .min(1, "Must be greater than or equal to 1"),
  // modules: Yup.array().required("Modules are required").min(1),
  description: Yup.string().required("Package Description is required"),
  duration: Yup.number()
    .min(27, "Time Period is Required")
    .required("Time period is required"),
});
export const updateValidationSchema = Yup.object({
  discount: Yup.number(),
  discount_type: Yup.string(),
  active: Yup.string().required(),
  number_of_users: Yup.number()
    .min(1, "Enter the number of users")
    .required("Number of users are required"),
  title: Yup.string().required("Package Name is required"),
  cost: Yup.number()
    .required("Price amount is required")
    .min(0, "Must be greater than or equal to 0"),
  sizeInGB: Yup.number()
    .required("Storage size is required")
    .min(1, "Must be greater than or equal to 1"),
  // modules: Yup.array().required("Modules are required").min(1),
  description: Yup.string().required("Package Description is required"),
  duration: Yup.number()
    .min(27, "Time Period is Required")
    .required("Time period is required"),
});
