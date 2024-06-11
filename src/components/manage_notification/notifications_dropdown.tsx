import {
  Box,
  Flex,
  Link,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import React from "react";

import NotificationCard from "./notification_card";

interface NotificationMenuProps {
  notifications: any;
  handleNotificationClick: (notificationId: string) => void;
  handleRead: (notificationId: string) => void;
}

const NotificationMenu: React.FC<NotificationMenuProps> = ({
  notifications,
  handleNotificationClick,
  handleRead,
}) => {
  const unReadNotifications = notifications.filter(
    (notification: any) => notification.read === false
  );

  return (
    <Box
      borderRadius={"15px"}
      overflow={"hidden"}
      position="absolute"
      top="100%"
      right={0}
      backgroundColor="white.500"
      shadow="xl"
      borderTop={"1px solid"}
      borderColor={"gray.200"}
    >
      <Box
        pl={4}
        pr={4}
        pb={4}
        zIndex={9999}
        width={"400px"}
        maxHeight={"450px"}
        overflowY={"scroll"}
        className="orange-scrollbar"
        my="3"
      >
        <Flex justifyContent={"space-between"}>
          <Text fontSize={"lg"} fontWeight={"bold"} mb="10px">
            Notifications
          </Text>
          <Link
            fontSize={"sm"}
            textDecoration={"underline"}
            color={"blue.400"}
            href="/notifications"
          >
            See All
          </Link>
        </Flex>
        <Tabs>
          <TabList border={"none"} columnGap={"5px"}>
            <Tab
              fontSize={"sm"}
              pt={"5px"}
              pb={"2px"}
              px={"20px"}
              _selected={{ color: "white", bg: "green.400" }}
              rounded={"2xl"}
            >
              All
            </Tab>
            <Tab
              fontSize={"sm"}
              pt={"5px"}
              pb={"2px"}
              px={"20px"}
              _selected={{ color: "white", bg: "red.300" }}
              rounded={"2xl"}
            >
              Unread
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel px="0" pt="15px" m="0">
              {notifications.length === 0 ? (
                <Text textAlign={"center"} py={5}>
                  No notifications
                </Text>
              ) : (
                notifications.map((notification: any) => (
                  <NotificationCard
                    key={notification._id}
                    notification={notification}
                    handleNotificationClick={handleNotificationClick}
                    handleRead={handleRead}
                  />
                ))
              )}
            </TabPanel>
            <TabPanel px="0" pt="15px" m="0">
              {unReadNotifications.length === 0 ? (
                <Text textAlign={"center"} py={5}>
                  No Unread notifications
                </Text>
              ) : (
                unReadNotifications.map((unReadNotification: any) => (
                  <NotificationCard
                    key={unReadNotification._id}
                    notification={unReadNotification}
                    handleNotificationClick={handleNotificationClick}
                    handleRead={handleRead}
                  />
                ))
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};

export default NotificationMenu;
