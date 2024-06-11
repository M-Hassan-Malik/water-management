import {
  Box,
  Card,
  CardHeader,
  Flex,
  Progress,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import axios from "axios";
import Link from "next/link";
import React, { forwardRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { EmployeeType } from "@/graphql/generated/graphql";
import { setStorage } from "@/redux/user/userReducer";

import { Drawer } from "..";

type SideBarProps = {};

const SideBarComponent = React.memo(
  forwardRef<HTMLInputElement, SideBarProps>(() => {
    const [isScreenMax1140] = useMediaQuery("(max-width: 1140px)");
    const user: IUser = useSelector((state: any) => state.user.user);
    const storage: IStorage | undefined = useSelector(
      (state: any) => state.user.storage
    ); // in MBs
    const dispatch = useDispatch();
    // Create a cancel token source
    const cancelTokenSource = axios.CancelToken.source();

    useEffect(() => {
      axios
        .post(
          `${process.env.FRONT_END_URL}/api/s3/get-path-size?userId=${String(
            user._id
          )}`,
          // Pass the cancel token as a config option
          { cancelToken: cancelTokenSource.token }
        )
        .then((response) => {
          dispatch(setStorage(response.data.data));
        })
        .catch((error) => {
          if (axios.isCancel(error)) {
            console.log("Request canceled", error.message);
          } else {
            // Handle other errors
            console.error("Error:", error);
          }
        });

      return () => {
        cancelTokenSource.cancel(
          "Request canceled due to component unmounting"
        );
      };
    }, []);

    const evaluateClient = (): boolean => {
      return (
        Boolean(user.company._id) &&
        user.company.employeeType !== (EmployeeType.Pectora as any) &&
        user.company.employeeType !== (EmployeeType.Imported as any)
      );
    };
    return (
      <Box
        height={"100vh"}
        zIndex={9}
        className={`duration-300 ease-out`}
        backgroundColor={"white.500"}
        // backgroundColor={"#2a2a2a96"}
        pt="10px"
        pb="10px"
        pl="10px"
      >
        <Flex
          flexDirection={"column"}
          justify={"start"}
          minH={"95vh"}
          height="100%"
          maxW={isScreenMax1140 ? "320px" : "350px"}
          backgroundColor={user.admin ? "blue.900" : "blue.900"}
          className={`sidebar-main`}
          zIndex="2"
          pos={"relative"}
          borderRadius={"15px"}
          // borderRadius={"0 15px 15px 0"}
        >
          <Drawer.Header />
          <Box
            pr={5}
            pl={3}
            flex={2.2}
            mt={"-30px"}
            maxHeight={"70vh"}
            overflow={"auto"}
            className="scrollbar"
          >
            <Drawer.Navigation />
          </Box>
          <Box>
            {evaluateClient() && (
              <Flex
                className="storage-main"
                mb={2}
                pr={2}
                pl={2}
                flexDirection={"column"}
                justify={"flex-end"}
                mt={5}
              >
                <Card
                  height={160}
                  borderRadius={"10px"}
                  // backgroundColor={"blue.500"}
                  backgroundColor={user.admin ? "blue.500" : "blue.500"}
                >
                  <CardHeader p={4}>
                    <Text
                      fontWeight={"regular"}
                      // color={user?.themeId === "theme3" ? "#000" : "white"}
                      color="#fff"
                    >
                      Storage Data Usage
                    </Text>
                    <Text
                      mt={2}
                      // color={user?.themeId === "theme3" ? "#000" : "white"}
                      color="#fff"
                      fontSize={"sm"}
                      opacity={0.7}
                    >
                      Need more storage?
                      <br />
                      <Link
                        href="/subscription/modification"
                        as="/subscription/modification"
                        className="text-underline underline"
                      >
                        Upgrade your subscription package.
                      </Link>
                    </Text>

                    <Text
                      mt={2}
                      // color={user?.themeId === "theme3" ? "#000" : "white"}
                      fontFamily={"verdana"}
                      color="#fff"
                      fontSize={"sm"}
                      opacity={0.7}
                    >
                      {storage?.sizeInGB} GB / {user.package?.sizeInGB} GB
                    </Text>
                    <Progress
                      mt={3}
                      value={
                        (Number(storage?.sizeInMB) /
                          Number(user.package?.sizeInGB) /
                          1024) *
                        100
                      }
                      borderRadius={5}
                      // colorScheme={
                      //   user?.themeId === "theme3" ? "green" : "orange"
                      // }
                      colorScheme="orange"
                    />
                  </CardHeader>
                </Card>
              </Flex>
            )}
          </Box>
          {/* <HStack mb={4} pr={5} pl={5}  mt={4}>
            <Box  mr={1} borderRadius={25} width={50} height={50} backgroundColor={'red'}>
              <Image borderRadius={25} width={50} height={50} alt={'avatarImage'} src={'https://tinyurl.com/yhkm2ek8'} />
            </Box>
            <Stack>
                <Text lineHeight={.8} fontWeight={'regular'} color={'white'} opacity={.9}>Christoph Winston</Text>
                <Text lineHeight={.8} fontWeight={'regular'} color={'white'} opacity={.7}>chris@octalyte.com</Text>
            </Stack>
          </HStack> */}
        </Flex>
      </Box>
    );
  })
);

SideBarComponent.displayName = "SideBar";

export const SideBar = SideBarComponent;
