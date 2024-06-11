// import { StarIcon } from "@chakra-ui/icons";
import {
  Box,
  chakra,
  Flex,
  Heading,
  //  HStack
} from "@chakra-ui/react";
import { useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";

import { HandleLogout } from "@/components/auth";
import { GetMyTrainings } from "@/services/api";
import { formatDateAndTime } from "@/utils/helpers/functions";

import { Alert, LoadingComponent } from "../core";
import { Icons } from "../icons";
import TrainingSelected from "./selected";

interface ITrainingProps {}

const Training: React.FC<ITrainingProps> = () => {
  const [selectedActivity, setSelectedActivity] = useState<ITraining>();
  const [activities, setActivities] = useState<ITraining[]>([]);
  const [fail, setFail] = useState<IAlertSuccessData>();
  const user: IUser = useSelector((state: any) => state.user.user);

  const { isFetching } = useQuery(
    ["getMySessions"],
    () => GetMyTrainings({ creatorId: user._id || "" }),
    {
      onSuccess: ({ getMyTrainings }: { getMyTrainings: ITraining[] }) => {
        if (getMyTrainings) setActivities(getMyTrainings);
      },
      onError(_: any) {
        if (
          _?.response?.errors?.length &&
          _?.response?.errors[0]?.message === "Not Authorised!"
        )
          HandleLogout();
        setFail({
          status: true,
          title: "Failed",
          description: "Unable to get Training Sessions.",
        });
      },
      enabled: Boolean(user._id),
      refetchOnMount: true,
    }
  );

  const handleActivitySelect = (activity: ITraining) => {
    setSelectedActivity(activity);
  };

  return (
    <Flex
      borderRadius="10px"
      padding="20px"
      backgroundColor={"orange.40"}
      minHeight={"50vh"}
      className="training-div"
    >
      <Alert show={fail} theme="error" />
      {activities?.length ? (
        <>
          <Box
            width="40%"
            maxWidth={"500px"}
            pr={"10px"}
            //  borderRight={"1px solid"} borderColor={"gray.200"}
          >
            <Box
              // maxHeight={"80vh"}
              // overflowY={"scroll"}
              pr="15px"
              className="orange-scrollbar"
            >
              {activities?.map((activity) => (
                <Flex
                  maxW="md"
                  backgroundColor={"white.100"}
                  shadow={activity._id === selectedActivity?._id ? "lg" : "xs"}
                  opacity={activity._id === selectedActivity?._id ? 1 : 0.6}
                  rounded="lg"
                  // overflow="hidden"
                  key={activity._id}
                  mb="15px"
                  cursor="pointer"
                  onClick={() => handleActivitySelect(activity)}
                  position={"relative"}
                >
                  {activity._id === selectedActivity?._id && (
                    <>
                      <Flex
                        position="absolute"
                        right="-20px"
                        top="0"
                        bottom="0"
                        alignItems="center"
                        justify="center"
                      >
                        <Box
                          width="0px"
                          height="0px"
                          borderTop={"20px solid transparent"}
                          borderLeft={"20px solid orange"}
                          borderBottom={"20px solid transparent"}
                        ></Box>
                      </Flex>
                      <Flex
                        w={1 / 3}
                        justifyContent={"center"}
                        alignItems={"center"}
                        backgroundColor={"orange.900"}
                        rounded="lg"
                      >
                        <Icons.GiTeacher color="#fff" fontSize={"80px"} />
                      </Flex>
                    </>
                  )}
                  <Box
                    w={2 / 3}
                    p={{
                      base: 3,
                      md: 3,
                    }}
                  >
                    <chakra.h1
                      fontSize="xl"
                      fontWeight="bold"
                      lineHeight={"20px"}
                    >
                      {activity.title}
                    </chakra.h1>
                    <chakra.p
                      mt={1}
                      fontSize="xs"
                      css={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      text
                      {/* {activity?.text} */}
                    </chakra.p>

                    {/* <HStack spacing={1} display="flex" alignItems="center" mt={2}>
                  <StarIcon
                    color="gray.700"
                    
                  />
                  <StarIcon
                    color="gray.700"
                    
                  />
                  <StarIcon
                    color="gray.700"
                    
                  />
                  <StarIcon color="gray.500" />
                  <StarIcon color="gray.500" />
                </HStack> */}

                    <Flex
                      mt={2}
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <chakra.h1
                        color="orange.900"
                        fontWeight="bold"
                        fontSize="xs"
                      >
                        {formatDateAndTime(activity.createdAt)}
                      </chakra.h1>
                    </Flex>
                  </Box>
                </Flex>
              ))}
            </Box>
          </Box>
          {selectedActivity ? (
            <TrainingSelected
              selectedActivity={selectedActivity}
              setSelectedActivity={setSelectedActivity}
            />
          ) : (
            <Flex
              width={"100%"}
              height={"50vh"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              {isFetching ? (
                <LoadingComponent minH={"100vh"} />
              ) : (
                <Heading color="#aaa" userSelect={"none"}>
                  Please select a training!
                </Heading>
              )}
            </Flex>
          )}
          {/* </Box> */}
        </>
      ) : (
        <Flex
          width={"100%"}
          height={"50vh"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Heading color="#aaa" userSelect={"none"}>
            No Training
          </Heading>
        </Flex>
      )}
    </Flex>
  );
};

export default Training;
