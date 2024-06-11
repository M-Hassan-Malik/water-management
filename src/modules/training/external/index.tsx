import { Box } from "@chakra-ui/react";

import { Dashboard, Training } from "@/components";

interface ExternalTrainingProps {}

const breadcrumb = [
  { label: "Waterpark Management", link: "/dashboard" },
  { label: "Trainings", link: "/trainings" },
  { label: "Rosters" },
];

const ExternalTrainingsPage = (_props: ExternalTrainingProps) => {
  return (
    <Box width="100%" p={4}>
      <Dashboard.DashboardHeader heading="Rosters" breadcrumb={breadcrumb} />
      <Training.External />
    </Box>
  );
};

export default ExternalTrainingsPage;
