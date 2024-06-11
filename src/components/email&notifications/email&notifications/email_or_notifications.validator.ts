import * as Yup from "yup";

export const addValidationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  text: Yup.string().required("Message is required"),
  type: Yup.string().required("Type is required"),
});

export const updateValidationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  text: Yup.string().required("Message is required"),
});
