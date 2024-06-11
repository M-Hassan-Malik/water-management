import * as Yup from "yup";

export const addValidationSchemaForAdmin = Yup.object({
  active: Yup.boolean().required(),
  name: Yup.string().required("Role Name is required"),
});
export const updateValidationSchemaForAdmin = Yup.object({
  active: Yup.boolean().required(),
  name: Yup.string().required(),
});

export const addValidationSchema = Yup.object({
  active: Yup.boolean().required(),
  facility: Yup.string().required(),
  name: Yup.string().required("Role Name is required"),
});
export const updateValidationSchema = Yup.object({
  active: Yup.boolean().required(),
  facility: Yup.string().required(),
  name: Yup.string().required("Role Name is required"),
});
