import {
  Avatar,
  Box,
  Flex,
  FormControl,
  Image,
  Input,
  Stack,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";

import { HandleLogout } from "@/components/auth";
import type {
  SessionSubmissions,
  TrainingSession,
} from "@/graphql/generated/graphql";
import { GetAssignedTrainingById } from "@/services/api";
import { formatDateAndTime } from "@/utils/helpers/functions";

import { Core } from "..";
import { H2 } from "../core";

interface Slot {
  text: string;
  image: any;
  video: any;
}
const TrackSingleTraining: React.FC = () => {
  const { query } = useRouter();
  const user: IUser = useSelector((state: any) => state.user.user);
  const [fail, setFail] = useState<IAlertSuccessData>();
  const [training, setTraining] = useState<TrainingSession>();
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selectedSession, setSelectedSession] = useState<SessionSubmissions>();

  useQuery(
    ["GetAssignedTrainingById"],
    () => GetAssignedTrainingById({ taskId: query?.id as string }),
    {
      onSuccess: ({ getAssignedTrainingById }) => {
        if (getAssignedTrainingById) {
          setTraining(getAssignedTrainingById as TrainingSession);
          if (
            getAssignedTrainingById?.sessions &&
            getAssignedTrainingById.sessions[0]
          ) {
            setSelectedSession(
              getAssignedTrainingById.sessions[0] as SessionSubmissions
            );

            setSlots(
              getAssignedTrainingById.sessions[0].session.map(
                (_) =>
                  ({
                    text: _?.detail as any | "",
                    image: _?.image?.data as any | "",
                    video: _.video?.data as any | "",
                  } as Slot)
              )
            );
          }
        }
      },
      onError(_: any) {
        if (
          _?.response?.errors?.length &&
          _?.response?.errors[0]?.message === "Not Authorised!"
        )
          HandleLogout();
        setFail({
          status: true,
          title: "Unable to get user",
          description: "Failed to Map User on fields.",
        });
      },
      enabled: Boolean(query?.id),
      refetchOnMount: true,
    }
  );
  return (
    <Flex justifyContent={"space-between"} columnGap={"20px"} maxWidth="1300px">
      <Core.Alert show={fail} theme="error" />
      <Flex
        direction="column"
        pt={"60px"}
        rowGap={"30px"}
        width={"30%"}
        maxWidth={"400px"}
      >
        {/* Assign-To start */}
        <Box>
          <Core.H6 color="textColor">Assign To:</Core.H6>
          <Stack
            display={"inline-flex"}
            direction={"row"}
            spacing={2}
            align={"center"}
            padding={"10px"}
            borderRadius={"10px"}
            backgroundColor={"white.100"}
            boxShadow={"0px 2px 5px 2px rgba(0,0,0,0.05)"}
            mt="10px"
          >
            <Avatar
              src={
                user?.photo_url
                  ? user.photo_url
                  : "https://avatars0.githubusercontent.com/u/1164541?v=4"
              }
            />
            <Stack direction={"column"} spacing={0} fontSize={"sm"}>
              <Text fontWeight={600}>
                {training?.userRef?.first_name} {training?.userRef?.last_name}
              </Text>
            </Stack>
          </Stack>
        </Box>
        {/* Assign To end */}
        {/* submissions start */}
        <Box>
          <Core.H6 color="textColor">Submissions:</Core.H6>
          <Flex gap={"5px"} flexWrap={"wrap"} mt="10px">
            {training?.sessions?.map((value, i: number) => {
              return (
                <Box
                  key={i}
                  onClick={() => {
                    setSelectedSession(value);
                    const sessionSlots: any = value.session?.map(
                      (_) =>
                        ({
                          text: _?.detail as any | "",
                          image: _?.image?.data as any | "",
                          video: _.video?.data as any | "",
                        } as Slot)
                    );
                    setSlots(sessionSlots);
                  }}
                  fontSize="sm"
                  color={
                    value.session[0]?._id === selectedSession?.session[0]?._id
                      ? "white.500"
                      : "gray.500"
                  }
                  fontWeight={"bold"}
                  display={"inline-block"}
                  alignItems={"center"}
                  borderRadius={"5px"}
                  cursor={"pointer"}
                  padding="5px 8px"
                  backgroundColor={
                    value.session[0]?._id === selectedSession?.session[0]?._id
                      ? "gray.500"
                      : "gray.200"
                  }
                  _hover={{
                    color: "white.500",
                    backgroundColor: "gray.500",
                  }}
                  transition={"all .3s ease"}
                >
                  <Flex justifyContent={"end"} my="3px">
                    {/* <Core.Badge sm status={status: value?.status}></Core.Badge> */}
                  </Flex>
                  <Text fontSize={"12px"}>
                    Date:{" "}
                    {value?.date &&
                      formatDateAndTime(new Date(Number(value.date)))}
                  </Text>
                </Box>
              );
            })}
          </Flex>
        </Box>
        {/* submissions end */}
      </Flex>
      <Box width={"100%"}>
        <Box textAlign={"center"} mb={"20px"}>
          <H2>Training Preview:</H2>
          {selectedSession && (
            <Core.Badge status={String(selectedSession?.status)} />
          )}
        </Box>
        <VStack spacing={4} align="start" width="100%">
          {slots?.map((slot, index) => (
            <Flex
              key={index}
              width="100%"
              columnGap="10px"
              borderRadius="10px"
              backgroundColor="gray.200"
              padding="15px"
              alignItems={"center"}
              position={"relative"}
            >
              <VStack flex={1.5}>
                <Tabs
                  isLazy={true}
                  size="sm"
                  variant="soft-rounded"
                  colorScheme="blue"
                  maxWidth="250px"
                  width={"100%"}
                  defaultIndex={slot?.video ? 0 : 1}
                >
                  <TabPanels width={"100%"}>
                    <TabPanel padding={0}>
                      {/* Video */}
                      <FormControl>
                        <Flex flexDirection="column" rowGap="10px">
                          <Box
                            maxWidth="210px"
                            width="100%"
                            maxHeight="120px"
                            position="relative"
                          >
                            <Box
                              as="span"
                              top="5px"
                              right="5px"
                              position="absolute"
                            >
                              <Input
                                type="file"
                                id={`videoInput_${index}`}
                                name={`video_${index}`}
                                height="100%"
                                width="100%"
                                position="absolute"
                                top="0"
                                left="0"
                                opacity="0"
                                aria-hidden="true"
                                accept="video/*"
                                zIndex={5}
                              />
                            </Box>

                            <Box
                              maxWidth="210px"
                              width="100%"
                              height="120px"
                              maxHeight="120px"
                            >
                              {slot?.video && (
                                <Core.Video
                                  src={slot?.video}
                                  width="100%"
                                  height="120px"
                                />
                              )}
                            </Box>
                          </Box>
                        </Flex>
                      </FormControl>
                    </TabPanel>
                    <TabPanel padding={0}>
                      {/* Image */}
                      <FormControl>
                        <Flex flexDirection="column" rowGap="10px">
                          <Box
                            maxWidth="210px"
                            width="100%"
                            height="120px"
                            maxHeight="120px"
                            position="relative"
                          >
                            <Box
                              as="span"
                              top="5px"
                              right="5px"
                              position="absolute"
                            >
                              <Input
                                type="file"
                                id={`imageInput_${index}`}
                                name={`image_${index}`}
                                height="100%"
                                width="100%"
                                position="absolute"
                                top="0"
                                left="0"
                                opacity="0"
                                aria-hidden="true"
                                accept="image/*"
                                zIndex={5}
                              />
                            </Box>

                            <Box
                              maxWidth="210px"
                              width="100%"
                              height="120px"
                              maxHeight="120px"
                            >
                              <Image
                                src={slot?.image}
                                width="100%"
                                rounded="5px"
                                alt="logo"
                                className="chakra-image"
                              />
                            </Box>
                          </Box>
                        </Flex>
                      </FormControl>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </VStack>
              {/* Text */}
              <FormControl width="60%" flex={4}>
                <Textarea
                  isDisabled={true}
                  placeholder="Write Something to help describe task."
                  backgroundColor="white.500"
                  value={slot.text}
                  rows={5}
                  minHeight={"128px"}
                />
              </FormControl>
            </Flex>
          ))}
        </VStack>
      </Box>
    </Flex>
  );
};

export default TrackSingleTraining;
