import type { TextareaProps } from "@chakra-ui/react";
import { FormHelperText, Textarea as ChakraTextarea } from "@chakra-ui/react";
import * as React from "react";

interface ITextAreaProps extends TextareaProps {
  error?: string;
  touched?: boolean;
  isDisabled?: boolean;
  backgroundColor?: string;
}

const Textarea: React.FunctionComponent<ITextAreaProps> = ({
  onChange,
  value,
  placeholder,
  name,
  errorBorderColor,
  error,
  touched,
  rows,
  isDisabled,
  backgroundColor,
}) => {
  return (
    <>
      <ChakraTextarea
        backgroundColor={backgroundColor || "initial"}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        errorBorderColor={errorBorderColor}
        rows={rows}
        isDisabled={isDisabled}
      />
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

export default Textarea;
