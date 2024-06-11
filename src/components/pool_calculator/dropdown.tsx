import {
  Button,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import * as React from "react";

interface IDropdownProps {
  status?: boolean;
  dropdownOptions?: any;
  setPackageId?: any;
  setClientAdminId?: any;
  setValues?: any;
  defaultName?: string;
  md?: boolean;
  xs?: boolean;
  handleFilter?: any;
  element?:
    | "Role"
    | "Task"
    | "User"
    | "paid"
    | "Message"
    | "EmailAndNotification"
    | "Intervals";
  id?: string;
  name?: string;
}

const Dropdown: React.FunctionComponent<IDropdownProps> = ({
  dropdownOptions,
  defaultName,
  md,
  xs,
  setValues,
  id,
  name,
}) => {
  const [selected, setSelected] = React.useState("");
  return (
    <Menu>
      <MenuButton
        size={md ? "md" : xs ? "xs" : "sm"}
        variant="ghost"
        colorScheme="orange"
        as={Button}
        fontSize="14px"
        fontFamily={"Raleway"}
      >
        {selected !== "" ? (
          selected
        ) : (
          <span className="opacity-7 text-[gray]">{defaultName}</span>
        )}
      </MenuButton>
      <MenuList fontSize={xs ? "10px" : "14px"} fontFamily={"Raleway"}>
        {dropdownOptions?.map((dropdwonOption: any, index: any) => {
          return (
            <MenuGroup
              key={index * 6}
              color={"blackAlpha.900"}
              title={dropdwonOption.title}
            >
              <>
                {dropdwonOption.options?.map((option: any, inde: any) => {
                  return (
                    <MenuItem
                      key={inde * 7}
                      color={"blackAlpha.900"}
                      onClick={() => {
                        setSelected(option);
                        setValues({
                          id,
                          name,
                          value: option,
                        });
                      }}
                    >
                      {option}
                    </MenuItem>
                  );
                })}
              </>
            </MenuGroup>
          );
        })}
      </MenuList>
    </Menu>
  );
};

export default Dropdown;
