import { Box } from "@chakra-ui/react";

import { Dashboard, Task } from "@/components";

const breadcrumb = [
  { label: "Waterpark Management", link: "/dashboard" },
  { label: "Track Tasks" },
];

const TrackTaskView = () => {
  return (
    <Box width="100%" p={4}>
      <Dashboard.DashboardHeader
        heading="Track Tasks"
        breadcrumb={breadcrumb}
      />
      <Task.Track />
    </Box>
  );
};

export default TrackTaskView;
