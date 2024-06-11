import { Box } from "@chakra-ui/react";

import { Dashboard, ManageAdminUsers } from "@/components";

const breadcrumb = [
  { label: "Waterpark Management", link: "/dashboard" },
  { label: "Manage Admin Users", link: "/admin-manage-users" },
  { label: "Manage Users" },
];

const MangeUsersMainView = () => {
  return (
    <Box w="100%" p={4}>
      <Dashboard.DashboardHeader heading="Users" breadcrumb={breadcrumb} />
      <ManageAdminUsers.UserListing />
    </Box>
  );
};

export default MangeUsersMainView;
