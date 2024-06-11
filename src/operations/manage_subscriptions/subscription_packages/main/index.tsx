import { Box } from "@chakra-ui/react";

import { Dashboard, Payments } from "@/components";

const UploaderMainView = () => {
  const breadcrumb = [
    { label: "Waterpark Management", link: "/dashboard" },
    { label: "Manage Subscription", link: "/subscriptions" },
    { label: "Subscription Packages" },
  ];
  return (
    <Box w="100%" p={4}>
      <Dashboard.DashboardHeader
        heading="Subscription Packages"
        breadcrumb={breadcrumb}
      />
      <Payments.ListSubscriptionPackage />
    </Box>
  );
};

export default UploaderMainView;
