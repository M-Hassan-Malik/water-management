import { Box } from "@chakra-ui/react";

import { Dashboard } from "@/components";

const PaymentDetails = () => {
  const breadcrumb = [
    { label: "Waterpark Management", link: "/dashboard" },
    {
      label: "Report Templates",
      link: "/report-templates",
    },

    {
      label: "Details",
    },
  ];

  return (
    <Box width="100%" p={4}>
      <Dashboard.DashboardHeader heading="Details" breadcrumb={breadcrumb} />
    </Box>
  );
};

export default PaymentDetails;
