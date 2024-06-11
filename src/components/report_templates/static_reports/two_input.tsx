import { Flex, FormControl, FormLabel } from "@chakra-ui/react";

import { Core } from "@/components";

interface ITwoInputProps {
  data: {
    input1: string;
    input2: string;
  };
}

const TwoInput: React.FunctionComponent<ITwoInputProps> = ({ data }) => {
  return (
    <>
      {/* row 2 */}
      <Flex width="100%" justifyContent={"space-between"} columnGap={"5px"}>
        <Flex width="100%" flexDirection={"column"}>
          <FormControl>
            <FormLabel textAlign={"center"}>{data.input1}</FormLabel>
            <Core.Input />
          </FormControl>
        </Flex>
        <Flex width="100%" flexDirection={"column"}>
          <FormControl>
            <FormLabel textAlign={"center"}>{data.input2}</FormLabel>
            <Core.Input />
          </FormControl>
        </Flex>
      </Flex>
    </>
  );
};

export default TwoInput;
