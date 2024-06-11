import * as Yup from "yup";

export const addValidationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  expiryDate: Yup.date().required("Expiry Date is required"),
});
