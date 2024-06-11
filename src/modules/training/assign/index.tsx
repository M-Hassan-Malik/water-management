import { Box } from "@chakra-ui/react";

import { Dashboard, Training } from "@/components";

const breadcrumb = [
  { label: "Waterpark Management", link: "/dashboard" },
  { label: "Assign" },
];

const TrainingAssignPage = () => {
  return (
    <Box width="100%" p={4}>
      <Dashboard.DashboardHeader heading="Assign" breadcrumb={breadcrumb} />
      <Training.Assign />
    </Box>
  );
};

export default TrainingAssignPage;
