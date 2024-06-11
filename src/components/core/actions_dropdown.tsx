import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import * as React from "react";

import { Icons } from "../icons";

interface IActionsDropdownProps {
  status?: boolean;
  dropdwonOptions?: any;
  setPackageId?: any;
  setFacilityId?: any;
  setClientAdminId?: any;
  setValue?: any;
  //   {
  //     title: string;
  //     options: string[];
  // }[]
  dropdwonType?: string;
  defaultName?: string;
  md?: boolean;
  xs?: boolean;
  handleFilter?: any;
  element?:
    | "Role"
    | "dynamicObjects"
    | "Task"
    | "User"
    | "paid"
    | "Message"
    | "EmailAndNotification"
    | "Intervals";
}

const ActionsDropdown: React.FunctionComponent<IActionsDropdownProps> = ({
  status,
  dropdwonOptions,
  dropdwonType,
  element,
  defaultName,
  md,
  xs,
  handleFilter,
  setClientAdminId,
  setPackageId,
  setFacilityId,
  setValue,
}) => {
  const [selected, setSelected] = React.useState("");

  if (element === "dynamicObjects") {
    dropdwonOptions = dropdwonOptions.map((obj: any) => JSON.stringify(obj));
  }
  return (
    <Menu>
      <MenuButton
        size={md ? "md" : xs ? "xs" : "sm"}
        variant="ghost"
        colorScheme="orange"
        as={Button}
        rightIcon={
          dropdwonType === "filter" ? (
            <Icons.TbFilter />
          ) : (
            <Icons.ChevronDownIcon />
          )
        }
        fontSize="14px"
        fontFamily={"Raleway"}
      >
        {selected !== "" ? selected : status ? "Status" : defaultName}
      </MenuButton>
      <MenuList fontSize={xs ? "10px" : "14px"} fontFamily={"Raleway"}>
        {dropdwonOptions?.map((dropdwonOption: any, index: number) => {
          return (
            <Box key={index * 13}>
              {dropdwonOption.title && !dropdwonOption.cost ? (
                <MenuGroup
                  key={index * 6}
                  color={"blackAlpha.900"}
                  title={dropdwonOption.title}
                >
                  <>
                    {dropdwonOption.options?.map(
                      (options: any, inde: number) => {
                        return (
                          <MenuItem
                            key={inde * 7}
                            color={"blackAlpha.900"}
                            onClick={() => {
                              setSelected(options);
                              setValue(inde);
                            }}
                          >
                            {options}
                          </MenuItem>
                        );
                      }
                    )}
                  </>
                </MenuGroup>
              ) : dropdwonOption.name ? (
                <>
                  <MenuItem
                    key={index}
                    color={"blackAlpha.900"}
                    onClick={() => {
                      // handleFilter(element, dropdwonOption);
                      setSelected(dropdwonOption.name);
                      setClientAdminId(dropdwonOption._id);
                    }}
                  >
                    {dropdwonOption.name}
                  </MenuItem>
                </>
              ) : dropdwonOption.facility ? (
                <>
                  <MenuItem
                    key={index}
                    color={"blackAlpha.900"}
                    onClick={() => {
                      // handleFilter(element, dropdwonOption);
                      setSelected(dropdwonOption.facility);
                      setFacilityId(dropdwonOption._id);
                    }}
                  >
                    {dropdwonOption.facility}
                  </MenuItem>
                </>
              ) : dropdwonOption.cost ? (
                <>
                  <MenuItem
                    key={index}
                    color={"blackAlpha.900"}
                    onClick={() => {
                      // handleFilter(element, dropdwonOption);
                      setSelected(dropdwonOption.title);
                      setPackageId(dropdwonOption._id);
                    }}
                  >
                    {dropdwonOption.title}
                  </MenuItem>
                </>
              ) : typeof dropdwonOption === "string" ? (
                element === "dynamicObjects" ? (
                  <MenuItem
                    key={index * 8}
                    color={"blackAlpha.900"}
                    onClick={() => {
                      handleFilter(String(JSON.parse(dropdwonOption)._id));
                      setSelected(JSON.parse(dropdwonOption).facility);
                    }}
                  >
                    {`${JSON.parse(dropdwonOption).facility}`}
                  </MenuItem>
                ) : (
                  <MenuItem
                    key={index * 8}
                    color={"blackAlpha.900"}
                    onClick={() => {
                      // handleFilter(element, dropdwonOption);
                      handleFilter(dropdwonOption);
                      setSelected(dropdwonOption);
                    }}
                  >
                    {dropdwonOption}
                  </MenuItem>
                )
              ) : (
                ""
              )}
            </Box>
          );
        })}
      </MenuList>
    </Menu>
  );
};

export default ActionsDropdown;
