import { Search2Icon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import Link from "next/link";
import * as React from "react";

import { Misc } from "..";

// interface IDrawerHeaderProps {
//   // toggleSideBar: Function;
//   onOpen: (() => void) | undefined;
// }

const DrawerHeader = () => {
  return (
    <Box
      //  pt={5}
      pr={5}
      pl={5}
      mb="60px"
      height={"64px"}
      // backgroundColor={"white.100"}
      // backgroundColor={"orange.900"}
      // backgroundColor={"blue.900"}
    >
      <Flex
        flexDirection={"row"}
        justify={"space-between"}
        width={{ base: "auto" }}
      >
        <Link href="/dashboard">
          <Box mt="20px" ml="10px">
            <Misc.Logo width={"135px"} />
          </Box>
        </Link>
      </Flex>

      <InputGroup mt={5} mb={5} style={{ display: "none" }}>
        <InputLeftElement
          pointerEvents="none"
          // eslint-disable-next-line react/no-children-prop
          children={<Search2Icon color="gray.300" borderRadius="5px" />}
        />
        <Input
          borderWidth={0}
          backgroundColor={"#2F559D"}
          type="tel"
          placeholder="Phone number"
          borderRadius="5px"
        />
      </InputGroup>
    </Box>
  );
};

export default React.memo(DrawerHeader);
