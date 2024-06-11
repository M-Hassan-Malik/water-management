import { Box } from "@chakra-ui/react";

import { Dashboard, ReportTemplate } from "@/components";

const breadcrumb = [
  { label: "Waterpark Management", link: "/dashboard" },
  { label: "Report Templates", link: "/report-templates" },
  { label: "View" },
];

const ViewReportTemplate = () => {
  return (
    <Box width="100%" p={4}>
      <Dashboard.DashboardHeader
        breadcrumb={breadcrumb}
        heading="Report Template"
      />
      <ReportTemplate.ReportForm pageType={"view"} />
    </Box>
  );
};

export default ViewReportTemplate;
