import type { BoxProps } from "@chakra-ui/react";
import {
  Box,
  ChakraProvider,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import type { MessagePayload } from "firebase/messaging";
import { getMessaging, onMessage } from "firebase/messaging";
import Router from "next/router";
import { memo, useEffect, useMemo, useState } from "react";
import { useCookies } from "react-cookie";
import { useMutation, useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";

import { EmployeeType } from "@/graphql/generated/graphql";
import { useAuth } from "@/hooks/useAuth";
import type {
  IStateEmailAndNotification,
  IStateUser,
} from "@/redux/user/types";
import { setEmailAndNotification, setUser } from "@/redux/user/userReducer";
import { GetUserNotifications, UpdateUserFields } from "@/services/api";
import {
  blueDefaultTheme,
  darkTheme,
  greenTheme,
  orangeDefaultTheme,
  purpleTheme,
  theme1,
  theme2,
  theme3,
} from "@/utils/AppConfig";
import firebaseApp from "@/utils/firebase";
import { verifyJWT } from "@/utils/helpers/jwt";

import { Core } from "..";
import { LoadingComponent } from "../core";
import { Icons } from "../icons";

interface AdminLayoutProps {
  meta?: React.ReactNode;
  children?: React.ReactNode;
  toggleTheme?: () => void;
}

const SidebarContent = ({ ...props }: BoxProps) => (
  <Box
    as="nav"
    pos="fixed"
    top="0"
    left="0"
    zIndex="sticky"
    height="full"
    overflowX="hidden"
    overflowY="auto"
    // bg={useColorModeValue("white", "gray.900")}
    backgroundColor={"white.500"}
    borderColor={useColorModeValue("inherit", "gray.700")}
    width="320px"
    {...props}
  >
    <Core.SideBar />
  </Box>
);

const AdminLayoutView = ({ children }: AdminLayoutProps) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const dispatch = useDispatch();
  const user: IUser = useSelector((state: any) => state.user.user);

  const setUserTheme = () => {
    if (user?.themeId === "green") {
      return greenTheme;
    }
    if (user?.themeId === "purple") {
      return purpleTheme;
    }
    if (user?.themeId === "dark") {
      return darkTheme;
    }
    if (user?.themeId === "theme1") {
      return theme1;
    }
    if (user?.themeId === "theme2") {
      return theme2;
    }
    if (user?.themeId === "theme3") {
      return theme3;
    }
    if (user.admin) {
      return blueDefaultTheme;
    }
    return orangeDefaultTheme;
  };

  const chosenTheme = useMemo(() => setUserTheme(), [user?.themeId]);

  const { mutate: themeMutation } = useMutation(UpdateUserFields);

  const handleThemeChange = (newTheme: string) => {
    themeMutation({
      updateUserFieldsInput: {
        _id: user?._id || "",
        themeId: newTheme,
      },
    });
    // change user themeId
    dispatch(setUser({ ...user, themeId: newTheme } as IStateUser));
  };

  const { refetch } = useQuery(
    ["getUser'sNotifications"],
    () => GetUserNotifications({ userId: String(user?._id) }),
    {
      onSuccess: ({ getUserNotifications }) => {
        dispatch(
          setEmailAndNotification(
            getUserNotifications as IStateEmailAndNotification[]
          )
        );
      },
      refetchOnMount: true,
    }
  );

  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      const messaging = getMessaging(firebaseApp);
      const unsubscribe = onMessage(messaging, (payload: MessagePayload) => {
        if (payload?.notification?.title) {
          new Notification(payload.notification.title, {
            body: payload.notification?.body,
            icon: "https://static.vecteezy.com/system/resources/previews/010/366/210/original/bell-icon-transparent-notification-free-png.png",
          });
          refetch();
        }
      });
      return () => {
        unsubscribe(); // Unsubscribe from the onMessage event
      };
    }
    return undefined; // Explicitly return undefined when the condition is not met
  }, []);

  return (
    <ChakraProvider theme={chosenTheme}>
      {/* <ColorModeScript initialColorMode={theme.config.initialColorMode} /> */}
      <Box
        as="section"
        // bg={useColorModeValue("white.500", "white.100")}
        backgroundColor={"white.500"}
        minH="100vh"
      >
        {/* <Core.Button onClick={toggleTheme} btnBlue position="fixed" zIndex={9000}>
        Toggle Theme5
        </Core.Button> */}
        <SidebarContent display={{ base: "none", lg: "unset" }} />
        <Drawer isOpen={isOpen} onClose={onClose} placement="left">
          <DrawerOverlay />
          <DrawerContent>
            <Core.SideBar />
            <SidebarContent w="full" borderRight="none" />
          </DrawerContent>
        </Drawer>
        <Box ml={{ base: 0, lg: 80 }} transition=".3s ease">
          <div className="h-screen w-full overflow-auto">
            <div className="px-[15px] pt-[10px]">
              <Core.Header
                onOpen={onOpen}
                handleThemeChange={handleThemeChange}
              />
            </div>
            {children}
          </div>
        </Box>
      </Box>
      {!user.admin && (
        <Box
          position={"fixed"}
          left="15px"
          bottom="-36px"
          // bottom="0"
          zIndex={"9999"}
          cursor={"pointer"}
          transition={"all .3s ease"}
          _hover={{
            bottom: "10px",
          }}
        >
          <Flex
            position={"relative"}
            zIndex={10}
            justifyContent={"center"}
            alignItems={"center"}
            width={"28px"}
            height={"23px"}
            color={"black"}
            borderRadius={"15px 15px 0 0"}
            // mx={"auto"}
            marginLeft={"15px"}
            backgroundColor={"white"}
          >
            <Icons.IoIosColorPalette />
          </Flex>
          <Flex
            height={"36px"}
            columnGap={"10px"}
            backgroundColor={"white"}
            // borderRadius={"10px 10px 0 0"}
            borderRadius={"10px"}
            padding={"5px"}
            boxShadow={"0px 2px 8px 6px rgba(0,0,0,.4)"}
          >
            {/* default */}
            <Box
              position={"relative"}
              _before={{
                display: user.themeId === "default" ? "block" : "none",
                content: "''",
                position: "absolute",
                bottom: "9px",
                left: "19px",
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                border: "1px solid #fff",
                backgroundColor: "green",
              }}
              // borderWidth={"1px"}
              backgroundColor={"#fff"}
              // borderColor={"white.100"}
              borderRadius={"5px"}
              padding={"2px"}
              zIndex={200}
              transition="all .2s ease"
              _hover={{
                // backgroundColor: "blue"

                transform: "scale(1.09) translateY(-7px)",
              }}
            >
              <Flex
                gap={"2px"}
                onClick={() => handleThemeChange("default")}
                width={"42px"}
                height={"20px"}
                // borderRadius={"50px"}
                overflow={"hidden"}
                // transform={"rotate(45deg)"}
              >
                <Box
                  width={"20px"}
                  height={"20px"}
                  borderRadius={"5px"}
                  backgroundColor={"#3f5e8c"}
                ></Box>
                <Box
                  width={"20px"}
                  height={"20px"}
                  borderRadius={"5px"}
                  backgroundColor={"#e3912d"}
                ></Box>
              </Flex>
            </Box>
            {/* green */}
            {/* <Box
              position={"relative"}
              _before={{
                display: user.themeId === "green" ? "block" : "none",
                content: "''",
                position: "absolute",
                bottom: "9px",
                left: "19px",
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                border: "1px solid #fff",
                backgroundColor: "green",
              }}
              // borderWidth={"1px"}
              backgroundColor={"#fff"}
              // borderColor={"white.100"}
              borderRadius={"5px"}
              padding={"2px"}
              zIndex={200}
              transition="all .2s ease"
              _hover={{
                // backgroundColor: "blue"

                transform: "scale(1.09) translateY(-7px)",
              }}
            >
              <Flex
                gap={"2px"}
                onClick={() => handleThemeChange("green")}
                width={"42px"}
                height={"20px"}
                // borderRadius={"50px"}
                overflow={"hidden"}
                // transform={"rotate(45deg)"}
              >
                <Box
                  width={"50%"}
                  height={"20px"}
                  borderRadius={"5px"}
                  backgroundColor={"#2e5f5d"}
                ></Box>
                <Box
                  width={"50%"}
                  height={"20px"}
                  borderRadius={"5px"}
                  backgroundColor={"#caac53"}
                ></Box>
              </Flex>
            </Box> */}
            {/* purple */}
            {/* <Box
              position={"relative"}
              _before={{
                display: user.themeId === "purple" ? "block" : "none",
                content: "''",
                position: "absolute",
                bottom: "9px",
                left: "19px",
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                border: "1px solid #fff",
                backgroundColor: "green",
              }}
              // borderWidth={"1px"}
              backgroundColor={"#fff"}
              // borderColor={"white.100"}
              borderRadius={"5px"}
              padding={"2px"}
              zIndex={200}
              transition="all .2s ease"
              _hover={{
                // backgroundColor: "blue"

                transform: "scale(1.09) translateY(-7px)",
              }}
            >
              <Flex
                gap={"2px"}
                onClick={() => handleThemeChange("purple")}
                width={"42px"}
                height={"20px"}
                // borderRadius={"50px"}
                overflow={"hidden"}
                // transform={"rotate(45deg)"}
              >
                <Box
                  width={"50%"}
                  height={"20px"}
                  borderRadius={"5px"}
                  backgroundColor={"#555065"}
                ></Box>
                <Box
                  width={"50%"}
                  height={"20px"}
                  borderRadius={"5px"}
                  backgroundColor={"#4ca5e7"}
                ></Box>
              </Flex>
            </Box> */}
            {/* theme1 */}
            <Box
              position={"relative"}
              _before={{
                display: user.themeId === "theme1" ? "block" : "none",
                content: "''",
                position: "absolute",
                bottom: "9px",
                left: "19px",
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                border: "1px solid #fff",
                backgroundColor: "green",
              }}
              // borderWidth={"1px"}
              backgroundColor={"#fff"}
              // borderColor={"white.100"}
              borderRadius={"5px"}
              padding={"2px"}
              zIndex={200}
              transition="all .2s ease"
              _hover={{
                // backgroundColor: "blue"

                transform: "scale(1.09) translateY(-7px)",
              }}
            >
              <Flex
                gap={"2px"}
                onClick={() => handleThemeChange("theme1")}
                width={"42px"}
                height={"20px"}
                // borderRadius={"50px"}
                overflow={"hidden"}
                // transform={"rotate(45deg)"}
              >
                <Box
                  width={"50%"}
                  height={"20px"}
                  borderRadius={"5px"}
                  backgroundColor={"#1f3c71"}
                ></Box>
                <Box
                  width={"50%"}
                  height={"20px"}
                  borderRadius={"5px"}
                  backgroundColor={"#81bdef"}
                ></Box>
              </Flex>
            </Box>
            {/* theme2 */}
            {/* <Box
              position={"relative"}
              _before={{
                display: user.themeId === "theme2" ? "block" : "none",
                content: "''",
                position: "absolute",
                bottom: "9px",
                left: "19px",
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                border: "1px solid #fff",
                backgroundColor: "green",
              }}
              // borderWidth={"1px"}
              backgroundColor={"#fff"}
              // borderColor={"white.100"}
              borderRadius={"5px"}
              padding={"2px"}
              zIndex={200}
              transition="all .2s ease"
              _hover={{
                // backgroundColor: "blue"

                transform: "scale(1.09) translateY(-7px)",
              }}
            >
              <Flex
                gap={"2px"}
                onClick={() => handleThemeChange("theme2")}
                width={"42px"}
                height={"20px"}
                // borderRadius={"50px"}
                overflow={"hidden"}
                // transform={"rotate(45deg)"}
              >
                <Box
                  width={"50%"}
                  height={"20px"}
                  borderRadius={"5px"}
                  backgroundColor={"#df7f1b"}
                ></Box>
                <Box
                  width={"50%"}
                  height={"20px"}
                  borderRadius={"5px"}
                  backgroundColor={"#F7CC95"}
                ></Box>
              </Flex>
            </Box> */}
            {/* theme3 */}
            <Box
              position={"relative"}
              _before={{
                display: user.themeId === "theme3" ? "block" : "none",
                content: "''",
                position: "absolute",
                bottom: "9px",
                left: "19px",
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                border: "1px solid #fff",
                backgroundColor: "green",
              }}
              // borderWidth={"1px"}
              backgroundColor={"#fff"}
              // borderColor={"white.100"}
              borderRadius={"5px"}
              padding={"2px"}
              zIndex={200}
              transition="all .2s ease"
              _hover={{
                // backgroundColor: "blue"

                transform: "scale(1.09) translateY(-7px)",
              }}
            >
              <Flex
                gap={"2px"}
                onClick={() => handleThemeChange("theme3")}
                width={"42px"}
                height={"20px"}
                // borderRadius={"50px"}
                overflow={"hidden"}
                // transform={"rotate(45deg)"}
              >
                <Box
                  width={"50%"}
                  height={"20px"}
                  borderRadius={"5px"}
                  // backgroundColor={"#81bdef"}
                  backgroundColor={"#df7f1b"}
                ></Box>
                <Box
                  width={"50%"}
                  height={"20px"}
                  borderRadius={"5px"}
                  // backgroundColor={"#bce1f7"}
                  backgroundColor={"#666"}
                ></Box>
              </Flex>
            </Box>
          </Flex>
        </Box>
      )}
    </ChakraProvider>
  );
};

const AdminLayout = ({ children }: AdminLayoutProps) => {
  useAuth();
  const [cookies] = useCookies(["auth"]);
  console.log("cookies: ", cookies);
  const [isVerified, setIsVerified] = useState(false);
  const user: IUser = useSelector((state: any) => state.user.user);

  useEffect(() => {
    const redirectToLogin = () => {
      if (window !== undefined) {
        const path = window.location.pathname;
        localStorage.setItem("path", path);
      }
      Router.replace(`/auth/login`);
    };

    const redirectToCompleteProfile = () => {
      return Router.replace(`/complete-profile`);
    };
    if (!cookies?.auth) {
      redirectToLogin();
    } else {
      const verified = verifyJWT(cookies?.auth);

      // For Super-Admin
      if (user._id !== "" && user.admin) {
        console.log("flag super admin");
        if (verified) {
          setIsVerified(true);
        } else {
          redirectToLogin();
        }
      }
      // For Super-Admin's Users
      if (
        user._id !== "" &&
        user.created_by !== "" &&
        !user.company?.subAdmin &&
        !user.company?.employee
      ) {
        console.log("flag super admin's user");
        if (verified) {
          setIsVerified(true);
        } else {
          redirectToLogin();
        }
      }
      // For Client-Admin
      else if (user._id !== "" && user.company?.subAdmin) {
        if (verified) {
          if (user.company?.park._id !== "") {
            setIsVerified(true);
          } else if (user.company?.park._id === "") {
            console.log(
              "user.company?.park._id: then redirect to complete profile",
              user.company?.park._id
            );
            redirectToCompleteProfile();
          }
        } else {
          redirectToLogin();
        }
      }
      // For Employee Type(Sub Admin)
      else if (
        user._id !== "" &&
        user.company?.employee &&
        (user.company?.employeeType === (EmployeeType.Subadmin as any) ||
          user.company?.employeeType === (EmployeeType.Manager as any) ||
          user.company?.employeeType === (EmployeeType.Lifeguard as any)) &&
        user.company?.park._id !== ""
      ) {
        if (verified) setIsVerified(true);
        else redirectToLogin();
      }
    }
  }, [cookies?.auth, user]);

  return !cookies?.auth || !isVerified ? (
    <LoadingComponent minH={"100vh"} />
  ) : (
    <AdminLayoutView>{children}</AdminLayoutView>
  );
};
export default memo(AdminLayout);
