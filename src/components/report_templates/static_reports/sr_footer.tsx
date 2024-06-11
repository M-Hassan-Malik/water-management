import { Flex, Text } from "@chakra-ui/react";

interface ISRFooterProps {
  data?: string;
}

const SRFooter: React.FunctionComponent<ISRFooterProps> = ({ data }) => {
  return (
    <Flex justifyContent={"start"}>
      <Text fontSize={"10px"}>{data}</Text>
    </Flex>
  );
};

export default SRFooter;
