import type { InputProps } from "@chakra-ui/react";
import { FormHelperText, Input as ChakraInput } from "@chakra-ui/react";
import * as React from "react";

interface IInputProps extends InputProps {
  error?: string;
  touched?: boolean;
  isDisabled?: boolean;
  top?: string;
  left?: string;
  opacity?: string;
  helpText?: string;
  pr?: string;
  autoCompleteOff?: boolean;
  color?: string;
}

const Input: React.FunctionComponent<IInputProps> = ({
  size,
  id,
  onChange,
  value,
  placeholder,
  name,
  type,
  maxWidth,
  cursor,
  errorBorderColor,
  error,
  touched,
  min,
  max,
  step,
  isDisabled,
  top,
  left,
  opacity,
  helpText,
  pr,
  backgroundColor,
  autoCompleteOff,
  color,
  onBlur,
  autoFocus,
  textTransform,
}) => {
  return (
    <>
      {helpText && (
        <FormHelperText
          fontSize="1.0em"
          fontFamily="Poppins"
          userSelect={"none"}
        >
          {helpText}
        </FormHelperText>
      )}
      <ChakraInput
        name={name}
        id={id}
        placeholder={placeholder}
        borderRadius={"6px"}
        size={size || "md"}
        type={type}
        maxWidth={maxWidth || "100%"}
        color={color || "textColor"}
        cursor={cursor || "initial"}
        borderColor={"#ccc"}
        backgroundColor={backgroundColor || "initial"}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        errorBorderColor={errorBorderColor}
        position={opacity === "0" ? "absolute" : "static"}
        min={min}
        max={max}
        step={step}
        isDisabled={isDisabled}
        top={top || ""}
        left={left || ""}
        opacity={opacity || "inherit"}
        pr={pr || ""}
        autoComplete={autoCompleteOff ? "new-password" : "unset"}
        autoFocus={!!autoFocus}
        textTransform={textTransform && textTransform}
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

export default Input;
