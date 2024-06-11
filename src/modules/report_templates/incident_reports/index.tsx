import { Box } from "@chakra-ui/react";

import { Dashboard, ReportTemplate } from "@/components";
import { EReportType } from "@/graphql/generated/graphql";

interface ReportTemplatesViewProps {}

const breadcrumb = [
  { label: "Waterpark Management", link: "/dashboard" },
  { label: "Incident Report Templates" },
];

const ReportTemplatesView = (_props: ReportTemplatesViewProps) => {
  return (
    <Box width="100%" p={4}>
      <Dashboard.DashboardHeader
        heading="Incident Reports"
        breadcrumb={breadcrumb}
      />
      <ReportTemplate.ReportTemplatesListing pageType={EReportType.Incident} />
    </Box>
  );
};

export default ReportTemplatesView;
