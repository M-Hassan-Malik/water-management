import { Box } from "@chakra-ui/react";

import { Dashboard, Employees } from "@/components";

const UploaderMainView = () => {
  const breadcrumb = [
    { label: "Waterpark Management", link: "/dashboard" },
    { label: "Manage Users", link: "/employees" },
    { label: "Users" },
  ];
  return (
    <Box w="100%" p={4}>
      <Dashboard.DashboardHeader heading="Users" breadcrumb={breadcrumb} />
      <Employees.ListEmployees />
    </Box>
  );
};

export default UploaderMainView;
