import { FormHelperText } from "@chakra-ui/react";
import type { GroupBase } from "chakra-react-select";
import { Select } from "chakra-react-select";
import * as React from "react";

interface Option {
  label: string;
  value: string;
}

interface MultiSelectProps {
  name: string;
  list: Option[];
  placeholder: string;
  isMulti?: boolean;
  isDisabled?: boolean;
  onChange: (selectedValues: string[]) => void;
  error?: string;
  touched?: boolean;
  value: string[];
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  name,
  list,
  placeholder,
  isMulti = true,
  onChange,
  isDisabled,
  error,
  touched,
  value,
}) => {
  return (
    <>
      <Select
        name={name}
        options={list as unknown as readonly (string | GroupBase<string>)[]}
        placeholder={placeholder || "Select locations"}
        closeMenuOnSelect={false}
        isMulti={isMulti}
        isDisabled={isDisabled}
        onChange={(selectedOptions: any) => {
          onChange(selectedOptions);
        }}
        value={value}
      />
      {touched && list?.length > 0 && (
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

export default MultiSelect;
