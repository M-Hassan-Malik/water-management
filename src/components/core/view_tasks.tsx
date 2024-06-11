import {
  Box,
  // Flex,
  // Heading,
  SimpleGrid,
  // Spacer,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
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
  const incompletedTasks = allTasks.filter(
    (task: any) => task.currentStatus !== "completed"
  );
  const completedTasks = allTasks.filter(
    (task: any) => task.currentStatus === "completed"
  );
  return (
    <>
      <Tabs maxWidth={"600px"} mx={"auto"}>
        <TabList border={"none"}>
          <Tab
            fontSize={"sm"}
            pt={"5px"}
            pb={"2px"}
            px={"20px"}
            borderTopRadius={"10px"}
            borderBottomRadius={"0px"}
            _selected={{ color: "white", bg: "red.300" }}
          >
            Incompleted
          </Tab>
          <Tab
            fontSize={"sm"}
            pt={"5px"}
            pb={"2px"}
            px={"20px"}
            borderTopRadius={"10px"}
            borderBottomRadius={"0px"}
            _selected={{ color: "white", bg: "green.400" }}
          >
            Completed
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel px="0" pt="15px" m="0">
            <Box
              // p="20px"
              // borderWidth={"1px"}
              // borderStyle="solid"
              // borderColor={"danger.200"}
              borderRadius="5px"
              width={"100%"}
            >
              {/* <Heading size={"md"} as="h3" mb="20px" color={"red"}>
              Incompleted
            </Heading> */}
              <SimpleGrid
                spacing={4}
                templateColumns="repeat(auto-fill, minmax(50%, 2fr))"
              >
                {incompletedTasks?.map((task: any, index: any) => {
                  return <Core.TaskCard key={index * 5} task={task} />;
                })}
              </SimpleGrid>
            </Box>
          </TabPanel>
          <TabPanel px="0" pt="15px" m="0">
            <Box
              // p="20px"
              // borderWidth={"1px"}
              // borderStyle="solid"
              // borderColor={"green.200"}
              borderRadius="5px"
              width={"100%"}
            >
              {/* <Heading size={"md"} as="h3" mb="20px" color={"green"}>
              Completed
            </Heading> */}
              <SimpleGrid
                spacing={4}
                templateColumns="repeat(auto-fill, minmax(100%, 1fr))"
              >
                {completedTasks?.map((task: any, index: any) => {
                  return <Core.TaskCard key={index * 5} task={task} />;
                })}
              </SimpleGrid>
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default ViewTasks;
