import type { SelectProps } from "@chakra-ui/react";
import { FormHelperText, Select as ChakraSelect } from "@chakra-ui/react";
import * as React from "react";

interface IListType {
  name: string;
  value: string | number;
}
interface IInputProps extends SelectProps {
  error?: string;
  touched?: boolean;
  list: IListType[];
  isDisabled?: boolean;
}

const Select: React.FunctionComponent<IInputProps> = ({
  onChange,
  value,
  name,
  errorBorderColor,
  error,
  touched,
  list,
  isDisabled,
  textTransform,
}) => {
  return (
    <>
      <ChakraSelect
        name={name}
        textTransform={textTransform || "capitalize"}
        onChange={onChange}
        value={value}
        errorBorderColor={errorBorderColor}
        isDisabled={isDisabled}
        className="select-field"
      >
        {list.map((item, index) => (
          <option key={index} value={item.value}>
            {item.name}
          </option>
        ))}
      </ChakraSelect>
      {touched && (
        <FormHelperText
          fontSize="1.0em"
          fontFamily="Poppins"
          textColor="#e74c3c"
        >
          {error}
        </FormHelperText>
      )}
    </>
  );
};

export default Select;
