import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";

import { Core } from "@/components";
import type { InputTableFilter } from "@/graphql/generated/graphql";
import { EReportType } from "@/graphql/generated/graphql";
import { FindAllReports } from "@/services/api";

const actions = {
  view: true,
};

interface IUserReport {
  _id: string;
  title: string;
  assignedTo: string;
  scheduleType: string;
}

interface ITrackReportTemplatesProps {
  pageType?: EReportType;
}

const columns = ["title", "assignedTo", "created_by", "scheduleType", "action"];

const TrackReportTemplates: React.FC<ITrackReportTemplatesProps> = ({
  pageType,
}) => {
  const { push } = useRouter();
  const [userReports, setUserReports] = useState<IUserReport[]>();

  const [tableFilters, setTableFilters] = useState<InputTableFilter>({
    Name: "",
    Email: "",
    Package: "",
    Role: "",
    ParkName: "",
    Intervals: "",
    Task: "",
    User: "",
    paid: "",
    Message: "",
    OrganizationName: "",
    EmailAndNotification: "",
    Dates: "",
    dynamicObjectId: "",
    reportType: "",
  });
  const [error, setError] = useState<IAlertSuccessData>();
  const user: IUser = useSelector((state: any) => state.user.user);

  const { isFetching } = useQuery(
    ["FindAllUserReports", tableFilters],
    () => FindAllReports({ userId: user?._id || "", filter: tableFilters }),
    {
      onSuccess({ findAllReports }) {
        const userReportsData = findAllReports.map((item) => {
          return {
            _id: item._id ? item._id : "",
            title: item.title || "",
            assignedTo: item?.assignedTo
              ? `${item?.assignedTo?.first_name} ${item?.assignedTo?.last_name}`
              : item.assignedToFacilityRef?.facility || "",
            created_by:
              `${item.created_by.first_name} ${item.created_by.last_name}` ||
              "",
            scheduleType: item.scheduleType || "",
          };
        });
        setUserReports(userReportsData);
      },
      onError(err: any) {
        setError({
          status: true,
          title: "Failed",
          description: err?.response?.errors[0]?.message,
        });
      },
      enabled: !!user._id,
      refetchOnMount: true,
    }
  );

  const onViewClick = (id: string) => {
    push(
      {
        pathname: `/report-templates/track`,
        query: { type: "track", id },
      },
      undefined,
      { shallow: true }
    );
  };

  useEffect(() => {
    if (pageType === EReportType.InService)
      setTableFilters({
        Name: "",
        Email: "",
        Package: "",
        Role: "",
        ParkName: "",
        Intervals: "",
        Task: "",
        User: "",
        paid: "",
        Message: "",
        OrganizationName: "",
        EmailAndNotification: "",
        Dates: "",
        dynamicObjectId: "",
        reportType: EReportType.InService,
      });
  }, [pageType]);

  return (
    <>
      <Core.Alert show={error} theme="error" />
      <Core.Table
        title={EReportType.InService && "Tracking"}
        id="track-user-report"
        filterBy={["Task"]}
        tableData={userReports || []}
        columns={columns}
        isLoading={isFetching}
        shadow
        actions={actions}
        setTableFilters={setTableFilters}
        onViewClick={onViewClick}
      />
    </>
  );
};

export default TrackReportTemplates;
