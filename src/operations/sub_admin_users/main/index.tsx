import { Box } from "@chakra-ui/react";

import { Dashboard, SubAdminUsers } from "@/components";

interface SubAdminUsersViewProps {}

const breadcrumb = [
  { label: "Waterpark Management", link: "/dashboard" },
  { label: "Client Admin" },
];

const SubAdminUsersView = (_props: SubAdminUsersViewProps) => {
  return (
    <Box w="100%" p={4}>
      <Dashboard.DashboardHeader
        heading="Client Admin Users"
        breadcrumb={breadcrumb}
      />
      <SubAdminUsers.SubAdminUsersListing />
    </Box>
  );
};

export default SubAdminUsersView;
