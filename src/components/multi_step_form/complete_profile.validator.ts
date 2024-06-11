import * as yup from "yup";

export const validationSchema = yup.object().shape({
  step1: yup.object().shape({
    profile_img: yup.string(),
    first_name: yup.string().required("First Name is required"),
    last_name: yup.string().required("Last Name is required"),
  }),
  step2: yup.object().shape({
    park_logo: yup.string(),
    park_name: yup.string().required("Park Name is required"),
  }),
  step3: yup.object().shape({
    facility: yup.string().required("Facility is required"),
    country: yup.string().required("Country is required"),
    city: yup.string().required("City is required"),
    state: yup.string().required("State is required"),
    GPS: yup
      .object()
      .shape({
        lat: yup.number(),
        lng: yup.number(),
      })
      .required(),
  }),
});
