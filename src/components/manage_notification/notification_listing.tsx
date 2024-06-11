import {
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useRef } from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";

import { setEmailAndNotification } from "@/redux/user/userReducer";
import { MarkAsRead } from "@/services/api";

import NotificationCard from "./notification_card";

interface INotificationsListingProps {}

const NotificationsListing: React.FunctionComponent<
  INotificationsListingProps
> = (_props) => {
  const notifications: IEmailAndNotification[] = useSelector(
    (state: any) => state.user.emailAndNotification
  );
  const notificationRef = useRef("");
  const dispatch = useDispatch();

  const { refetch } = useQuery(
    ["markAsRead", notificationRef.current],
    () => {
      if (notificationRef.current) {
        MarkAsRead({ objectId: notificationRef.current });
        notificationRef.current = "";
      }
    },
    {
      enabled: false,
    }
  );

  const handleRead = (notificationId: string) => {
    notificationRef.current = notificationId;
    const updatedNotifications = notifications?.map((notification: any) => {
      if (notification._id.toString() === notificationId) {
        return {
          ...notification,
          read: true,
        };
      }
      return notification;
    });

    dispatch(setEmailAndNotification(updatedNotifications));
    refetch();
  };

  const handleNotificationClick = (notificationId: string) => {
    handleRead(notificationId);
  };

  const unReadNotifications = notifications.filter(
    (notification: any) => notification.read === false
  );

  return (
    <Box
      borderRadius="10px"
      width="100%"
      mx={"auto"}
      padding="20px"
      boxShadow="0px 2px 5px 2px rgba(0,0,0,0.05)"
      backgroundColor="white.100"
    >
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
                  pageView={true}
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
                  pageView={true}
                />
              ))
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default NotificationsListing;
