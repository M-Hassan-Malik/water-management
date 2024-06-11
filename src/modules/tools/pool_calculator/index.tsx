import { Box } from "@chakra-ui/react";

import { Dashboard, PoolCalculator } from "@/components";

interface PoolCalculatorMainViewProps {}
const PoolCalculatorMainView = (_props: PoolCalculatorMainViewProps) => {
  const breadcrumb = [
    { label: "Waterpark Management", link: "/dashboard" },
    { label: "Pool Calculator" },
  ];
  return (
    <Box w="100%" p={4}>
      <Dashboard.DashboardHeader
        heading="Pool Calculator"
        breadcrumb={breadcrumb}
      />
      <Box
        borderRadius="10px"
        padding="20px"
        boxShadow="0px 2px 5px 2px rgba(0,0,0,0.05)"
        backgroundColor="white.100"
        maxWidth={"1200px"}
        width={"100%"}
      >
        <PoolCalculator.Calculator />
      </Box>
    </Box>
  );
};

export default PoolCalculatorMainView;
