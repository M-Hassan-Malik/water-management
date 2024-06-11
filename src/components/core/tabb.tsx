import {
  Box,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import * as React from "react";

import { Core } from "..";

interface ITabbProps {
  tabsDetail: {
    tabsName: string[];
    tabsContent: any;
  };
}

const Tabb: React.FunctionComponent<ITabbProps> = ({ tabsDetail }) => {
  return (
    <Tabs variant="enclosed" colorScheme="#fff" h="100%">
      <TabList px="18px">
        {tabsDetail.tabsName.map((tabName: any, index: any) => {
          return (
            <Tab key={index * 9} fontSize="12px">
              {tabName}
            </Tab>
          );
        })}
      </TabList>
      <TabPanels h="100%">
        {tabsDetail.tabsContent.map((tabContent: any, index: any) => {
          return (
            <TabPanel key={index * 10}>
              {tabContent?.informations && (
                <Flex key={index + 11} columnGap={"22px"}>
                  {tabContent?.informations?.data.map((dat: any, ind: any) => {
                    return (
                      <Box
                        key={ind + 12}
                        my="5px"
                        pb="4px"
                        pl="12px"
                        borderLeft={"2px solid"}
                        borderColor={"gray.200"}
                      >
                        <Box
                          as="span"
                          fontSize="10px"
                          fontWeight="bold"
                          textTransform="uppercase"
                          color="gray.400"
                          letterSpacing={".4px"}
                        >
                          {dat.title}
                        </Box>
                        <Box fontSize="14px">{dat.value}</Box>
                      </Box>
                    );
                  })}
                </Flex>
              )}
              {tabContent?.table && (
                <Core.Table
                  id=""
                  columns={tabContent.table.columns}
                  tableData={tabContent.table.rowsData}
                />
              )}
            </TabPanel>
          );
        })}
      </TabPanels>
    </Tabs>
  );
};

export default Tabb;
