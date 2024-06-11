/* eslint-disable prettier/prettier */
/* eslint-disable no-nested-ternary */
import { Button as ChakraButton } from "@chakra-ui/react";
import * as React from "react";

import { Icons } from "../icons";

interface IIconicButtonProps {
  button: any;
  name?: string;
  value?: any;
  className?: string;
  size?: string;
  onClick?: any;
  isDisabled?: boolean;
  rounded?: boolean;
}

const IconicButton: React.FunctionComponent<IIconicButtonProps> = ({
  button,
  className,
  size,
  onClick,
  isDisabled,
  name,
  value,
  rounded,
}) => {
  return (
    <ChakraButton
      isDisabled={!!isDisabled}
      className={`"action-buttons" ${className && className}`}
      size={size || "sm"}
      colorScheme={
        button.toLowerCase() === "edit" ||
        button.toLowerCase() === "add" ||
        button.toLowerCase() === "upload" ||
        button.toLowerCase() === "search"
          ? "blue"
          : button.toLowerCase() === "delete" ||
            button.toLowerCase() === "subtract" ||
            button.toLowerCase() === "reset"
          ? "red"
          : button.toLowerCase() === "check" ||
            button.toLowerCase() === "assign" ||
            button.toLowerCase() === "view"
          ? "orange"
          : ""
      }
      rounded={rounded ? "500px" : "6px"}
      variant={"solid"}
      fontFamily={"Raleway"}
      onClick={onClick}
      name={name}
      value={value}
      p={"5px"}
    >
      {button.toLowerCase() === "edit" ? (
        <Icons.FiEdit2 fontSize={"16px"} />
      ) : button.toLowerCase() === "delete" ? (
        <Icons.AiOutlineDelete fontSize={"18px"} />
      ) : button.toLowerCase() === "add" ? (
        <Icons.IoMdAdd fontSize={"28px"} />
      ) : button.toLowerCase() === "subtract" ? (
        <Icons.IoMdRemove fontSize={"29px"} />
      ) : button.toLowerCase() === "view" ? (
        <Icons.HiEye fontSize={"18px"} color="white" />
      ) : button.toLowerCase() === "check" ? (
        <Icons.BsCheck2 fontSize={"20px"} color="white" />
      ) : button.toLowerCase() === "assign" ? (
        <Icons.BsPersonFillCheck fontSize={"20px"} color="white" />
      ) : button.toLowerCase() === "reset" ? (
        <Icons.RxCross2 fontSize={"20px"} color="white" />
      ) : button.toLowerCase() === "search" ? (
        <Icons.ImSearch fontSize={"18px"} color="white" />
      ) : button.toLowerCase() === "upload" ? (
        <Icons.RiUploadCloud2Fill fontSize={"20px"} color="white" />
      ) : (
        ""
      )}
    </ChakraButton>
  );
};

export default IconicButton;
