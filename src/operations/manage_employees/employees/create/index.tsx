import { Box } from "@chakra-ui/react";

import { Dashboard, Employees } from "@/components";

const CreateEmployeeView = () => {
  const breadcrumb = [
    { label: "Waterpark Management", link: "/dashboard" },
    { label: "Users", link: "/employees" },
    { label: "Add User" },
  ];

  return (
    <Box w="100%" p={4}>
      <Dashboard.DashboardHeader heading="Add User" breadcrumb={breadcrumb} />
      <Box
        borderRadius="10px"
        padding="20px"
        boxShadow="0px 2px 5px 2px rgba(0,0,0,0.05)"
        backgroundColor="white.100"
      >
        <Employees.EmployeeForm pageType={"create"} />
      </Box>
    </Box>
  );
};

export default CreateEmployeeView;
