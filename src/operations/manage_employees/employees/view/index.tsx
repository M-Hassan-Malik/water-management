import { Box } from "@chakra-ui/react";

import { Dashboard, Employees } from "@/components";

const ViewEmployee = () => {
  const breadcrumb = [
    { label: "Waterpark Management", link: "/dashboard" },
    { label: "Users", link: "/employees" },
    { label: "Details" },
  ];

  return (
    <Box w="100%" p={4}>
      <Dashboard.DashboardHeader heading="Details" breadcrumb={breadcrumb} />
      <Box
        borderRadius="10px"
        padding="20px"
        boxShadow="0px 2px 5px 2px rgba(0,0,0,0.05)"
        backgroundColor="white.100"
      >
        <Employees.EmployeeForm pageType={"view"} />
      </Box>
    </Box>
  );
};

export default ViewEmployee;
