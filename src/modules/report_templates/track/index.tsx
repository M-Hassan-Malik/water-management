import { Box } from "@chakra-ui/react";

import { Dashboard, ReportTemplate } from "@/components";

interface ReportTemplatesViewProps {}

const breadcrumb = [
  { label: "Waterpark Management", link: "/dashboard" },
  { label: "Report Templates", link: "/report-templates" },
  { label: "Track" },
];

const ReportTemplatesView = (_props: ReportTemplatesViewProps) => {
  return (
    <Box width="100%" p={4}>
      <Dashboard.DashboardHeader
        heading="Track Assigned Reports"
        breadcrumb={breadcrumb}
      />
      <ReportTemplate.Track />
    </Box>
  );
};

export default ReportTemplatesView;
