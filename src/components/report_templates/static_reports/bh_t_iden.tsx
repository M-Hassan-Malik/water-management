import { Box, Flex, Text, useMediaQuery } from "@chakra-ui/react";
import * as React from "react";

import { Core } from "@/components";

interface IBH_T_IDENProps {
  data: {
    title: string;
    description: string;
    gradient?: string;
    innerShadow?: string;
  };
}

const BH_T_IDEN: React.FunctionComponent<IBH_T_IDENProps> = ({ data }) => {
  const [isScreenMax768] = useMediaQuery("(max-width: 768px)");
  return (
    <>
      {/* row 1 */}
      <Flex
        width="100%"
        columnGap={"10px"}
        flexDirection={isScreenMax768 ? "column-reverse" : "row"}
        // justifyContent={isScreenMax768 ? "center" : "start"}
        alignItems={isScreenMax768 ? "center" : "start"}
      >
        <Flex flexDirection={"column"}>
          <Box>
            <Core.H3 textAlign={"center"}>{data.title}</Core.H3>
          </Box>
          <Box>
            <Text fontSize={"14px"} lineHeight={"18px"}>
              {data.description}
            </Text>
          </Box>
        </Flex>
        <Box
          background={data?.gradient}
          boxShadow={data?.innerShadow}
          height="170px"
          minHeight="170px"
          width="170px"
          minWidth="170px"
          borderRadius={"10px"}
        ></Box>
      </Flex>
    </>
  );
};

export default BH_T_IDEN;
