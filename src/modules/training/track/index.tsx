import { Box } from "@chakra-ui/react";

import { Dashboard, Training } from "@/components";

interface TrackTrainingProps {}

const breadcrumb = [
  { label: "Waterpark Management", link: "/dashboard" },
  { label: "Trainings", link: "/trainings" },
  { label: "Track" },
];

const TrackTrainingPage = (_props: TrackTrainingProps) => {
  return (
    <Box width="100%" height="100%" p={4}>
      <Dashboard.DashboardHeader heading="Track" breadcrumb={breadcrumb} />
      <Training.Track />
    </Box>
  );
};

export default TrackTrainingPage;
