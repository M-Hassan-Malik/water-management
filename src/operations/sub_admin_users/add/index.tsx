import { Box } from "@chakra-ui/react";

import { Dashboard, SubAdminUsers } from "@/components";

const breadcrumb = [
  { label: "Waterpark Management", link: "/dashboard" },
  { label: "Client Admin Users", link: "/client-admins" },
  { label: "Add Client Admin" },
];

const AddSubAdminView = () => {
  return (
    <Box w="100%" p={4}>
      <Dashboard.DashboardHeader
        heading="Add Client Admin"
        breadcrumb={breadcrumb}
      />
      <Box
        borderRadius="10px"
        padding="20px"
        boxShadow="0px 2px 5px 2px rgba(0,0,0,0.05)"
        backgroundColor="white.100"
      >
        <SubAdminUsers.AddSubAdminForm pageType={"create"} />
      </Box>
    </Box>
  );
};

export default AddSubAdminView;
