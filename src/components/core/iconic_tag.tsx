/* eslint-disable prettier/prettier */
import { Badge as Badg, Flex } from "@chakra-ui/react";
import * as React from "react";

import { Icons } from "../icons";

interface IIconicTagProps {
  children: string;
  sm?: boolean;
}

const IconicTag: React.FunctionComponent<IIconicTagProps> = ({
  children,
  sm,
}) => {
  const colorScheme = (statuss: string) => {
    if (statuss.toLowerCase() === "notification") {
      return "green";
    }
    if (statuss.toLowerCase() === "email") {
      return "blue";
    }
    if (statuss.toLowerCase() === "alert") {
      return "red";
    }
    return "";
  };
  // const bgColor = (statuss: string) => {
  //   if (statuss.toLowerCase() === "notification") {
  //     return "green.50";
  //   }
  //   if (statuss.toLowerCase() === "email") {
  //     return "green.100";
  //   }
  //   return "white";
  // };
  const icon = (statuss: string) => {
    if (statuss.toLowerCase() === "notification") {
      return <Icons.IoMdNotificationsOutline />;
    }
    if (statuss.toLowerCase() === "email") {
      return <Icons.TfiEmail fontSize={"11px"} />;
    }
    return "";
  };
  return (
    <Badg
      py={sm ? "1.7px" : "3.3px"}
      pr={sm ? 2 : 3}
      borderRadius="15px"
      variant="subtle"
      textTransform={"capitalize"}
      fontFamily={"Raleway"}
      fontSize={sm ? "10px" : "12px"}
      colorScheme={colorScheme(children)}
    >
      <Flex columnGap={"5px"} textColor={"black"}>
        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          width={"18px"}
          height={"18px"}
          color={"black"}
          fontSize={"16px"}
          borderRadius="14px"
          backgroundColor={"white"}
        >
          {icon(children)}
        </Flex>
        {children}
      </Flex>
    </Badg>
  );
};

export default IconicTag;
