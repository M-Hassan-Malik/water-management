import { Avatar, Box, Flex, Text, useDisclosure } from "@chakra-ui/react";

import { formatDateAndTime } from "@/utils/helpers/functions";

import { Core } from "..";
import { Badge } from "../core";
import { Icons } from "../icons";

interface INotificationCardProps {
  notification: any;
  pageView?: boolean;
  handleNotificationClick: (notificationId: string) => void;
  handleRead: (notificationId: string) => void;
}

const NotificationCard: React.FunctionComponent<INotificationCardProps> = ({
  notification,
  handleNotificationClick,
  handleRead,
  pageView,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Core.ModalMd
        isOpen={isOpen}
        onClose={onClose}
        id={notification._id}
        data={notification}
        type="notification"
      />
      <Box
        key={notification._id}
        width="full"
        maxW={pageView === true ? "full" : "sm"}
        cursor={"pointer"}
        overflow="hidden"
        // borderBottom={"1px solid #ccc"}
        borderRadius={"10px"}
        backgroundColor={"white.100"}
        boxShadow={"0px 1px 5px 2px rgba(0,0,0,0.07)"}
        px={4}
        py={2}
        margin={"10px 0"}
        mx="auto"
        _hover={{
          backgroundColor: "white.500",
        }}
        transition={"all .3s ease"}
      >
        {/* <Flex width={"full"} justifyContent={"space-between"}> */}

        <Box>
          <Flex>
            <Flex
              width={"88%"}
              gap={"5px"}
              onClick={() => {
                onOpen();
                handleNotificationClick(notification._id);
              }} // Will show specific daa of notification
            >
              <Avatar
                maxW={pageView === true ? "full" : "50px"}
                boxSize={10}
                name="Dan Abrahmov"
                src="https://bit.ly/dan-abramov"
              />
              <Box>
                <Text
                  fontSize="sm"
                  fontWeight={"bold"}
                  lineHeight={"20px"}
                  textTransform={"capitalize"}
                >
                  {notification.title}
                </Text>
                <Text fontSize="xs" color={"gray.900"}>
                  {/* Feb 08, 2021 at 09:15pm */}
                  {formatDateAndTime(notification.createdAt)}

                  {/* {notification.createdAt} */}
                </Text>
              </Box>
            </Flex>

            <Flex
              justifyContent={"end"}
              alignItems={"center"}
              columnGap={"5px"}
            >
              <Box color="gray.500">
                {notification.priority.toLowerCase() === "alert" ? (
                  <Badge status="ALERT"></Badge>
                ) : notification.priority.toLowerCase() === "emergency" ? (
                  <Badge status="EMERGENCY"></Badge>
                ) : (
                  notification.priority.toLowerCase() === "low" && (
                    <Badge status="LOW"></Badge>
                  )
                )}
              </Box>

              <Box color="gray.500" mt={"2px"}>
                {notification.type.toLowerCase() === "email" ? (
                  <Icons.TfiEmail fontSize={"16px"} color="gray.500" />
                ) : (
                  <Icons.IoMdNotificationsOutline color="gray.500" />
                )}
              </Box>
              {notification.read && (
                <Flex
                  justifyContent={"center"}
                  alignItems={"center"}
                  minWidth={"20px"}
                  maxWidth={"20px"}
                  width={"20px"}
                  height={"20px"}
                  minHeight={"20px"}
                  maxHeight={"20px"}
                  fontSize={"20px"}
                  rounded="2xl"
                  backgroundColor={"#75bb75"}
                  // border={"1px solid red"}
                  p="3px"
                >
                  <Icons.BiCheck fontSize={"15px"} color="#fff" />
                </Flex>
              )}
              {/* tick == true */}
              {!notification.read && (
                <Flex
                  justifyContent={"center"}
                  alignItems={"center"}
                  minWidth={"20px"}
                  maxWidth={"20px"}
                  width={"20px"}
                  height={"20px"}
                  minHeight={"20px"}
                  maxHeight={"20px"}
                  color="gray.500"
                  // fontSize={"20px"}
                  rounded="2xl"
                  border={"1px solid"}
                  borderColor={"gray.500"}
                  // p="10px"
                  onClick={() => handleRead(notification._id)}
                >
                  <Icons.BiCheck fontSize={"20px"} />
                </Flex>
              )}
            </Flex>
          </Flex>
          <Text
            pt="10px"
            fontSize={"14px"}
            maxHeight={"55px"}
            overflowY={"hidden"}
            mb="10px"
            onClick={() => {
              onOpen();
              handleNotificationClick(notification._id);
            }} // Will show specific daa of notification
          >
            {notification.text}
          </Text>
        </Box>

        {/* </Flex> */}
      </Box>
    </>
  );
};
//  <Flex
//             width={"88%"}
//             onClick={() => {
//               onOpen();
//               handleNotificationClick(notification._id);
//             }} // Will show specific daa of notification
//           >
export default NotificationCard;
