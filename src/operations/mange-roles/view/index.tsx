import { Box } from "@chakra-ui/react";

import { Dashboard, ManageRoles } from "@/components";

const ViewRoleView = () => {
  const breadcrumb = [
    { label: "Waterpark Management", link: "/dashboard" },
    { label: "Manage Roles", link: "/manage-roles" },
    { label: "View Role" },
  ];

  return (
    <Box w="100%" p={4}>
      <Dashboard.DashboardHeader
        heading="Role Details"
        breadcrumb={breadcrumb}
      />
      <Box
        borderRadius="15px"
        backgroundColor="white.100"
        boxShadow="0px 2px 5px 2px rgba(0,0,0,0.05)"
        padding="20px"
      >
        <ManageRoles.AddRoleForm pageType={"view"} />
      </Box>
    </Box>
  );
};

export default ViewRoleView;
