import { Checkbox as ChakraCheckbox } from "@chakra-ui/react";

interface IIconicButtonProps {
  className?: string;
  size?: string;
  mt?: string;
  mr?: string;
  mb?: string;
  ml?: string;
  selectedIds?: Array<string>;
  selectedId?: string;
  handleCheckboxChange?: any;
  handleSingleCheckboxChange?: any;
  handleCheckboxChangeSelectAll?: any;
  id?: any;
  isDisabled?: boolean;
}

const Checkbox: React.FunctionComponent<IIconicButtonProps> = ({
  className,
  size,
  mt,
  mr,
  mb,
  ml,
  selectedIds,
  selectedId,
  handleCheckboxChange,
  handleSingleCheckboxChange,
  handleCheckboxChangeSelectAll,
  id,
  isDisabled,
}) => {
  return (
    <>
      {handleCheckboxChangeSelectAll && (
        <ChakraCheckbox
          onChange={(e: any) => handleCheckboxChangeSelectAll(e)}
          mt={mt || ""}
          mr={mr || ""}
          mb={mb || ""}
          ml={ml || ""}
          className={`"" ${className && className}`}
          size={size || ""}
          isDisabled={isDisabled && true}
        ></ChakraCheckbox>
      )}
      {handleCheckboxChange && (
        <ChakraCheckbox
          isChecked={selectedIds?.includes(id)}
          onChange={(e: any) => handleCheckboxChange(e, id)}
          mt={mt || ""}
          mr={mr || ""}
          mb={mb || ""}
          ml={ml || ""}
          className={`"" ${className && className}`}
          size={size || ""}
        ></ChakraCheckbox>
      )}
      {handleSingleCheckboxChange && (
        <ChakraCheckbox
          isChecked={selectedId === id}
          onChange={(e: any) => handleSingleCheckboxChange(e, id)}
          mt={mt || ""}
          mr={mr || ""}
          mb={mb || ""}
          ml={ml || ""}
          className={`"" ${className && className}`}
          size={size || ""}
        ></ChakraCheckbox>
      )}
    </>
  );
};

export default Checkbox;
