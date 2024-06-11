import { Box } from "@chakra-ui/react";

import { Dashboard, ReportTemplate } from "@/components";
import { EReportType } from "@/graphql/generated/graphql";

interface ReportTemplatesViewProps {}

const breadcrumb = [
  { label: "Waterpark Management", link: "/dashboard" },
  { label: "Inventory Management Templates" },
];

const ReportTemplatesView = (_props: ReportTemplatesViewProps) => {
  return (
    <Box width="100%" p={4}>
      <Dashboard.DashboardHeader
        heading="Inventory Management"
        breadcrumb={breadcrumb}
      />
      <ReportTemplate.ReportTemplatesListing pageType={EReportType.Inventory} />
    </Box>
  );
};

export default ReportTemplatesView;
