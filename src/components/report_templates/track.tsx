import { useRouter } from "next/router";

import type { EReportType } from "@/graphql/generated/graphql";

import { TrackReportTemplates, UserReport } from ".";

interface ITrackReportTemplatesProps {
  pageType?: EReportType;
}

const ReportsTracking: React.FC<ITrackReportTemplatesProps> = ({
  pageType,
}) => {
  const { query } = useRouter();

  return (
    <>
      {query.type === "track" ? (
        <UserReport userReportId={String(query.id)} />
      ) : (
        <TrackReportTemplates pageType={pageType} />
      )}
    </>
  );
};

export default ReportsTracking;
