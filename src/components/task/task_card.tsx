import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Text,
} from "@chakra-ui/react";
import moment from "moment";
import { useRouter } from "next/router";
import * as React from "react";

import type { Task } from "@/graphql/generated/graphql";

import { Core } from "..";
import { Icons } from "../icons";

interface ITaskCardProps {
  task: Task;
}

const TaskCard: React.FunctionComponent<ITaskCardProps> = ({ task }) => {
  const { push } = useRouter();
  // const date = "";
  // const time = "";
  const showDetails = () => {
    push(
      {
        pathname: "/tasks/details",
        query: { id: task._id, from: "list" },
      },
      undefined,
      {
        shallow: true,
      }
    );
  };

  return (
    <Card
      size="sm"
      width={"32.7%"}
      maxW={"512px"}
      backgroundColor={"white.100"}
      p={2}
    >
      <CardHeader
        display={"flex"}
        flexDirection={"column"}
        justifyContent="space-between"
        alignItems={"start"}
      >
        <Heading size="md">{task?.title}</Heading>
        {/* <Core.Badge status={String("task?.status")} /> */}
        <Text opacity={0.7} fontSize={"xs"} mt="5px">
          <strong>Created By: </strong>
          {task?.createdBy?.first_name}&nbsp;{task?.createdBy?.last_name}
        </Text>
      </CardHeader>
      <CardBody pt={0}>
        <Text
          fontSize={"12px"}
          minHeight={"80px"}
          maxHeight={"80px"}
          overflow={"auto"}
          borderRadius={"5px"}
          backgroundColor={"white.200"}
          padding={"5px 8px"}
        >
          {task?.detail}
        </Text>
        <Text
          display={"flex"}
          alignItems={"center"}
          columnGap={"5px"}
          fontSize="xs"
          color="green.500"
          fontWeight={"bold"}
          fontFamily={"Verdana"}
          opacity={"0.7"}
          pt="4"
        >
          <Icons.BsCalendar2Date />
          {moment(task?.createdAt).format("MMMM Do YYYY")}&nbsp;
          <Icons.BiTimeFive />
          {moment(task?.createdAt).format("h:mm a")}
        </Text>
      </CardBody>
      <CardFooter
        justify="space-between"
        sx={{
          "& > button": {
            minW: "136px",
          },
        }}
      >
        <Core.Button
          button="View Task Detail"
          btnBlueMd
          onClick={showDetails}
        />
      </CardFooter>
    </Card>
  );
};

export default TaskCard;
