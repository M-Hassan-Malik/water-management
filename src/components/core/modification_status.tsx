import { Flex, Text } from "@chakra-ui/react";

import { Icons } from "@/components/icons";

interface IModificationStatusProps {
  children: string;
  themeId?: string;
}

const ModificationStatus: React.FunctionComponent<IModificationStatusProps> = ({
  children,
  themeId,
}) => {
  return (
    <Flex>
      {children.toLowerCase() === "subscribe" && (
        <Icons.BiCheck
          color={themeId === "dark" ? "white" : "blue"}
          fontSize={"16px"}
        />
      )}
      {children.toLowerCase() === "upgrade" && (
        <Icons.HiArrowSmUp
          color={themeId === "dark" ? "white" : "green"}
          fontSize={"16px"}
        />
      )}
      {children.toLowerCase() === "downgrade" && (
        <Icons.HiArrowSmDown
          color={themeId === "dark" ? "white" : "red"}
          fontSize={"16px"}
        />
      )}
      <Text
        color={
          themeId === "dark"
            ? "white"
            : children.toLowerCase() === "subscribe"
            ? "blue"
            : children.toLowerCase() === "upgrade"
            ? "green"
            : "red"
        }
      >
        {children}
      </Text>
    </Flex>
  );
};

export default ModificationStatus;
