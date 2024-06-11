import { Box } from "@chakra-ui/react";

import { Dashboard, ReportTemplate } from "@/components";
import { EReportType } from "@/graphql/generated/graphql";

interface ReportTemplatesViewProps {}

const breadcrumb = [
  { label: "Waterpark Management", link: "/dashboard" },
  { label: "VAT Report Management Templates" },
];

const ReportTemplatesView = (_props: ReportTemplatesViewProps) => {
  return (
    <Box width="100%" p={4}>
      <Dashboard.DashboardHeader
        heading="VAT Report Management"
        breadcrumb={breadcrumb}
      />
      <ReportTemplate.ReportTemplatesListing pageType={EReportType.Vat} />
    </Box>
  );
};

export default ReportTemplatesView;
