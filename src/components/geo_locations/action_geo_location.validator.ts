import * as Yup from "yup";

export const addValidationSchema = Yup.object({
  facility: Yup.string().required("Facility is required"),
  country: Yup.string().required("Country is required"),
  state: Yup.string().required("State is required"),
  city: Yup.string().required("City is required"),
});
