import { Box } from "@chakra-ui/react";

import { Dashboard, ReportTemplate } from "@/components";
import { EReportType } from "@/graphql/generated/graphql";

interface ReportTemplatesViewProps {}

const breadcrumb = [
  { label: "Waterpark Management", link: "/dashboard" },
  { label: "Standard Report Templates" },
];

const ReportTemplatesView = (_props: ReportTemplatesViewProps) => {
  return (
    <Box width="100%" p={4}>
      <Dashboard.DashboardHeader
        heading="Report Templates"
        breadcrumb={breadcrumb}
      />
      <ReportTemplate.ReportTemplatesListing pageType={EReportType.Standard} />
    </Box>
  );
};

export default ReportTemplatesView;
