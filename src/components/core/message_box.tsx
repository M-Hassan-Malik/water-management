import { Box, Heading, Text } from "@chakra-ui/react";

interface IMessageBoxProps {
  data: {
    title: string;
    message: string;
  };
}

const MessageBox: React.FunctionComponent<IMessageBoxProps> = ({ data }) => {
  return (
    <Box
      display={"inline-block"}
      backgroundColor={"white.100"}
      borderRadius={"10px"}
      padding={"15px"}
      boxShadow={"0px 2px 5px 2px rgba(0,0,0,0.05)"}
      mb="20px"
    >
      <Heading
        color={"orange.900"}
        fontSize="20px"
        fontFamily={"Verdana"}
        mb="10px"
      >
        {data.title}
      </Heading>
      <Text fontSize={"13px"} lineHeight={"16px"}>
        {data.message}
      </Text>
    </Box>
  );
};

export default MessageBox;
