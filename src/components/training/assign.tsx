import { useRouter } from "next/router";
import { useState } from "react";
import { useMutation } from "react-query";

import { Alert, Assigner } from "@/components/core";
import {
  type AssignTrainingSessionInput,
  type AssignTrainingSessionMutation,
  EAssignerComponentId,
} from "@/graphql/generated/graphql";
import { AssignTrainingSession } from "@/services/api";

import Action from "./action";

interface IAssignProps {}

const Assign: React.FC<IAssignProps> = () => {
  const { query, replace } = useRouter();
  const [fail, setFail] = useState<IAlertSuccessData>();
  const [success, setSuccess] = useState<IAlertSuccessData>();

  const { mutate, isLoading, status } = useMutation<
    AssignTrainingSessionMutation,
    unknown,
    AssignTrainingSessionInput
  >(
    (variables) =>
      AssignTrainingSession({ assignTrainingSessionInput: variables }),
    {
      onSuccess: () => {
        setSuccess({
          status: true,
          title: "Success",
          description: "Assigning Complete",
        });
        replace(`/trainings/track`);
      },
      onError: (_: any) => {
        setFail({
          status: true,
          title: "Failed",
          description: _?.response?.errors[0]?.message,
        });
      },
    }
  );

  return (
    <>
      <Alert show={success} theme="success" />
      <Alert show={fail} theme="error" />
      <Action pageType={"view"} />

      <Assigner
        id={EAssignerComponentId.Training}
        _id={String(query.id)}
        mutate={mutate}
        status={status}
        isLoading={isLoading}
        showDueDate={true}
        showScheduling={true}
        enableExternalUsers={true}
      />
    </>
  );
};

export default Assign;
