import { Flex } from "@chakra-ui/react";
import * as React from "react";

import Person from "./person";

interface IPerson {
  _id?: string;
  first_name: string;
  last_name: string;
}

interface IPersonsGroupProps {
  persons?: IPerson[];
}

const PersonsGroup: React.FunctionComponent<IPersonsGroupProps> = ({
  persons,
}) => {
  return (
    <Flex
      alignItems={"center"}
      columnGap={"20px"}
      rowGap={"5px"}
      flexWrap={"wrap"}
    >
      {persons
        ? persons.map((person, index) => {
            return (
              <Person
                key={index + 14}
                person={`${person.first_name} ${person.last_name}`}
              />
            );
          })
        : null}
      {/* <Core.IconicButton button={"add"}  /> */}
    </Flex>
  );
};

export default PersonsGroup;
