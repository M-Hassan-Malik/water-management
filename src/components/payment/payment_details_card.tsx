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
import { useState } from "react";
import { useQuery } from "react-query";

import { HandleLogout } from "@/components/auth";
import { GetUserPackageModuleById } from "@/services/api";
import { addDaysInDate, formatDateAndTime } from "@/utils/helpers/functions";

import { Core } from "..";
import { Icons } from "../icons";

interface IPaymentDetailsCardProps {}

interface IData {
  name?: string | null;
  title?: string | null;
  startDate?: Date | null;
  amount?: number | null;
  duration?: number | null;
  email?: string | null;
  paymentDetail?: any | null;
  status?: string | null;
}

const PaymentDetailsCard: React.FC<IPaymentDetailsCardProps> = () => {
  const { query } = useRouter();
  const { id } = query;
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<IData>();

  useQuery(
    ["getUserPackageModuleByUserId", id],
    () => GetUserPackageModuleById({ subscriptionId: (id as string) || "" }),
    {
      onSuccess({ getUserPackageModuleById }) {
        if (getUserPackageModuleById && getUserPackageModuleById?.ref) {
          setData({
            title: getUserPackageModuleById.title,
            name: `${getUserPackageModuleById.ref.first_name} ${getUserPackageModuleById.ref.last_name}`,
            amount: getUserPackageModuleById.cost,
            startDate: getUserPackageModuleById.createdAt,
            email: getUserPackageModuleById.ref.email,
            status: getUserPackageModuleById.status,
            duration: getUserPackageModuleById.duration,
            paymentDetail: getUserPackageModuleById.paymentDetail,
          });
        }
        setIsLoading(false);
      },
      onError(_: any) {
        if (
          _?.response?.errors?.length &&
          _?.response?.errors[0]?.message === "Not Authorised!"
        )
          HandleLogout();
        setIsLoading(false);
      },
      refetchOnMount: true,
      enabled: Boolean(id),
    }
  );

  return (
    <>
      {query?.type !== "add" && !data?.title ? (
        <Flex
          width={"100%"}
          height={"240px"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Core.BtnSpinner size="md" />
        </Flex>
      ) : (
        <Card
          width={"100%"}
          maxW={"1100px"}
          size="sm"
          p={2}
          backgroundColor={"white.100"}
        >
          {isLoading ? (
            <Flex
              width={"100%"}
              h={"200px"}
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
                <Flex>
                  <Box as="span">Package:&nbsp;</Box>
                  <Heading size="md">{data?.title}</Heading>
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
                      Payment Date:
                    </Heading>
                    <Text
                      fontSize="md"
                      color="danger.700"
                      fontWeight={"bold"}
                      display={"flex"}
                      alignItems={"center"}
                    >
                      <Icons.BsCalendar2Date />
                      {data?.startDate && formatDateAndTime(data?.startDate)}
                    </Text>
                  </Box>
                  <Box width="32%">
                    <Heading as="h6" size="xs" mb="3px">
                      Package Duration:
                    </Heading>
                    <Text
                      fontSize="md"
                      color="danger.700"
                      fontWeight={"bold"}
                      display={"flex"}
                      alignItems={"center"}
                    >
                      <Icons.BsCalendar2Date />
                      &nbsp; 6 months
                    </Text>
                  </Box>
                  <Box width="32%">
                    <Heading as="h6" size="xs" mb="3px">
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
                      {data?.startDate &&
                        data?.duration &&
                        addDaysInDate(data.duration, data.startDate)}
                      &nbsp;&nbsp;
                    </Text>
                  </Box>
                  <Box width="32%">
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
                      $ {data?.amount}
                    </Text>
                  </Box>
                  <Box width="32%">
                    <Heading as="h6" size="xs" mb="3px">
                      Payment Methods:
                    </Heading>
                    <Text
                      fontSize="md"
                      color={"#8f8f8f"}
                      fontWeight={"bold"}
                      display={"flex"}
                      alignItems={"center"}
                    >
                      {data?.paymentDetail?.method}
                    </Text>
                  </Box>
                  <Box width="32%">
                    <Heading as="h6" size="xs" mb="3px">
                      Subscription:
                    </Heading>
                    <Text
                      fontSize="md"
                      color={"#8f8f8f"}
                      fontWeight={"bold"}
                      display={"flex"}
                      alignItems={"center"}
                    >
                      <Core.ModificationStatus>
                        {data?.status || ""}
                      </Core.ModificationStatus>
                    </Text>
                  </Box>
                  <Box width="32%">
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
                      {data?.name}
                    </Text>
                  </Box>
                  <Box width="32%">
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
                      {data?.email}
                    </Text>
                  </Box>
                </Flex>
              </CardBody>
            </>
          )}
        </Card>
      )}
    </>
  );
};

export default PaymentDetailsCard;
