// this page is for client admin
import { Box } from "@chakra-ui/react";

import { Dashboard, TrackSubAdminPaymentRecords } from "@/components";

const breadcrumb = [
  { label: "Waterpark Management", link: "/dashboard" },
  {
    label: "PaymentLogs",
  },
];

const PaymentLogsView = () => {
  return (
    <Box w="100%" p={4}>
      <Dashboard.DashboardHeader
        heading="Track Client-Admin Payment Records"
        breadcrumb={breadcrumb}
      />
      <TrackSubAdminPaymentRecords.PaymentLogListing />
    </Box>
  );
};

export default PaymentLogsView;
