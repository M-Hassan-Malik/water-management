import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import PermissionsList from "@/components/core/permissions_list/permissions_list";
import { addDaysInDate } from "@/utils/helpers/functions";

import { BtnSpinner, Button, FormHeading3 } from "../core";
import { Icons } from "../icons";

interface IMySubscriptionCardProps {}

const MySubscriptionCard: React.FC<IMySubscriptionCardProps> = () => {
  const { push } = useRouter();
  const user: IUser = useSelector((state: any) => state.user.user);

  const [modulePermissions, setModulePermissions] = useState<
    {
      name: { key: string; active: boolean };
      views: { key: string; active: boolean }[];
    }[]
  >([]);

  const [operationPermissions, setOperationPermissions] = useState<
    {
      name: { key: string; active: boolean };
      views: { key: string; active: boolean }[];
    }[]
  >([]);

  useEffect(() => {
    const tempModulePermissions: {
      name: {
        key: string;
        active: boolean;
      };
      views: {
        key: string;
        active: boolean;
      }[];
    }[] = [];
    const tempOperationPermissions: {
      name: {
        key: string;
        active: boolean;
      };
      views: {
        key: string;
        active: boolean;
      }[];
    }[] = [];

    // Filter Modules
    user?.package?.modules.forEach((obj) => {
      tempModulePermissions.push({
        name: { key: String(obj.name), active: true },
        views: obj.views.map((v) => ({ key: v, active: true })),
      });
    });

    // Filter Operations
    user?.operations?.forEach((obj) => {
      tempOperationPermissions.push({
        name: { key: String(obj.name), active: true },
        views: obj.views.map((v) => ({ key: v, active: true })),
      });
    });
    setModulePermissions(tempModulePermissions);
    setOperationPermissions(tempOperationPermissions);
  }, [user?.package?.modules, user?.operations]);

  return (
    <Card
      width={"100%"}
      maxW={"1100px"}
      borderRadius={"15px"}
      backgroundColor={"white.100"}
      size="sm"
      p={2}
      minHeight={"80vh"}
    >
      {!user?._id ? (
        <Flex
          width={"100%"}
          height={"70vh"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <BtnSpinner size="md" />
        </Flex>
      ) : (
        <>
          <CardHeader
            display={"flex"}
            justifyContent="space-between"
            borderBottom={"1px solid #ddd"}
            mb="10px"
          >
            <Flex justifyContent={"space-between"} width={"100%"}>
              <Flex>
                <Box as="span">Package:&nbsp;</Box>
                <Heading size="md">{user?.package?.title}</Heading>
              </Flex>

              <Box>
                <Button
                  mt="0"
                  btnOrangeMd
                  type="submit"
                  button={"Modify Subscription"}
                  onClick={() => {
                    push("/subscription/modification");
                  }}
                  isLoading={!user?._id}
                  isDisabled={!user?._id}
                />
              </Box>
            </Flex>
          </CardHeader>
          <CardBody>
            <Flex
              columnGap={"20px"}
              rowGap={"40px"}
              flexWrap={"wrap"}
              pt="10px"
              pb="20px"
            >
              <Box width="31%">
                <Heading as="h6" size="xs" color={"textColor"} mb="3px">
                  Due Date:
                </Heading>
                <Text
                  fontSize="md"
                  color="danger.700"
                  fontWeight={"bold"}
                  display={"flex"}
                  alignItems={"center"}
                >
                  <Icons.BsCalendar2Date />
                  &nbsp;{" "}
                  {user?.package?.duration &&
                    user.package?.createdAt &&
                    addDaysInDate(
                      user.package.duration,
                      user.package.createdAt
                    )}{" "}
                  &nbsp;&nbsp;
                </Text>
              </Box>
              <Box width="31%">
                <Heading as="h6" size="xs" mb="3px">
                  Amount:
                </Heading>
                <Text
                  fontSize="md"
                  color={"#8f8f8f"}
                  fontWeight={"bold"}
                  display={"flex"}
                  alignItems={"center"}
                >
                  $ {user?.package?.cost}
                </Text>
              </Box>
              <Box width="31%">
                <Heading as="h6" size="xs" mb="3px">
                  Payment Method:
                </Heading>
                <Text
                  fontSize="md"
                  color={"#8f8f8f"}
                  fontWeight={"bold"}
                  display={"flex"}
                  alignItems={"center"}
                >
                  {user?.package?.paymentDetail?.method}
                </Text>
              </Box>
              <Box width="31%">
                <Heading as="h6" size="xs" mb="3px">
                  Storage:
                </Heading>
                <Text
                  fontSize="md"
                  color={"#8f8f8f"}
                  fontWeight={"bold"}
                  display={"flex"}
                  alignItems={"center"}
                >
                  {user?.package?.sizeInGB} GB
                </Text>
              </Box>
              <Box width="31%">
                <Heading as="h6" size="xs" mb="3px">
                  Email:
                </Heading>
                <Text
                  fontSize="md"
                  color={"#8f8f8f"}
                  fontWeight={"bold"}
                  display={"flex"}
                  alignItems={"center"}
                >
                  {user?.email}
                </Text>
              </Box>
              <Box width="31%">
                <Heading as="h6" size="xs" mb="3px">
                  Name:
                </Heading>
                <Text
                  fontSize="md"
                  color={"#8f8f8f"}
                  fontWeight={"bold"}
                  display={"flex"}
                  alignItems={"center"}
                >
                  {`${user?.first_name} ${user?.last_name}`}
                </Text>
              </Box>
            </Flex>
          </CardBody>
          <Flex justifyContent={"space-between"} columnGap={"20px"}>
            <Box w="50%">
              <FormHeading3
                title="Module Permissions"
                color="textColor"
                // searchBox
              />
              <PermissionsList
                permissions={modulePermissions}
                setPermissions={setModulePermissions}
                isDisabled={true}
                disableViews={false}
              />
            </Box>
            <Box borderLeft={"1px solid"} borderColor={"gray.200"}></Box>
            <Box w="50%">
              <FormHeading3
                title="Operation Permissions"
                color="textColor"
                // searchBox
              />
              <PermissionsList
                permissions={operationPermissions}
                setPermissions={setOperationPermissions}
                isDisabled={true}
                disableViews={false}
              />
            </Box>
          </Flex>
        </>
      )}
    </Card>
  );
};

export default MySubscriptionCard;
