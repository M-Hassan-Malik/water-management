import { Box } from "@chakra-ui/react";

import { ActivityLogs, Dashboard } from "@/components";

const PaymentDetails = () => {
  const breadcrumb = [
    { label: "Waterpark Management", link: "/dashboard" },
    { label: "Activity Logs" },
    { label: "User Logs", link: "/activity-logs" },
    { label: "Track Employee Activity" },
    { label: "Employee Log Details" },
  ];

  return (
    <Box width="100%" p={4}>
      <Dashboard.DashboardHeader
        heading="Employee Log Details"
        breadcrumb={breadcrumb}
      />
      <ActivityLogs.EmployeeLogDetails />
    </Box>
  );
};

export default PaymentDetails;
