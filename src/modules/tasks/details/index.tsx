import { Box } from "@chakra-ui/react";

import { Dashboard } from "@/components";
import { TaskDetail } from "@/components/core";

const breadcrumb = [
  { label: "Waterpark Management", link: "/dashboard" },
  { label: "Track Tasks", link: "/tasks/track" },
  { label: "Task Details" },
];

interface ITaskDetailsProps {}

const TaskDetails: React.FunctionComponent<ITaskDetailsProps> = () => {
  return (
    <Box width="100%" p={4}>
      <Dashboard.DashboardHeader
        heading="Task Details"
        breadcrumb={breadcrumb}
      />
      <TaskDetail />
    </Box>
  );
};

export default TaskDetails;
