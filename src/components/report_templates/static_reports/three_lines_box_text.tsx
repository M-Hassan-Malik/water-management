import { Box, Flex, Text } from "@chakra-ui/react";

interface IThreeLinesBoxTextProps {
  data: {
    text1: string;
    text2: string;
    text3: string;
  };
}

const ThreeLinesBoxText: React.FunctionComponent<IThreeLinesBoxTextProps> = ({
  data,
}) => {
  return (
    <>
      {/* row 2 */}
      <Flex width="100%" justifyContent={"center"}>
        <Box
          textAlign={"center"}
          border={"1px solid"}
          borderColor={"blue.400"}
          borderRadius={"10px"}
          px="5%"
        >
          <Text fontSize={"12px"}>{data.text1}</Text>
          <Text fontSize={"12px"} textTransform={"uppercase"}>
            {data.text2}
          </Text>
          <Text fontSize={"12px"}>{data.text3}</Text>
        </Box>
      </Flex>
    </>
  );
};

export default ThreeLinesBoxText;
