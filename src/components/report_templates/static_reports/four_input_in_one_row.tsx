import { Flex, FormControl, FormLabel, useMediaQuery } from "@chakra-ui/react";

import { Core } from "@/components";

interface IFourInputInOneRowProps {
  data: {
    input1: string;
    input2?: string;
    input3?: string;
    input4?: string;
  };
}

const FourInputInOneRow: React.FunctionComponent<IFourInputInOneRowProps> = ({
  data,
}) => {
  const [isScreenMax768] = useMediaQuery("(max-width: 768px)");
  return (
    <Flex
      width="100%"
      justifyContent={"space-between"}
      columnGap={"5px"}
      flexDirection={isScreenMax768 ? "column" : "row"}
    >
      <Flex width="100%" flexDirection={"column"} flex={2}>
        <FormControl width={isScreenMax768 ? "50%" : "100%"}>
          <FormLabel textAlign={"center"}>{data.input1}</FormLabel>
          <Core.Input />
        </FormControl>
      </Flex>
      <Flex width="100%" flexDirection={"column"} flex={2}>
        <Flex width="100%" flexDirection={"column"}>
          <FormControl display={"flex"} flexDirection={"row"}>
            <FormLabel textAlign={"center"}>{data.input2}</FormLabel>
            <Core.Input />
          </FormControl>
        </Flex>
        <Flex width="100%" flexDirection={"column"} flex={1}>
          <FormControl display={"flex"} flexDirection={"row"}>
            <FormLabel textAlign={"center"}>{data.input3}</FormLabel>
            <Core.Input />
          </FormControl>
        </Flex>
      </Flex>
      <Flex width="100%" flexDirection={"column"} flex={1}>
        <FormControl width={isScreenMax768 ? "50%" : "100%"}>
          <FormLabel textAlign={"center"}>{data.input3}</FormLabel>
          <Core.Input />
        </FormControl>
      </Flex>
    </Flex>
  );
};

export default FourInputInOneRow;
