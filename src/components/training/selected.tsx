import {
  Box,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import { useMutation } from "react-query";

import { DeleteTraining, queryClient } from "@/services/api";
import { formatDateAndTime } from "@/utils/helpers/functions";

import { Core } from "..";

interface TrainingSelectedProps {
  selectedActivity?: ITraining;
  onlyView?: boolean;
  setSelectedActivity?: Dispatch<SetStateAction<ITraining | undefined>>;
}

const TrainingSelected: React.FC<TrainingSelectedProps> = ({
  selectedActivity,
  onlyView,
  setSelectedActivity,
}) => {
  const router = useRouter();
  const { query } = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [success, setSuccess] = useState<IAlertSuccessData>();
  const [fail, setFail] = useState<IAlertSuccessData>();

  const onAssignClick = (id: any) => {
    router.push(
      {
        pathname: `/trainings/assign`,
        query: { id },
      },
      undefined,
      { shallow: true }
    );
  };
  const onEditClick = (id: any) => {
    router.push(
      {
        pathname: `/trainings/edit`,
        query: { id },
      },
      undefined,
      { shallow: true }
    );
  };

  const { mutate: deleteMutation } = useMutation(
    "deleteTrainingTemplate",
    DeleteTraining,
    {
      onSuccess: ({ deleteTraining }) => {
        setSuccess({
          status: true,
          title: "Success",
          description: deleteTraining?.message || "",
        });
        if (setSelectedActivity) {
          setSelectedActivity(undefined);
        }
        onClose();
        queryClient.invalidateQueries({
          queryKey: ["getMySessions"],
        });
      },
      onError: (_: any) => {
        setFail({
          status: true,
          title: "Failed",
          description: _?.response?.errors[0]?.message,
        });
        if (setSelectedActivity) {
          setSelectedActivity(undefined);
        }
      },
    }
  );

  const onDeleteClick = () => {
    onOpen();
  };

  const confirmAction = (_: string) => {
    deleteMutation({
      trainingTemplateId: _,
    });
  };

  const renderContent = (item: any) => {
    if (item.detail && !item?.image?.data && !item?.video?.data) {
      return (
        <Text color={"textColor"} fontSize={"18px"} my={"10px"}>
          {item.detail}
        </Text>
      );
    }
    if (!item.detail && item?.image?.data && !item?.video?.data) {
      return (
        <Box my={"10px"}>
          <Image
            alt=""
            src={item?.image?.data}
            width={"70%"}
            height={"fit-content"}
            borderRadius={"10px"}
            my={"15px"}
          />
        </Box>
      );
    }
    if (!item.detail && !item?.image?.data && item?.video?.data) {
      return (
        <Box my={"10px"}>
          <Core.Video
            src={item?.video?.data}
            minW={"70%"}
            maxW={"70%"}
            width={"70%"}
            minH="300px"
          />
        </Box>
      );
    }
    if (item.detail && item?.image?.data && !item?.video?.data) {
      return (
        <Flex
          justifyContent={"start"}
          columnGap={"15px"}
          flexDirection={"row"}
          my={"10px"}
        >
          <Image
            alt=""
            src={item?.image?.data}
            minW={"220px"}
            maxW={"220px"}
            height={"fit-content"}
            width={"100%"}
            borderRadius={"10px"}
          />
          <Text color={"textColor"} fontSize={"18px"} mt={"5px"}>
            {item.detail}
          </Text>
        </Flex>
      );
    }
    if (item.detail && !item?.image?.data && item?.video?.data) {
      return (
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
          <Text color={"textColor"} fontSize={"18px"} mt={"5px"}>
            {item.detail}
          </Text>
        </Flex>
      );
    }
    return null;
  };

  return (
    <Box
      borderRadius="10px"
      padding="20px"
      boxShadow="0px 2px 5px 2px rgba(0,0,0,0.05)"
      backgroundColor="white.100"
      maxW={query.type === "view" ? "700px" : "800px"}
      mx={"auto"}
      width={"full"}
      position={"relative"}
      // overflow={"hidden"}
      height={"max-content"}
      overflowY={"scroll"}
      maxHeight={"800px"}
      className="training-view-div"
    >
      <Core.Alert show={success} theme="success" />
      <Core.Alert show={fail} theme="error" />
      {selectedActivity?._id && (
        <Core.Modal
          isOpen={isOpen}
          onClose={onClose}
          onClick={confirmAction}
          id={selectedActivity._id}
        />
      )}
      <Flex
        position="absolute"
        top={"14px"}
        right={"14px"}
        zIndex={1}
        columnGap={"5px"}
      >
        {query.type === "view" || query.type === "edit" ? (
          ""
        ) : (
          <>
            {!onlyView ? (
              <>
                <Core.IconicButton
                  onClick={() =>
                    onAssignClick(selectedActivity && selectedActivity?._id)
                  }
                  button="assign"
                  size={"md"}
                ></Core.IconicButton>
                <Core.IconicButton
                  onClick={() =>
                    onEditClick(selectedActivity && selectedActivity?._id)
                  }
                  button="edit"
                  size={"md"}
                ></Core.IconicButton>
                <Core.IconicButton
                  onClick={onDeleteClick}
                  button="delete"
                  size={"md"}
                ></Core.IconicButton>
              </>
            ) : (
              ""
            )}
          </>
        )}
      </Flex>
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
        <Heading
          // color={useColorModeValue("gray.700", "white")}
          color={"textColor"}
          fontSize={"2xl"}
          fontFamily={"body"}
        >
          {selectedActivity && selectedActivity?.title}
        </Heading>
        <Box>
          {selectedActivity &&
            selectedActivity?.sessions?.map((item: any, index: number) => {
              return (
                <Box
                  key={index}
                  borderBottomWidth={"1px"}
                  borderColor={"white.100"}
                >
                  {renderContent(item)}
                </Box>
              );
            })}
        </Box>
      </Flex>
      <Stack mt={6} direction={"row"} spacing={4} align={"center"}>
        {/* <Avatar src={"https://avatars0.githubusercontent.com/u/1164541?v=4"} /> */}
        <Stack direction={"column"} spacing={0} fontSize={"sm"}>
          <Text fontWeight={600}>
            Added By:
            {typeof selectedActivity?.createdBy === "object" &&
              ` ${selectedActivity?.createdBy?.first_name} ${selectedActivity?.createdBy?.last_name}`}
          </Text>
          <Text
            fontFamily={"verdana"}
            color={"textColor"}
            fontSize={"12px"}
            opacity={0.7}
          >
            {selectedActivity && formatDateAndTime(selectedActivity.createdAt)}
          </Text>
        </Stack>
      </Stack>
    </Box>
  );
};
export default TrainingSelected;
