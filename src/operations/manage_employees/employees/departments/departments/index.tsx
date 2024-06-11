import { Box } from "@chakra-ui/react";

import { Dashboard, Departments } from "@/components";

const breadcrumb = [
  { label: "Waterpark Management", link: "/dashboard" },
  { label: "Departments" },
];
const MangeRolesMainView = () => {
  return (
    <Box w="100%" p={4}>
      <Dashboard.DashboardHeader
        heading="Departments"
        breadcrumb={breadcrumb}
      />
      <Departments.DepartmentListing />
    </Box>
  );
};

export default MangeRolesMainView;
