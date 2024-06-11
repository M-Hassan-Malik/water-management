import { useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";

import { Core } from "@/components";
import { HandleLogout } from "@/components/auth";
import { EReportType } from "@/graphql/generated/graphql";
import {
  DeleteReportTemplate,
  FindAllReportTemplates,
  queryClient,
} from "@/services/api";

const actions = {
  delete: true,
  edit: true,
  view: true,
  assign: true,
};
interface IReportTemplatesListingProps {
  pageType: EReportType;
}
const columns = ["title", "status", "access", "createdOn", "action"];

const ReportTemplatesListing: React.FC<IReportTemplatesListingProps> = ({
  pageType,
}) => {
  const [allReportTemplates, setAllReportTemplates] = useState<
    ReportTemplate[] | any[]
  >();
  const { push } = useRouter();
  const user: IUser = useSelector((state: any) => state.user.user);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [tableFilters, setTableFilters] = useState(null);
  const [idToDelete, setIdToDelete] = useState<string>("");
  const [success, setSuccess] = useState<IAlertSuccessData>();
  const [fail, setFail] = useState<IAlertSuccessData>();

  const { isFetching } = useQuery(
    ["FindAllReportTemplates", tableFilters, pageType],
    () =>
      FindAllReportTemplates({
        filter: tableFilters,
        reportType: pageType,
        createdById: user._id,
      }),
    {
      onSuccess({ findAllReportTemplates }) {
        const mapped = findAllReportTemplates.flatMap((_) => ({
          _id: _._id,
          title: _.name,
          createdOn: _.createdAt,
          status: _.status,
          access: _?.universalAccess ? "DEFAULT" : "UPDATED",
        }));
        setAllReportTemplates(mapped);
      },
      onError(_: any) {
        if (
          _?.response?.errors?.length &&
          _?.response?.errors[0]?.message === "Not Authorised!"
        )
          HandleLogout();
      },
      enabled: Boolean(user._id),
      refetchOnMount: true,
    }
  );

  const { mutate } = useMutation(DeleteReportTemplate, {
    onSuccess() {
      setSuccess({
        status: true,
        title: "Success",
        description: "Template successfully deleted.",
      });
      queryClient.invalidateQueries({
        queryKey: ["FindAllReportTemplates"],
      });
    },
    onError(_: any) {
      if (
        _?.response?.errors?.length &&
        _?.response?.errors[0]?.message === "Not Authorised!"
      )
        HandleLogout();
      setFail({
        status: true,
        title: "Failed",
        description: _?.response?.errors[0]?.message,
      });
    },
  });

  const onViewClick = (id: string) => {
    push(
      {
        pathname: `/report-templates/view`,
        query: { id },
      },
      undefined,
      { shallow: true, locale: "fr" }
    );
  };

  const onDeleteClick = (id: any) => {
    setIdToDelete(id);
    onOpen();
  };

  const onEditClick = (id: string) => {
    push(
      {
        pathname: `/report-templates/edit`,
        query: { id },
      },
      undefined,
      { shallow: true }
    );
  };

  const onAssignClick = (id: string) => {
    const routingObject: any = {
      pathname: `/report-templates/assign`,
      query: { id },
    };
    if (pageType === EReportType.InService)
      routingObject.query.history = "in-service";

    pageType === EReportType.InService;
    push(routingObject, undefined, { shallow: true });
  };

  const confirmAction = (id: string) => {
    mutate({
      templateId: id,
    });
    onClose();
  };

  const createButtonAction = (): void => {
    switch (pageType) {
      case EReportType.Standard:
        push({
          pathname: `/report-templates/add`,
          query: { "template-type": EReportType.Standard },
        });
        break;

      case EReportType.Inventory:
        push({
          pathname: `/report-templates/add`,
          query: { "template-type": EReportType.Inventory },
        });
        break;
      case EReportType.Incident:
        push({
          pathname: `/report-templates/add`,
          query: { "template-type": EReportType.Incident },
        });
        break;
      case EReportType.InService:
        push({
          pathname: `/report-templates/add`,
          query: { "template-type": EReportType.InService },
        });
        break;
      case EReportType.Vat:
        push({
          pathname: `/report-templates/add`,
          query: { "template-type": EReportType.Vat },
        });
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Core.Alert show={success} theme="success" />
      <Core.Alert show={fail} theme="error" />
      <Core.Modal
        isOpen={isOpen}
        onClose={onClose}
        onClick={confirmAction}
        id={idToDelete}
      />

      <Core.Table
        title={EReportType.InService && "Templates"}
        id={
          pageType === "INVENTORY"
            ? "inventory-report-templates"
            : pageType === "INCIDENT"
            ? "incident-report-templates"
            : pageType === "IN_SERVICE"
            ? "in-service"
            : pageType === "VAT"
            ? "vat-reports"
            : pageType === "STANDARD"
            ? "report-templates"
            : "else"
        }
        actionButton={
          pageType === EReportType.InService
            ? undefined
            : {
                name: "Create Report Template",
                action: createButtonAction,
              }
        }
        tableData={allReportTemplates || []}
        columns={columns}
        shadow
        actions={actions}
        filterBy={["Dates", "Name"]}
        setTableFilters={setTableFilters}
        isLoading={isFetching}
        onViewClick={onViewClick}
        onEditClick={onEditClick}
        onDeleteClick={onDeleteClick}
        onAssignClick={onAssignClick}
      />
    </>
  );
};

export default ReportTemplatesListing;
