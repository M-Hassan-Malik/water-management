import { Box } from "@chakra-ui/react";

import { Dashboard, Payments } from "@/components";

const ModificationPackageView = () => {
  const breadcrumb = [
    { label: "Waterpark Management", link: "/dashboard" },
    { label: "Manage Subscription", link: "/subscriptions" },
    { label: "Modify Package" },
  ];

  return (
    <Box w="100%" p={4}>
      <Dashboard.DashboardHeader
        heading="Modify Package"
        breadcrumb={breadcrumb}
      />
      <Box
        borderRadius="10px"
        padding="20px"
        boxShadow="0px 2px 5px 2px rgba(0,0,0,0.05)"
        backgroundColor="white.100"
      >
        <Payments.ModifySubscriptionPackageForm />
      </Box>
    </Box>
  );
};

export default ModificationPackageView;
