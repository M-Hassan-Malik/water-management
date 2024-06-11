import { Box, Flex, Text } from "@chakra-ui/react";
import moment from "moment";
import { useSelector } from "react-redux";

import {
  Button,
  Modal as ChakraModal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@/common/chakra_imports/chakra_imports";

import { Attractions, Core } from "..";
import { Icons } from "../icons";

interface ModalMdProps {
  isOpen: boolean;
  onClose: () => void;
  onClick?: (id: any) => void;
  id: string;
  data?: any;
  lg?: boolean;
  DoubleXl?: boolean;
  type?: string;
}
const ModalMd: React.FC<ModalMdProps> = ({
  isOpen,
  onClose,
  data,
  lg,
  DoubleXl,
  type,
}) => {
  const user: IUser = useSelector((state: any) => state.user.user);

  return (
    <>
      {(type === "addAttraction" ||
        type === "editAttraction" ||
        type === "viewAttraction") && (
        <ChakraModal
          onClose={onClose}
          isOpen={isOpen}
          isCentered
          size={lg ? "lg" : DoubleXl ? "2xl" : "md"}
        >
          <ModalOverlay />
          <ModalContent backgroundColor="white.500">
            <ModalHeader textTransform={"capitalize"}>
              <Flex columnGap={"10px"} alignItems={"center"}>
                {type === "addAttraction" && "Add"}
                {type === "editAttraction" && "Edit"}
                {type === "viewAttraction" && "Details"}
              </Flex>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody pb="20px">
              {type === "addAttraction" && (
                <Attractions.ActionAttractionForm
                  type="add"
                  onClose={onClose}
                  userId={user._id as string}
                />
              )}
              {type === "editAttraction" && (
                <Attractions.ActionAttractionForm
                  data={data}
                  type="edit"
                  onClose={onClose}
                  userId={user._id as string}
                />
              )}
              {type === "viewAttraction" && (
                <Attractions.ActionAttractionForm
                  data={data}
                  type="view"
                  onClose={onClose}
                  userId={user._id as string}
                />
              )}
            </ModalBody>
          </ModalContent>
        </ChakraModal>
      )}
      {/* {type === "viewAttraction" && (
       
      )} */}
      {type === "notification" && (
        <ChakraModal
          onClose={onClose}
          isOpen={isOpen}
          isCentered
          size={lg ? "lg" : DoubleXl ? "2xl" : "md"}
        >
          <ModalOverlay />
          <ModalContent backgroundColor="white.500">
            <ModalHeader textTransform={"capitalize"}>
              <Flex columnGap={"10px"} alignItems={"center"}>
                {data.title}
                {/* <Core.IconicTag>{data.type}</Core.IconicTag> */}
                {data.type.toLowerCase() === "email" ? (
                  <Icons.TfiEmail fontSize={"16px"} color="gray.500" />
                ) : (
                  <Icons.IoMdNotificationsOutline color="gray.500" />
                )}

                <Box color="gray.500" mt={"2px"}>
                  {data.priority.toLowerCase() === "alert" ? (
                    <Core.Badge status="ALERT"></Core.Badge>
                  ) : data.priority.toLowerCase() === "emergency" ? (
                    <Core.Badge status="EMERGENCY"></Core.Badge>
                  ) : (
                    data.priority.toLowerCase() === "low" && (
                      <Core.Badge status="LOW"></Core.Badge>
                    )
                  )}
                </Box>
              </Flex>
              <Text fontSize="xs">
                {moment(data.createdAt).format("MMMM Do YYYY")}
              </Text>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>{data.text}</ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </ChakraModal>
      )}
    </>
  );
};

export default ModalMd;
