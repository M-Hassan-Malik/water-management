/* eslint-disable prettier/prettier */
import {
  Box,
  Button,
  chakra,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useMediaQuery,
  useOutsideClick,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import * as React from "react";
import { useRef } from "react";
import { useCookies } from "react-cookie";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";

import { HandleLogout } from "@/components/auth";
import {
  initialState,
  setEmailAndNotification,
  setUser,
} from "@/redux/user/userReducer";
import { MarkAsRead } from "@/services/api";

// import { theme } from "@/utils/configurations";
import { Icons } from "../icons";
import NotificationMenu from "../manage_notification/notifications_dropdown";

interface HeaderProps {
  onOpen: () => void;
  handleThemeChange: (newTheme: any) => void;
  // selectedTheme: string;
}

const Header = ({ onOpen, handleThemeChange }: HeaderProps) => {
  const user: IUser = useSelector((state: any) => state.user.user);
  const notificationRef = useRef("");
  const dispatch = useDispatch();
  const [isScreenMin991] = useMediaQuery("(min-width: 991px)");
  const notifications: IEmailAndNotification[] = useSelector(
    (state: any) => state.user.emailAndNotification
  );

  const { asPath, push } = useRouter();

  const removeCookie = useCookies(["auth"])[2];
  const logoutHandler = () => {
    removeCookie("auth", { path: "/" });
    if (window !== undefined) {
      localStorage.setItem("path", asPath);
    }
    dispatch(setUser(initialState.user));
  };

  const { refetch } = useQuery(
    ["markAsRead", notificationRef.current],
    () => {
      if (notificationRef.current) {
        MarkAsRead({ objectId: notificationRef.current });
        notificationRef.current = "";
      }
    },
    {
      onError(_: any) {
        if (
          _?.response?.errors?.length &&
          _?.response?.errors[0]?.message === "Not Authorised!"
        )
          HandleLogout();
      },
      enabled: false,
    }
  );

  const handleRead = (notificationId: string) => {
    notificationRef.current = notificationId;
    const updatedNotifications = notifications?.map((notification: any) => {
      if (String(notification._id) === notificationId) {
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

  const [isOpen, setIsOpen] = React.useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  useOutsideClick({
    ref: menuRef,
    handler: handleClose,
  });

  const getUserRole: any = (): string => {
    if (user?.admin) return `Super Admin`;
    if (
      user.created_by !== "" &&
      !user.company.subAdmin &&
      !user.company.employee
    )
      return `Super Admin's User`;
    if (user?.company?.subAdmin) return `Client Admin`;
    return `Employee: ${user?.company?.employeeType}`;
  };
  return (
    <Flex
      p={1}
      id="top_menu"
      pr={3}
      pl={3}
      alignItems={"center"}
      justify={"space-between"}
      height={"64px"}
      backgroundColor={"white.100"}
      shadow={"md"}
      pos={"relative"}
      zIndex={2}
      style={{
        boxShadow: "0px 2px 5px 2px rgba(0,0,0,0.05)",
      }}
      borderRadius={"10px"}
    >
      <Flex width={"auto"} alignItems={"center"}>
        <Icon
          display={isScreenMin991 ? "none" : "block"}
          ml={"4px"}
          mr={4}
          fontSize="24"
          cursor={"pointer"}
          color="rgba(0, 0, 0, .6)"
          _hover={{
            color: "rgba(0, 0, 0, 1)",
          }}
          as={Icons.FiMenu}
          onClick={onOpen}
        />
        <Heading as="h5" size="md" fontWeight={"normal"}>
          Welcome&nbsp;
          {user?.company.subAdmin ||
          user.company.employeeType === "SUBADMIN" ? (
            <Box
              as="span"
              color="orange.900"
              textTransform="capitalize"
              fontWeight={"bold"}
            >
              {`${user?.company.park.name}`}
            </Box>
          ) : (
            <Box
              as="span"
              color="orange.900"
              textTransform="capitalize"
              fontWeight={"bold"}
            >
              {`${user?.first_name} ${user?.last_name}`}
            </Box>
          )}
          !
        </Heading>
      </Flex>
      <HStack>
        {user?.themeId !== "dark" ? (
          <Button
            onClick={() => handleThemeChange("dark")}
            rounded={"50px"}
            p="3px"
            color="gray.300"
            backgroundColor={"blackAlpha.700"}
            size="sm"
            mr={"20px"}
          >
            <Icons.BsFillMoonFill fontSize="22px" />
          </Button>
        ) : (
          <Button
            onClick={() => handleThemeChange("default")}
            rounded={"50px"}
            p="3px"
            color="#fff"
            backgroundColor={"gray.400"}
            size="sm"
            mr={"20px"}
          >
            <Icons.BsFillSunFill fontSize="22px" />
          </Button>
        )}
        <Box position="relative" right={"20px"}>
          <Button
            onClick={handleToggle}
            size="sm"
            rounded={"50px"}
            backgroundColor={"gray.200"}
            p="0"
          >
            {notifications.filter((_) => !_.read).length !== 0 && (
              <chakra.span
                pos="absolute"
                top="-1px"
                right="-1px"
                px={"6px"}
                pt={"2px"}
                pb={"4px"}
                fontSize="xs"
                fontWeight="bold"
                lineHeight="none"
                color="red.100"
                transform="translate(50%,-50%)"
                bg="red.600"
                rounded="full"
              >
                {notifications.filter((_) => !_.read).length}
              </chakra.span>
            )}
            <Icons.IoMdNotificationsOutline fontSize="22px" color="black" />
          </Button>
          {isOpen && (
            <div ref={menuRef}>
              <NotificationMenu
                notifications={notifications}
                handleNotificationClick={handleNotificationClick}
                handleRead={handleRead}
              />
            </div>
          )}
        </Box>
        <Menu>
          <MenuButton>
            {user?.first_name ? (
              <Flex justifyContent={"flex-end"} alignItems={"center"}>
                <Stack>
                  <Text
                    textAlign={"right"}
                    lineHeight={0.6}
                    fontWeight={"regular"}
                    color={"textColor"}
                    opacity={0.9}
                    mt="5px"
                  >
                    {user?.first_name || `${user?.last_name}`}
                  </Text>
                  <Text
                    fontSize={"10px"}
                    textAlign={"right"}
                    lineHeight={0.6}
                    fontWeight={"regular"}
                    color={"black"}
                    backgroundColor={"gray.200"}
                    alignSelf={"end"}
                    borderRadius={"50px"}
                    padding={"5px 7px 4px 7px"}
                    opacity={0.7}
                    mt={0}
                  >
                    {getUserRole()}
                  </Text>
                </Stack>

                <Box
                  alignSelf={"flex-end"}
                  ml={2}
                  borderRadius={25}
                  width={"50px"}
                  height={"50px"}
                  backgroundColor={"blue.50"}
                >
                  <Image
                    borderRadius={25}
                    width={"50px"}
                    height={"50px"}
                    alt={"avatarImage"}
                    src={user.photo_url}
                    fallbackSrc={
                      "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
                    }
                  />
                </Box>
              </Flex>
            ) : (
              <Box
                width="200px"
                height={"55px"}
                backgroundColor={"gray.50"}
                borderRadius={"5px"}
              ></Box>
            )}
          </MenuButton>
          <MenuList>
            <Text onClick={() => push(`/profile`)}>
              <MenuItem color={"blackAlpha.900"}>Manage Profile</MenuItem>
            </Text>
            <Text onClick={() => push(`/email/update`)}>
              <MenuItem color={"blackAlpha.900"}>Update Email</MenuItem>
            </Text>
            <Text onClick={() => push(`/password-change`)}>
              <MenuItem color={"blackAlpha.900"}>Change Password</MenuItem>
            </Text>

            {!user?.company?._id && (
              <Text onClick={() => push(`/announcement/add`)}>
                <MenuItem color={"blackAlpha.900"}>Announcement</MenuItem>
              </Text>
            )}
            <MenuDivider />
            <Text onClick={logoutHandler}>
              <MenuItem color={"blackAlpha.900"}>Logout</MenuItem>
            </Text>
          </MenuList>
        </Menu>
      </HStack>
    </Flex>
  );
};

export default React.memo(Header);
