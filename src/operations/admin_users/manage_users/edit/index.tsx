import { Box } from "@chakra-ui/react";

import { Dashboard, ManageAdminUsers } from "@/components";

interface ManageUsersEditProps {}

const ManageUsersEdit = (_props: ManageUsersEditProps) => {
  const breadcrumb = [
    { label: "Waterpark Management", link: "/dashboard" },
    { label: "Manage Client Admin Users", link: "/admin-manage-users" },
    { label: "Manage Users", link: "/admin-manage-users" },
    { label: "Edit User" },
  ];
  return (
    <Box width="100%" p={4}>
      <Dashboard.DashboardHeader heading="Edit User" breadcrumb={breadcrumb} />
      <Box
        borderRadius="10px"
        padding="20px"
        boxShadow="0px 2px 5px 2px rgba(0,0,0,0.05)"
        backgroundColor="white.500"
      >
        <ManageAdminUsers.AddUserForm />
      </Box>
    </Box>
  );
};

export default ManageUsersEdit;
