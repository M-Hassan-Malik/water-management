import { Box } from "@chakra-ui/react";

import { Dashboard, ManageRoles } from "@/components";

const AddRoleView = () => {
  const breadcrumb = [
    { label: "Waterpark Management", link: "/dashboard" },
    { label: "Manage Roles", link: "/manage-roles" },
    { label: "Add Role" },
  ];

  return (
    <Box w="100%" p={4}>
      <Dashboard.DashboardHeader heading="Add Role" breadcrumb={breadcrumb} />
      <Box
        borderRadius="15px"
        backgroundColor="white.100"
        boxShadow="0px 2px 5px 2px rgba(0,0,0,0.05)"
        padding="20px"
      >
        <ManageRoles.AddRoleForm pageType={"create"} />
      </Box>
    </Box>
  );
};

export default AddRoleView;
