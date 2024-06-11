import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";

import { Core } from "@/components";

interface IThreeLinesBoxTextWithTwoInputsProps {
  data: {
    text1: string;
    text2: string;
    text3: string;
    headding: string;
    input_first: string;
    input_second: string;
  };
}

const ThreeLinesBoxTextWithTwoInputs: React.FunctionComponent<
  IThreeLinesBoxTextWithTwoInputsProps
> = ({ data }) => {
  const [isScreenMax768] = useMediaQuery("(max-width: 768px)");
  return (
    <>
      {/* row 2 */}
      <Flex
        width="100%"
        justifyContent={"between"}
        alignItems={"center"}
        flexDirection={isScreenMax768 ? "column" : "row"}
        // flexDirection={"column"}
        gap={"5px"}
      >
        <Box
          textAlign={"center"}
          border={"1px solid"}
          borderColor={"blue.400"}
          borderRadius={"10px"}
          // px="5%"
          flex={"6"}
        >
          <Text fontSize={"12px"}>{data.text1}</Text>
          <Text fontSize={"12px"} textTransform={"uppercase"}>
            {data.text2}
          </Text>
          <Text fontSize={"12px"}>{data.text3}</Text>
        </Box>
        <Flex
          width="100%"
          justifyContent={"between"}
          alignItems={"center"}
          gap={"5px"}
          flex="4"
        >
          <Text fontWeight={"bold"} fontSize={"12px"} lineHeight={"15px"}>
            {data.headding}
          </Text>
          <Flex flexDirection={"column"} flex="1">
            <FormControl>
              <FormLabel textAlign={"center"} fontSize={"10px"}>
                {data.input_first}
              </FormLabel>
              <Core.Input />
            </FormControl>
          </Flex>
          <Flex flexDirection={"column"} flex="1">
            <FormControl>
              <FormLabel textAlign={"center"} fontSize={"10px"}>
                {data.input_second}
              </FormLabel>
              <Core.Input />
            </FormControl>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default ThreeLinesBoxTextWithTwoInputs;
