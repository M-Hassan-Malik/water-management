import * as Yup from "yup";

export const addTaskSchema = Yup.object().shape({
  title: Yup.string().required("Task title is required"),
  detail: Yup.string().required("Detail is required"),
  facility: Yup.string().required("Please select a facility"),
  subtasks: Yup.array(
    Yup.object().shape({
      completed: Yup.boolean().required(
        "Subtask 'completed' field is required"
      ),
      detail: Yup.string().required("Subtask 'detail' field is required"),
    })
  ).optional(),
});
