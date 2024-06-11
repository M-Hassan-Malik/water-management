import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";

import { AssignUsers, Dashboard } from "@/components";

const breadcrumb = [
  { label: "Waterpark Management", link: "/dashboard" },
  { label: "Report Templates", link: "/report-templates" },
  { label: "Assign Report Templates" },
];

const AssignReportTemplate = () => {
  const { query } = useRouter();

  return (
    <Box width="100%" p={4}>
      <Dashboard.DashboardHeader
        breadcrumb={breadcrumb}
        heading="Assign Report Template"
      />
      <AssignUsers.AssignUsers reportId={String(query.id)} />
    </Box>
  );
};

export default AssignReportTemplate;
