import { Flex } from "@chakra-ui/react";
import * as React from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";

import { HandleLogout } from "@/components/auth";
import type { FindAllTasksQuery } from "@/graphql/generated/graphql";
import { FindAllTasks } from "@/services/api";

import { Core } from "..";
import TaskCard from "./task_card";

interface IViewTasksProps {}

const ViewTasks: React.FunctionComponent<IViewTasksProps> = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const user: IUser = useSelector((state: any) => state.user.user);
  const [allTasks, setAllTasks] = React.useState<
    FindAllTasksQuery["findAllTasks"]
  >([]);

  useQuery("listAllTasks", () => FindAllTasks({ creatorId: user._id || "" }), {
    onSuccess({ findAllTasks }) {
      setIsLoading(false);
      setAllTasks(findAllTasks);
    },
    onError(_: any) {
      if (
        _?.response?.errors?.length &&
        _?.response?.errors[0]?.message === "Not Authorised!"
      )
        HandleLogout();
      setIsLoading(false);
    },
    enabled: Boolean(user._id),
    refetchOnMount: true,
  });

  return (
    <Flex
      flexWrap={"wrap"}
      columnGap={"0.9%"}
      rowGap={"10px"}
      maxWidth={"1600px"}
      mx={"auto"}
      padding={"20px"}
      borderRadius={"10px"}
      // border="1px solid"
      borderWidth={"1px"}
      borderStyle={"bold"}
      borderColor={"gray.200"}
    >
      {isLoading ? (
        <Flex
          width={"100%"}
          height={"70vh"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Core.BtnSpinner size="lg" />
        </Flex>
      ) : (
        allTasks?.map((task: any) => {
          return <TaskCard key={task._id} task={task} />;
        })
      )}
    </Flex>
  );
};

export default ViewTasks;
