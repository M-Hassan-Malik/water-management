import { useRouter } from "next/router";
import { useState } from "react";
import { useMutation } from "react-query";

import {
  type AssignInput,
  type AssignTaskMutation,
  EAssignerComponentId,
} from "@/graphql/generated/graphql";
import { AssignTask } from "@/services/api";

import { Alert, Assigner } from "../core";
import TaskDetailsCard from "./task_details_card";

const TaskDetails: React.FC = () => {
  const { query, replace } = useRouter();
  const [fail, setFail] = useState<IAlertSuccessData>();
  const [success, setSuccess] = useState<IAlertSuccessData>();

  const { mutate, isLoading, status } = useMutation<
    AssignTaskMutation,
    unknown,
    AssignInput
  >(
    (variables) =>
      AssignTask({
        taskAssignInput: variables,
      }),
    {
      onSuccess: ({ assignTask }) => {
        setSuccess({
          status: true,
          title: "Assigned",
          description: assignTask?.message || "",
        });
        replace(`/tasks/track`);
      },
      onError: (_: any) => {
        const errorMsg = _?.response?.errors[0]?.message || "Unable to assign.";
        setFail({
          status: true,
          title: "Failed",
          description: errorMsg,
        });
      },
    }
  );
  return (
    <>
      <Alert show={success} theme="success" />
      <Alert show={fail} theme="error" />
      <TaskDetailsCard id={String(query.id)} from={String(query.from)} />
      {query?.from === "list" && (
        <Assigner
          id={EAssignerComponentId.Task}
          isLoading={isLoading}
          mutate={mutate}
          status={status}
          _id={String(query.id)}
          showDueDate={true}
          showScheduling={true}
          enableExternalUsers={false}
        />
      )}
    </>
  );
};

export default TaskDetails;
