import { Box } from "@chakra-ui/react";

import { Dashboard, Training } from "@/components";

interface TaskMainViewProps {}

const breadcrumb = [
  { label: "Waterpark Management", link: "/dashboard" },
  { label: "Trainings" },
];

const TaskMainView = (_props: TaskMainViewProps) => {
  return (
    <Box width="100%" p={4}>
      <Dashboard.DashboardHeader
        heading="Trainings"
        breadcrumb={breadcrumb}
        button={{ name: "Add Training", link: "/trainings/add" }}
      />
      <Training.Training />
    </Box>
  );
};

export default TaskMainView;
