import { Flex, Text } from "@chakra-ui/react";

import { Icons } from "@/components/icons";

interface IMessageTypeProps {
  children: string;
}

const MessageType: React.FunctionComponent<IMessageTypeProps> = ({
  children,
}) => {
  return (
    <Flex alignItems={"center"}>
      {children.toLowerCase() === "email" && (
        <Icons.TfiEmail fontSize={"16px"} />
      )}
      {children.toLowerCase() === "notification" && (
        <Icons.IoMdNotificationsOutline fontSize={"18px"} />
      )}
      <Text ml="5px" className="capitalize">
        {children}
      </Text>
    </Flex>
  );
};

export default MessageType;
