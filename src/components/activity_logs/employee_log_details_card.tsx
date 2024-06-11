import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import moment from "moment";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { useQuery } from "react-query";

import type { FindActivityLogByIdQuery } from "@/graphql/generated/graphql";
import { Interface } from "@/graphql/generated/graphql";
import { FindActivityLogById } from "@/services/api";

import { Core } from "..";
import { HandleLogout } from "../auth";

interface IEmployeeLogDetailsCardProps {}

const EmployeeLogDetailsCard: React.FC<IEmployeeLogDetailsCardProps> = () => {
  const { query } = useRouter();
  const { id } = useMemo(() => query as unknown as IPageQuery, [query]);

  const [data, setData] = useState<
    FindActivityLogByIdQuery["findActivityLogById"]
  >({
    role: "",
    user_id: "",
    activity: "",
    dateTime: "",
    belongsTo: "",
    user_name: "",
    interface: Interface.Web,
  });

  const [error, setError] = useState<IAlertSuccessData>();

  useQuery(
    ["findActivityLogs"],
    () => FindActivityLogById({ findActivityLogByIdId: String(id) }),
    {
      onSuccess: (logData) => {
        setData(logData.findActivityLogById);
      },
      onError(_: any) {
        if (
          _?.response?.errors?.length &&
          _?.response?.errors[0]?.message === "Not Authorised!"
        )
          HandleLogout();
        setError({
          status: true,
          title: "Something went wrong",
          description: "Failed to get logs",
        });
      },
      refetchOnMount: true,
      enabled: Boolean(id),
    }
  );

  return (
    <>
      <Core.Alert show={error} theme="error" />
      <Card
        width={"100%"}
        maxW={"1100px"}
        borderRadius={"15px"}
        backgroundColor={"white.100"}
        size="sm"
        p={2}
      >
        {!data.user_name ? (
          <Flex
            width={"100%"}
            height={"240px"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Core.BtnSpinner size="md" />
          </Flex>
        ) : (
          <>
            <CardHeader
              display={"flex"}
              justifyContent="space-between"
              borderBottom={"1px solid #ddd"}
              mb="10px"
            >
              <Flex alignItems={"center"}>
                <Box as="span">Username:&nbsp;</Box>
                <Heading size="md">{data.user_name}</Heading>
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
                <Box width="32%">
                  <Heading as="h6" size="xs" mb="3px">
                    Interface
                  </Heading>
                  <Text
                    fontSize="md"
                    color={"#888"}
                    fontWeight={"bold"}
                    display={"flex"}
                    alignItems={"center"}
                  >
                    {data.interface}
                  </Text>
                </Box>
                <Box width="32%">
                  <Heading as="h6" size="xs" mb="3px">
                    Role
                  </Heading>
                  <Text
                    fontSize="md"
                    color={"#8f8f8f"}
                    fontWeight={"bold"}
                    display={"flex"}
                    alignItems={"center"}
                  >
                    {data.role.toUpperCase()}
                  </Text>
                </Box>
                <Box width="32%">
                  <Heading as="h6" size="xs" mb="3px">
                    Activity
                  </Heading>
                  <Text
                    fontSize="md"
                    color={"#8f8f8f"}
                    fontWeight={"bold"}
                    display={"flex"}
                    alignItems={"center"}
                  >
                    {data.activity}
                  </Text>
                </Box>
                <Box width="40%">
                  <Heading as="h6" size="xs" mb="3px">
                    Time
                  </Heading>
                  <Text
                    fontSize="md"
                    color={"#8f8f8f"}
                    fontWeight={"bold"}
                    display={"flex"}
                    alignItems={"center"}
                  >
                    {moment(data.dateTime).format(
                      "dddd, MMMM Do YYYY, h:mm:ss a"
                    )}
                  </Text>
                </Box>
              </Flex>
            </CardBody>
          </>
        )}
      </Card>
    </>
  );
};

export default EmployeeLogDetailsCard;
