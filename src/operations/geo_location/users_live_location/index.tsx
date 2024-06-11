import { Box } from "@chakra-ui/react";

import { Dashboard, UsersLiveLocation } from "@/components";

const UsersLiveLocationMainView = () => {
  const breadcrumb = [
    { label: "Waterpark Management", link: "/dashboard" },
    { label: "Users" },
    { label: "Users Live Location" },
  ];

  return (
    <Box w="100%" p={4}>
      <Dashboard.DashboardHeader
        heading="Users Live Location"
        breadcrumb={breadcrumb}
      />
      <UsersLiveLocation.UsersLiveLocation />
    </Box>
  );
};

export default UsersLiveLocationMainView;
