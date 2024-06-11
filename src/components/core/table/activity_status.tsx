import { Text } from "@chakra-ui/react";
import React from "react";

interface IActivityStatusProps {
  children: string;
}

const ActivityStatus: React.FunctionComponent<IActivityStatusProps> = ({
  children,
}) => {
  const getStatusColor = (_children: string) => {
    const lowercaseStatus = _children?.toLowerCase(); // Use optional chaining to handle undefined status
    switch (lowercaseStatus) {
      case "active":
        return "green.400";
      case "inactive":
        return "red.500";
      default:
        return "";
    }
  };

  return (
    <Text
      position={"relative"}
      ml="16px"
      _before={{
        content: `""`,
        position: "absolute",
        width: "12px",
        height: "12px",
        backgroundColor: getStatusColor(children),
        borderRadius: "50%",
        opacity: "0.6",
        ml: "-16px",
        mt: "4px",
      }}
    >
      {children}
    </Text>
  );
};

export default ActivityStatus;
