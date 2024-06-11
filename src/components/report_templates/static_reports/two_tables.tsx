import { Box, Flex, Text, useMediaQuery } from "@chakra-ui/react";

import { Core } from "@/components";

import SRTable from "./sr_table";

interface ITwoTablesProps {
  data: {
    table1: {
      title: string;
      tableData: {
        columns: string[];
        data: {
          Date?: boolean;
          OxygenTankFillLevelpsi?: boolean;
          EquipmentProperlyOrganized?: boolean;
          AllEquipmentinGoodCondition?: boolean;
          SupervisorInitials?: boolean;
          AEDInProperLocation?: boolean;
          DateofReplacement?: boolean;
          WhatwasReplaced?: boolean;
          PadsReturnedtoproperlocation?: boolean;
          DateofRefill?: boolean;
          TankRefillLevelpsi?: boolean;
          TankReturnedtoproperlocation?: boolean;
        }[];
      };
      note?: string;
    };
    table2: {
      title: string;
      tableData: {
        columns: string[];
        data: {
          Date?: boolean;
          OxygenTankFillLevelpsi?: boolean;
          DateofRefill?: boolean;
          TankRefillLevelpsi?: boolean;
          TankReturnedtoproperlocation?: boolean;
          SupervisorInitials?: boolean;
          AEDInProperLocation?: boolean;
          EquipmentProperlyOrganized?: boolean;
          AllEquipmentinGoodCondition?: boolean;
          DateofReplacement?: boolean;
          WhatwasReplaced?: boolean;
          PadsReturnedtoproperlocation?: boolean;
        }[];
      };
      note?: string;
    };
  };
}

const TwoTables: React.FunctionComponent<ITwoTablesProps> = ({ data }) => {
  const [isScreenMax768] = useMediaQuery("(max-width: 768px)");
  return (
    <Flex
      width={"100%"}
      columnGap={"10px"}
      flexDirection={isScreenMax768 ? "column" : "row"}
    >
      <Flex
        height={"100%"}
        flexDirection={"column"}
        justifyContent={"space-between"}
      >
        <Text fontSize={"13px"} fontWeight={"bold"}>
          {data?.table1?.note}
        </Text>
        <Box backgroundColor={"blue.50"} borderRadius={"5px 5px 0 0"} py="2px">
          <Core.H6 textAlign={"center"}>{data.table1.title}</Core.H6>
        </Box>
        <SRTable data={data.table1.tableData} />
      </Flex>
      <Flex
        height={"100%"}
        flexDirection={"column"}
        justifyContent={"space-between"}
      >
        <Text fontSize={"13px"} fontWeight={"bold"}>
          {data?.table2?.note}
        </Text>
        <Box backgroundColor={"blue.50"} borderRadius={"5px 5px 0 0"} py="2px">
          <Core.H6 textAlign={"center"}>{data.table2.title}</Core.H6>
        </Box>
        <SRTable data={data.table2.tableData} />
      </Flex>
    </Flex>
  );
};

export default TwoTables;
