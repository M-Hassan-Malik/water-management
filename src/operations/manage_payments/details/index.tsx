import { Box } from "@chakra-ui/react";

import { Dashboard, Payments } from "@/components";

const PaymentDetails = () => {
  const breadcrumb = [
    { label: "Waterpark Management", link: "/dashboard" },
    { label: "Manage Payment", link: "/payment-records/track" },
    {
      label: "Track Records",
      link: "/payment-records/track",
    },
    {
      label: "Track Payments",
      link: "/track/payments",
    },
    {
      label: "Details",
    },
  ];

  return (
    <Box w="100%" p={4}>
      <Dashboard.DashboardHeader
        heading="Payment Details"
        breadcrumb={breadcrumb}
      />
      <Payments.PaymentDetailsCard />
    </Box>
  );
};

export default PaymentDetails;
