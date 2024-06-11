import {
  // Avatar,
  Box,
  Flex,
  // Heading,
  Image,
  // Stack,
  Text,
  // useColorModeValue,
} from "@chakra-ui/react";

import { Core } from "..";

interface UserTrainingSessionProps {
  trainingSession?: ISessionsSubmissions;
}

const UserTrainingSession: React.FC<UserTrainingSessionProps> = ({
  trainingSession,
}) => {
  const renderContent = (item: ISessions) => {
    // Only Detail Text
    if (item.detail && !item?.image?.data && !item?.video?.data) {
      return (
        <Flex justifyContent={"space-between"}>
          <Text color={"gray.500"} fontSize={"18px"} my={"10px"}>
            {item.detail}
          </Text>
        </Flex>
      );
    }
    // Only Image
    if (!item.detail && item?.image?.data && !item?.video?.data) {
      return (
        <Flex justifyContent={"space-between"}>
          <Box my={"10px"}>
            <Image
              alt=""
              src={item.image.data}
              width={"70%"}
              height={"fit-content"}
              borderRadius={"10px"}
              my={"15px"}
            />
          </Box>
          <Text>
            {item.image.complete === false ? "Incomplete" : "Complete"}
          </Text>
        </Flex>
      );
    }
    // Only Video
    if (!item.detail && !item?.image?.data && item?.video?.data) {
      return (
        <Flex justifyContent={"space-between"}>
          <Box my={"10px"}>
            <Core.Video
              src={item.video.data}
              minW={"70%"}
              maxW={"70%"}
              width={"70%"}
              minH="300px"
            />
          </Box>
          <Text>
            {item.video.complete === false ? "Incomplete" : "Complete"}
          </Text>
        </Flex>
      );
    }
    // Only Detail with Image
    if (item.detail && item?.image?.data && !item?.video?.data) {
      return (
        <Flex justifyContent={"space-between"}>
          <Flex
            justifyContent={"start"}
            columnGap={"15px"}
            flexDirection={"row"}
            my={"10px"}
          >
            <Image
              alt=""
              src={item.image.data}
              minW={"220px"}
              maxW={"220px"}
              height={"fit-content"}
              width={"100%"}
              borderRadius={"10px"}
            />
            <Text color={"gray.500"} fontSize={"18px"} mt={"5px"}>
              {item.detail}
            </Text>
          </Flex>
          <Text>
            {item.image.complete === false ? "Incomplete" : "Complete"}
          </Text>
        </Flex>
      );
    }
    // Only Detail with Video
    if (item.detail && !item?.image?.data && item?.video?.data) {
      return (
        <Flex justifyContent={"space-between"}>
          <Flex
            justifyContent={"start"}
            columnGap={"15px"}
            flexDirection={"row"}
            my={"10px"}
          >
            <Core.Video
              src={item?.video?.data}
              minW={"220px"}
              maxW={"220px"}
              width={"100%"}
            />
            <Text color={"gray.500"} fontSize={"18px"} mt={"5px"}>
              {item.detail}
            </Text>
          </Flex>
          <Text>
            {item.video.complete === false ? "Incomplete" : "Complete"}
          </Text>
        </Flex>
      );
    }
    return null;
  };
  return (
    <Box
      height={"max-content"}
      borderRadius="10px"
      padding="20px"
      boxShadow="0px 2px 5px 2px rgba(0,0,0,0.05)"
      backgroundColor="white.500"
      maxWidth={"700px"}
      mx={"auto"}
      width={"full"}
      position={"relative"}
      overflowY={"scroll"}
      maxHeight={"100%"}
      className="training-view-div"
    >
      <Flex flexDirection={"column"}>
        <Text
          color={"green.500"}
          textTransform={"uppercase"}
          fontWeight={800}
          fontSize={"sm"}
          letterSpacing={1.1}
        >
          Training
        </Text>
        {/* <Heading
          color={useColorModeValue("gray.700", "white")}
          fontSize={"2xl"}
          fontFamily={"body"}
        >
          {(trainingSession?.trainingRef &&
            typeof trainingSession.trainingRef === "object" &&
            trainingSession.trainingRef.title) ||
            "---"}
        </Heading> */}
        <Box>
          {trainingSession &&
            trainingSession?.session?.map((item: any, index: number) => {
              return (
                <Box key={index} borderBottom={"1px solid #ccc"}>
                  {renderContent(item)}
                </Box>
              );
            })}
        </Box>
      </Flex>
      {/* <Stack mt={6} direction={"row"} spacing={4} align={"center"}>
        <Avatar src={"https://avatars0.githubusercontent.com/u/1164541?v=4"} />
        <Stack direction={"column"} spacing={0} fontSize={"sm"}>
          <Text fontWeight={600}>
            {trainingSession?.userRef &&
              typeof trainingSession.userRef === "object" &&
              `${trainingSession.userRef.first_name} ${trainingSession?.userRef.last_name}`}
          </Text>
        </Stack>
      </Stack> */}
    </Box>
  );
};
export default UserTrainingSession;
