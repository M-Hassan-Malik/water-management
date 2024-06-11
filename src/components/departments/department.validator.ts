import * as Yup from "yup";

export const addValidationSchema = Yup.object({
  active: Yup.boolean().required(),
  name: Yup.string().required("Department Name is required"),
});
export const updateValidationSchema = Yup.object({
  active: Yup.boolean().required(),
  name: Yup.string(),
});
