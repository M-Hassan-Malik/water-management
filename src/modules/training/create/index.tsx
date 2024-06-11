import { Box } from "@chakra-ui/react";

import { Dashboard, Training } from "@/components";

const breadcrumb = [
  { label: "Waterpark Management", link: "/dashboard" },
  { label: "Trainings", link: "/trainings" },
  { label: "Create Training" },
];

const CreateTrainingPage = () => {
  return (
    <Box width="100%" p={4}>
      <Dashboard.DashboardHeader
        heading="Create Training"
        breadcrumb={breadcrumb}
      />
      <Training.Action pageType={"create"} />
    </Box>
  );
};

export default CreateTrainingPage;
