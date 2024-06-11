import { Box } from "@chakra-ui/react";

import { ActivityLogs, Dashboard } from "@/components";

const breadcrumb = [
  { label: "Waterpark Management", link: "/dashboard" },
  { label: "Activity Logs" },
  {
    label: "User Logs",
    link: "/activity-logs",
  },
  {
    label: "Track User Activity",
  },
];

const PaymentsView = () => {
  return (
    <Box width="100%" p={4}>
      <Dashboard.DashboardHeader
        heading="Track User Activity"
        breadcrumb={breadcrumb}
      />
      <ActivityLogs.UserLogsListing />
    </Box>
  );
};

export default PaymentsView;
