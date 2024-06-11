import { Box } from "@chakra-ui/react";

import { Dashboard, Payments } from "@/components";

const Payment = () => {
  const breadcrumb = [
    { label: "Waterpark Management", link: "/dashboard" },
    { label: "Payment" },
  ];

  return (
    <Box w="100%" p={4}>
      <Dashboard.DashboardHeader heading="Payment" breadcrumb={breadcrumb} />
      <Box
        borderRadius="10px"
        padding="20px"
        boxShadow="0px 2px 5px 2px rgba(0,0,0,0.05)"
        backgroundColor="white.100"
        maxWidth={"700px"}
        mx={"auto"}
      >
        <Payments.Payment />
      </Box>
    </Box>
  );
};

export default Payment;
