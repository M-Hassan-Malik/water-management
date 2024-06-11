import { Box, Flex, Heading, SimpleGrid, Spacer } from "@chakra-ui/react";
import * as React from "react";

import { Core } from "..";

interface IViewTasksProps {
  allTasks: any;
  // selectedOption?: string;
}

const ViewTasks: React.FunctionComponent<IViewTasksProps> = ({
  allTasks,
  // selectedOption,
}) => {
  const uncompletedTasks = allTasks.filter(
    (task: any) => task.currentStatus !== "completed"
  );
  const completedTasks = allTasks.filter(
    (task: any) => task.currentStatus === "completed"
  );
  return (
    // <SimpleGrid
    //   spacing={4}
    //   templateColumns="repeat(auto-fill, minmax(100%, 1fr))"
    // >
    <Flex flexDirection={"column"} rowGap={"20px"}>
      <Box
        p="20px"
        backgroundColor={"gray.300"}
        borderRadius="5px"
        width={"100%"}
        // borderLeftWidth={'3px'} borderColor={"red.400"}
      >
        <Heading size={"md"} as="h3" mb="20px" color={"red.400"}>
          Uncompleted
        </Heading>
        <SimpleGrid
          spacing={4}
          templateColumns="repeat(auto-fill, minmax(100%, 1fr))"
        >
          {uncompletedTasks?.map((task: any, index: any) => {
            return <Core.TaskCard key={index * 5} task={task} />;
          })}
        </SimpleGrid>
      </Box>
      <Spacer />
      <hr />
      <Spacer />
      <Box
        p="20px"
        backgroundColor={"gray.300"}
        borderRadius="5px"
        width={"100%"}
      >
        <Heading size={"md"} as="h3" mb="20px" color={"green"}>
          Completed
        </Heading>
        <SimpleGrid
          spacing={4}
          templateColumns="repeat(auto-fill, minmax(100%, 1fr))"
        >
          {completedTasks?.map((task: any, index: any) => {
            return <Core.TaskCard key={index * 5} task={task} />;
          })}
        </SimpleGrid>
      </Box>
    </Flex>

    // </SimpleGrid>
  );
};

export default ViewTasks;
