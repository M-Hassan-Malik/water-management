/* eslint-disable prettier/prettier */
import { Badge as Badg } from "@chakra-ui/react";
import * as React from "react";

interface IBadgeProps {
  status: string;
  sm?: boolean;
}

const Badge: React.FunctionComponent<IBadgeProps> = (status, sm) => {
  const colorScheme = (statuss: IBadgeProps) => {
    if (
      statuss.status.toLowerCase() === "completed" ||
      statuss.status.toLowerCase() === "acknowledge" ||
      statuss.status.toLowerCase() === "active"
    ) {
      return "green";
    }
    if (
      statuss.status.toLowerCase() === "pending" ||
      statuss.status.toLowerCase() === "emergency" ||
      statuss.status.toLowerCase() === "inactive"
    ) {
      return "red";
    }
    if (statuss.status.toLowerCase() === "reviewing") {
      return "purple";
    }
    if (statuss.status.toLowerCase() === "inprogress" ||
      statuss.status.toLowerCase() === "alert"
    ) {
      return "orange";
    }
    if (statuss.status.toLowerCase() === "new" ||
    statuss.status.toLowerCase() === "low"
    ) {
      return "blue";
    }
    return "";
  };
  return (
    <Badg
      pt={sm ? "1.7px" : "3.3px"}
      pb={sm ? "1px" : "2px"}
      px={sm ? 2 : 3}
      borderRadius="15px"
      variant="subtle"
      textTransform={"capitalize"}
      fontFamily={"Raleway"}
      fontSize={sm ? "10px" : "12px"}
      colorScheme={colorScheme(status)}
    >
      {status.status}
    </Badg>
  );
};

export default Badge;
