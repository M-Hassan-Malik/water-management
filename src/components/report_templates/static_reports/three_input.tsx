import { Flex, FormControl, FormLabel, useMediaQuery } from "@chakra-ui/react";

import { Core } from "@/components";

interface IThreeInputProps {
  data: {
    input1: string;
    input2?: string;
    input3?: string;
  };
}

const ThreeInput: React.FunctionComponent<IThreeInputProps> = ({ data }) => {
  const [isScreenMax768] = useMediaQuery("(max-width: 768px)");
  return (
    <>
      {/* row 2 */}
      <Flex
        width="100%"
        justifyContent={"space-between"}
        columnGap={"5px"}
        flexDirection={isScreenMax768 ? "column-reverse" : "row"}
      >
        {data?.input1 && (
          <Flex
            width="100%"
            // flexDirection={"column"}
            // flexDirection={isScreenMax768 ? "column" : "row"}
          >
            <FormControl>
              <FormLabel textAlign={"center"}>{data.input1}</FormLabel>
              <Core.Input />
            </FormControl>
          </Flex>
        )}
        {data?.input2 && (
          <Flex
            width="100%"
            flexDirection={"column"}
            // flexDirection={isScreenMax768 ? "column" : "row"}
          >
            <FormControl>
              <FormLabel textAlign={"center"}>{data.input2}</FormLabel>
              <Core.Input />
            </FormControl>
          </Flex>
        )}
        {data?.input3 && (
          <Flex
            width="100%"
            flexDirection={"column"}
            // flexDirection={isScreenMax768 ? "column" : "row"}
          >
            <FormControl>
              <FormLabel textAlign={"center"}>{data.input3}</FormLabel>
              <Core.Input />
            </FormControl>
          </Flex>
        )}
      </Flex>
    </>
  );
};

export default ThreeInput;
