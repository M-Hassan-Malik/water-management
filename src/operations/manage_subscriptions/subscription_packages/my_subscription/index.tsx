import { Box } from "@chakra-ui/react";

import { Dashboard, Payments } from "@/components";

const breadcrumb = [
  { label: "Waterpark Management", link: "/dashboard" },
  { label: "Manage Subscription", link: "/subscriptions" },
  { label: "My Subscription" },
];

const MySubscriptionView = () => {
  return (
    <Box w="100%" p={4}>
      <Dashboard.DashboardHeader
        heading="My Subscription"
        breadcrumb={breadcrumb}
      />
      <Payments.MySubscriptionCard />
    </Box>
  );
};

export default MySubscriptionView;
