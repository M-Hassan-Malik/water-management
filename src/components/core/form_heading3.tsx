/* eslint-disable react/no-children-prop */
import {
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import * as React from "react";

import { Icons } from "../icons";

interface IFormHeading3Props {
  title: string;
  searchBox?: any;
  color?: string;
}

const FormHeading3: React.FunctionComponent<IFormHeading3Props> = ({
  title,
  searchBox,
  color,
}) => {
  return (
    <Flex
      justifyContent={"space-between"}
      alignItems={"center"}
      borderBottom={"1px solid"}
      borderColor={"gray.200"}
      mb="5px"
    >
      <Heading pb="15px" as="h4" size="md" color={color || "#555"}>
        {title}
      </Heading>
      {searchBox && (
        <InputGroup maxW={"230px"} pb="15px">
          <InputLeftElement
            pointerEvents="none"
            children={<Icons.ImSearch />}
          />
          <Input type="text" placeholder="Search" />
        </InputGroup>
      )}
    </Flex>
  );
};

export default FormHeading3;
