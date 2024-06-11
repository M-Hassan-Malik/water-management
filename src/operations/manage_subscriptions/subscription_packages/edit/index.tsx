import { Box } from "@chakra-ui/react";

import { Dashboard, Payments } from "@/components";

const EditPackageView = () => {
  const breadcrumb = [
    { label: "Waterpark Management", link: "/dashboard" },
    { label: "Manage Subscription", link: "/subscriptions" },
    { label: "Edit Package" },
  ];

  return (
    <Box w="100%" p={4}>
      <Dashboard.DashboardHeader
        heading="Edit Package"
        breadcrumb={breadcrumb}
      />
      <Box
        borderRadius="10px"
        padding="20px"
        boxShadow="0px 2px 5px 2px rgba(0,0,0,0.05)"
        backgroundColor="white.100"
      >
        <Payments.SubscriptionPackageForm pageType={"edit"} />
      </Box>
    </Box>
  );
};

export default EditPackageView;
