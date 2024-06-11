import { Box } from "@chakra-ui/react";

import { Dashboard, ReportTemplate } from "@/components";

interface ReportTemplatesViewProps {}

const breadcrumb = [
  { label: "Waterpark Management", link: "/dashboard" },
  { label: "In-Service Training" },
];

const InServiceReportTemplates = (_props: ReportTemplatesViewProps) => {
  return (
    <Box width="100%" p={4}>
      <Dashboard.DashboardHeader
        heading="In-Service Training"
        breadcrumb={breadcrumb}
      />
      <ReportTemplate.InServiceTables />
    </Box>
  );
};

export default InServiceReportTemplates;
