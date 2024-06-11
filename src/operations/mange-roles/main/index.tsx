import { Box } from "@chakra-ui/react";

import { Dashboard, ManageRoles } from "@/components";

const breadcrumb = [
  { label: "Waterpark Management", link: "/dashboard" },
  { label: "Roles List" },
];
const MangeRolesMainView = () => {
  return (
    <Box w="100%" p={4}>
      <Dashboard.DashboardHeader heading="Roles List" breadcrumb={breadcrumb} />
      <ManageRoles.RoleListing />
    </Box>
  );
};

export default MangeRolesMainView;
