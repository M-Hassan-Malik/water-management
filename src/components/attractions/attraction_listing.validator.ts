import * as Yup from "yup";

export const addValidationSchema = Yup.object({
  X_Auth_Token: Yup.string().required("X-Auth-Token is required"),
  X_Auth_Id: Yup.string().required("X-Auth-Id is required"),
});
