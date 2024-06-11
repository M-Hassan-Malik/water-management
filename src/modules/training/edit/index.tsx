import { Box } from "@chakra-ui/react";

import { Dashboard, Training } from "@/components";

const breadcrumb = [
  { label: "Waterpark Management", link: "/dashboard" },
  { label: "Trainings", link: "/trainings" },
  { label: "Update Training" },
];

const EditTrainingPage = () => {
  return (
    <Box width="100%" p={4}>
      <Dashboard.DashboardHeader
        heading="Update Training"
        breadcrumb={breadcrumb}
      />
      <Training.Action pageType={"edit"} />
    </Box>
  );
};

export default EditTrainingPage;
