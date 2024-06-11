import { Box } from "@chakra-ui/react";

import ViewTasks from "@/components/task/view_tasks";

import { Dashboard } from "..";

// const dropdwonOptions = ["Completed", "Pending", "In Process"];
const breadcrumb = [
  { label: "Waterpark Management", link: "/dashboard" },
  { label: "All Tasks" },
];

interface IViewTasksProps {}

const ListAllTasks: React.FunctionComponent<IViewTasksProps> = () => {
  // const handleFilter = (dropdwonOption: any) => {
  //   console.log("dropdwonOption", dropdwonOption);
  // };
  return (
    <Box width="100%" p={4}>
      <Dashboard.DashboardHeader
        heading="All Tasks"
        breadcrumb={breadcrumb}
        // dropdwonOptions={dropdwonOptions}
        // defaultName="Filter By"
        button={{ name: "Add Task", link: "/tasks/add/" }}
        // handleFilter={handleFilter}
      />
      <ViewTasks />
    </Box>
  );
};

export default ListAllTasks;
