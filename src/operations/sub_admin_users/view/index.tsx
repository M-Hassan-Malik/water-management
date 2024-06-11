import { Box } from "@chakra-ui/react";

import { Dashboard, SubAdminUsers } from "@/components";

const breadcrumb = [
  { label: "Waterpark Management", link: "/dashboard" },
  { label: "Client Admin Users", link: "/client-admins" },
  { label: "View Client Admin" },
];

const ViewSubAdminView = () => {
  return (
    <Box w="100%" p={4}>
      <Dashboard.DashboardHeader heading={"View"} breadcrumb={breadcrumb} />
      <Box
        borderRadius="10px"
        padding="20px"
        boxShadow="0px 2px 5px 2px rgba(0,0,0,0.05)"
        backgroundColor="white.100"
      >
        <SubAdminUsers.AddSubAdminForm pageType={"view"} />
      </Box>
    </Box>
  );
};

export default ViewSubAdminView;
