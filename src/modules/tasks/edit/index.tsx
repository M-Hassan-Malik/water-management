import { Box } from "@chakra-ui/react";

import { Dashboard } from "@/components";
import TaskActions from "@/components/task/action";

const UploaderMainView = () => {
  const breadcrumb = [
    { label: "Waterpark Management", link: "/dashboard" },
    { label: "All Tasks", link: "/all-tasks" },
    { label: "Update Task" },
  ];

  return (
    <Box width="100%" p={4}>
      <Dashboard.DashboardHeader
        heading="Update Task"
        breadcrumb={breadcrumb}
      />
      <Box
        maxW={"800px"}
        borderRadius="10px"
        backgroundColor="white.100"
        boxShadow="0px 2px 5px 2px rgba(0,0,0,0.05)"
        padding="10px"
      >
        <TaskActions pageType={"edit"} />
      </Box>
    </Box>
  );
};

export default UploaderMainView;
