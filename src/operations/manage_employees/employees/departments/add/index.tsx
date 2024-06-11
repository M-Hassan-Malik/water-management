import { Box } from "@chakra-ui/react";

import { Dashboard, Departments } from "@/components";

const DepartmentAdd = () => {
  const breadcrumb = [
    { label: "Waterpark Management", link: "/dashboard" },
    { label: "Departments", link: "/departments" },
    { label: "Add Department" },
  ];

  return (
    <Box w="100%" p={4}>
      <Dashboard.DashboardHeader
        heading="Add Department"
        breadcrumb={breadcrumb}
      />
      <Box
        maxWidth={"800px"}
        borderRadius="15px"
        backgroundColor="white.100"
        boxShadow="0px 2px 5px 2px rgba(0,0,0,0.05)"
        padding="20px"
      >
        <Departments.ActionsDepartment />
      </Box>
    </Box>
  );
};

export default DepartmentAdd;
