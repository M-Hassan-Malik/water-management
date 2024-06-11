import { Box } from "@chakra-ui/react";

import { ActivityLogs, Dashboard } from "@/components";

const ActivityLogsMainView = () => {
  const breadcrumb = [
    { label: "Waterpark Management", link: "/dashboard" },
    { label: "Activity Logs" },
    {
      label: "User Logs",
    },
  ];
  return (
    <Box width="100%" p={4}>
      <Dashboard.DashboardHeader heading="User Logs" breadcrumb={breadcrumb} />
      <ActivityLogs.ActivityLogsListing />
    </Box>
  );
};

export default ActivityLogsMainView;
