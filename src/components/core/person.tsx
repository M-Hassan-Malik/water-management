import { Box, Text } from "@chakra-ui/react";
import * as React from "react";

interface IPersonProps {
  person: any;
}

const Person: React.FunctionComponent<IPersonProps> = ({ person }) => {
  return (
    <Box>
      <Text color="gray.400" fontSize={"sm"} fontWeight={"bold"}>
        {person}
      </Text>
    </Box>
  );
};

export default Person;
