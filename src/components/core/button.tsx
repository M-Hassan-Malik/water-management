import type { ButtonProps, ResponsiveValue } from "@chakra-ui/react";
import { Button as ChakraButton } from "@chakra-ui/react";

import { Core } from "..";

interface IButtonProps extends ButtonProps {
  button?: any;
  children?: any;
  btnOrange?: any;
  btnGray?: any;
  btnBlue?: any;
  btnGrayMd?: any;
  btnOrangeMd?: any;
  btnBlueMd?: any;
  btnOutline?: any;
  btnOutlineOrange?: any;
  btnRed?: any;
  onClick?: any;
  isDisabled?: boolean;
  isLoading?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
  mt?: string;
  mr?: string;
  mb?: string;
  ml?: string;
  className?: string;
  size?: string;
  width?: string;
  whiteSpace?: ResponsiveValue<any>;
}

const Button: React.FunctionComponent<IButtonProps> = ({
  button,
  children,
  btnGrayMd,
  btnOrange,
  btnOrangeMd,
  btnGray,
  btnBlue,
  btnBlueMd,
  btnOutline,
  btnOutlineOrange,
  btnRed,
  isDisabled,
  isLoading,
  onClick,
  type,
  mt,
  mr,
  mx,
  mb,
  ml,
  className,
  size,
  width,
  display,
  whiteSpace,
}) => {
  return (
    <>
      {btnOutlineOrange && (
        <ChakraButton
          className={className && className}
          display={display || "initial"}
          colorScheme="orange"
          variant="outline"
          size={size || "md"}
          width={width || "200px"}
          mt={mt || "15px"}
          mr={mr || ""}
          mx={mx || ""}
          isDisabled={!!isDisabled}
          onClick={onClick}
          type={type}
        >
          {children && isLoading ? (
            <Core.BtnSpinner size="lg" mt="3px" />
          ) : (
            children
          )}
          {button && isLoading ? (
            <Core.BtnSpinner size="lg" mt="3px" />
          ) : (
            button
          )}
        </ChakraButton>
      )}
      {btnOutline && (
        <ChakraButton
          className={className && className}
          display={display || "initial"}
          colorScheme="teal"
          variant="outline"
          size={size || "md"}
          width={width || "200px"}
          mt={mt || "15px"}
          mr={mr || ""}
          mx={mx || ""}
          isDisabled={!!isDisabled}
          onClick={onClick}
          type={type}
        >
          {children && isLoading ? (
            <Core.BtnSpinner size="lg" mt="3px" />
          ) : (
            children
          )}
          {button && isLoading ? (
            <Core.BtnSpinner size="lg" mt="3px" />
          ) : (
            button
          )}
        </ChakraButton>
      )}
      {btnGray && (
        <ChakraButton
          variant={"solid"}
          display={display || "initial"}
          colorScheme="gray"
          size={size || "sm"}
          className={className && className}
          mt={mt || "15px"}
          mx={mx || ""}
          onClick={onClick}
        >
          {children}
          {button}
        </ChakraButton>
      )}
      {btnGrayMd && (
        <ChakraButton
          className={className && className}
          display={display || "initial"}
          colorScheme="gray"
          size={size || "md"}
          width={"200px"}
          mt={mt ? "0" : "15px"}
          onClick={onClick}
        >
          {children}
          {button}
        </ChakraButton>
      )}
      {btnOrange && (
        <ChakraButton
          className={className && className}
          display={display || "initial"}
          colorScheme="orange"
          size={size || "sm"}
          letterSpacing=".7px"
          width={"100%"}
          maxWidth={"220px"}
          mt={mt || "15px"}
          mx={mx || ""}
          onClick={onClick}
        >
          {children}
          {button}
        </ChakraButton>
      )}
      {btnOrangeMd && (
        <ChakraButton
          className={className && className}
          display={display || "initial"}
          colorScheme="orange"
          size={size || "md"}
          letterSpacing=".7px"
          width={width || "100%"}
          maxWidth={"220px"}
          mt={mt || "15px"}
          mr={mr || ""}
          mx={mx || ""}
          isDisabled={!!isDisabled}
          onClick={onClick}
        >
          {children && isLoading ? (
            <Core.BtnSpinner size="lg" mt="3px" />
          ) : (
            children
          )}
          {button && isLoading ? (
            <Core.BtnSpinner size="lg" mt="3px" />
          ) : (
            button
          )}
        </ChakraButton>
      )}
      {btnBlue && (
        <ChakraButton
          width={width || "auto"}
          className={className && `${className}action-buttons`}
          display={display || "initial"}
          size={size || "sm"}
          letterSpacing=".7px"
          colorScheme={"blue"}
          variant={"solid"}
          mt={mt || "15px"}
          mx={mx || ""}
          mb={mb || ""}
          ml={ml || ""}
          onClick={onClick}
          whiteSpace={whiteSpace || "initial"}
        >
          {children && isLoading ? (
            <Core.BtnSpinner size="lg" mt="3px" />
          ) : (
            children
          )}
          {button && isLoading ? (
            <Core.BtnSpinner size="lg" mt="3px" />
          ) : (
            button
          )}
        </ChakraButton>
      )}
      {btnBlueMd && (
        <ChakraButton
          className={className && `${className}action-buttons`}
          size={size || "md"}
          colorScheme={"blue"}
          variant={"solid"}
          mt={mt || "0"}
          mx={mx || ""}
          onClick={onClick}
        >
          {children}
          {button}
        </ChakraButton>
      )}
      {btnRed && (
        <ChakraButton
          className={className && `${className}action-buttons`}
          display={display || "initial"}
          size={size || "sm"}
          letterSpacing=".7px"
          colorScheme={"red"}
          variant={"solid"}
          mt={mt || "15px"}
          mx={mx || ""}
          onClick={onClick}
        >
          {children}
          {button}
        </ChakraButton>
      )}
    </>
  );
};

export default Button;
