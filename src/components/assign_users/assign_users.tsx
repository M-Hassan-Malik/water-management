import { useRouter } from "next/router";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";

import { Core, ReportTemplate } from "@/components";
import { HandleLogout } from "@/components/auth";
import type {
  AssignInServiceInput,
  AssignInServiceMutation,
  AssignReportTemplateMutation,
  AssignTrainingSessionInput,
} from "@/graphql/generated/graphql";
import { EAssignerComponentId } from "@/graphql/generated/graphql";
import {
  AssignInService,
  AssignReportTemplate,
  FindTemplateById,
} from "@/services/api";

import { Assigner } from "../core";

interface IAssignUsersProps {
  reportId: string;
}

const AssignUsers: React.FC<IAssignUsersProps> = ({ reportId }) => {
  const [fail, setFail] = useState<IAlertSuccessData>();
  const [success, setSuccess] = useState<IAlertSuccessData>();
  const [formFields, setFormFields] = useState<IFormField[]>([]);
  const [templateName, setTemplateName] = useState<string>("");
  const [templateType, setTemplateType] = useState<string>("");
  const { replace, query } = useRouter();

  const {
    mutate: reportMutation,
    isLoading: reportLoading,
    status: reportStatus,
  } = useMutation<
    AssignReportTemplateMutation,
    unknown,
    AssignTrainingSessionInput
  >(
    (variables) =>
      AssignReportTemplate({
        assignReportTemplateInput: variables,
      }),
    {
      onSuccess: ({ assignReportTemplate }) => {
        setSuccess({
          status: true,
          title: "Assigned",
          description: assignReportTemplate,
        });
        replace("/report-templates/track");
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

  const {
    mutate: inServiceMutation,
    isLoading: inServiceLoading,
    status: inServiceStatus,
  } = useMutation<AssignInServiceMutation, unknown, AssignInServiceInput>(
    (variables) =>
      AssignInService({
        assignInServiceInput: variables,
      }),
    {
      onSuccess: ({ assignInService }) => {
        setSuccess({
          status: true,
          title: "Assigned",
          description: assignInService,
        });
        replace({
          pathname: "/trainings/in-service",
          query: { table: "tracking" },
        });
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

  useQuery(
    "FindTemplateById",
    () => FindTemplateById({ findTemplateByIdId: String(reportId) }),
    {
      onSuccess({ findTemplateById }) {
        setFormFields(findTemplateById?.fields as IFormField[]);
        setTemplateName(findTemplateById.name);
        setTemplateType(findTemplateById.type);
      },
      onError(_: any) {
        if (
          _?.response?.errors?.length &&
          _?.response?.errors[0]?.message === "Not Authorised!"
        )
          HandleLogout();
        setFail({
          status: true,
          title: "Unable to get report template",
          description: "Failed to fetch report template fields.",
        });
      },
      enabled: Boolean(reportId),
      refetchOnMount: true,
    }
  );

  return (
    <>
      <Core.Alert show={success} theme="success" />
      <Core.Alert show={fail} theme="error" />
      <ReportTemplate.ReportForm
        formFields={formFields}
        templateName={templateName}
        reportType={templateType}
        pageType="view"
      />
      {query.history === "in-service" ? (
        <Assigner
          id={EAssignerComponentId.InService}
          isLoading={inServiceLoading}
          mutate={inServiceMutation}
          status={inServiceStatus}
          _id={String(query.id)}
          showScheduling={false}
          showDueDate={true}
          enableExternalUsers={true}
        />
      ) : (
        <Assigner
          id={EAssignerComponentId.Report}
          isLoading={reportLoading}
          mutate={reportMutation}
          status={reportStatus}
          _id={String(query.id)}
          showScheduling={true}
          showDueDate={true}
          enableExternalUsers={templateType === "VAT"}
        />
      )}
    </>
  );
};

export default AssignUsers;
