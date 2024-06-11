import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

import { Core } from "..";
import { Icons } from "../icons";

const dropdwonOptions = ["Completed", "Pending", "In Process"];
interface ITaskCardProps {
  task: any;
}

const TaskCard: React.FunctionComponent<ITaskCardProps> = ({ task }) => {
  const router = useRouter();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];
  let date = "";
  let time = "";

  const getDate = () => {
    date = `${task?.dueDateAndTime.getUTCDay()} ${
      months[task?.dueDateAndTime.getUTCMonth()]
    } ${task?.dueDateAndTime.getUTCFullYear()}`;
  };
  const getTime = () => {
    time = `${task?.dueDateAndTime.getUTCHours()}:${task?.dueDateAndTime.getUTCMinutes()}`;
  };
  getDate();
  getTime();
  const showDetails = () => {
    router.push(
      {
        pathname: "/tasks/details",
        // query: { type: "view", id },
      },
      undefined,
      {
        shallow: true,
      }
    );
  };
  return (
    <Card width={"100%"} maxW={"1100px"} size="md" p={2}>
      <CardHeader display={"flex"} justifyContent="space-between">
        <Heading size="md">{task?.title}</Heading>
        <Core.Badge status={task?.currentStatus} />
      </CardHeader>
      <CardBody>
        <Text>{task?.description}</Text>
        <Text
          pt="4"
          fontSize="xs"
          color="danger.700"
          fontWeight={"bold"}
          fontFamily={"Verdana"}
          display={"flex"}
          alignItems={"center"}
          columnGap={"5px"}
        >
          <Icons.BsCalendar2Date />
          {date}
          &nbsp;
          <Icons.BiTimeFive />
          {time}
          {/* {task?.dueDateAndTime} */}
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
          button="View/Assign Task"
          btnBlueMd
          onClick={showDetails}
        />
        <Flex columnGap={"5px"}>
          <Core.ActionsDropdown status dropdwonOptions={dropdwonOptions} />
          <Button
            variant="ghost"
            colorScheme="blue"
            leftIcon={<Icons.FiEdit2 />}
            size="sm"
          >
            Edit
          </Button>
          <Button
            variant="ghost"
            colorScheme="red"
            leftIcon={<Icons.AiOutlineDelete />}
            size="sm"
          >
            Delete
          </Button>
        </Flex>
      </CardFooter>
    </Card>
  );
};

export default TaskCard;
