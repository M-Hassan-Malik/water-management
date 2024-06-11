import { useState } from "react";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Modal as ChakraModal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@/common/chakra_imports/chakra_imports";

import { Core } from "..";

interface ModalBoxProps {
  isOpen: boolean;
  onClose: () => void;
  onClick: (id: any) => void;
  id: string;
}
const Modal: React.FC<ModalBoxProps> = ({ isOpen, onClose, onClick, id }) => {
  const [disable, setDisable] = useState(true);

  const confirmDelete = (e: any) => {
    if (e.target.value === "DELETE") setDisable(false);
    else setDisable(true);
  };

  return (
    <ChakraModal isCentered isOpen={isOpen} onClose={onClose}>
      {/* <ModalOverlay
          bg="none"
          backdropFilter="auto"
          backdropInvert="80%"
          backdropBlur="2px"
        /> */}
      <ModalOverlay />
      <ModalContent backgroundColor="white.500">
        <ModalHeader>Confirm Delete!</ModalHeader>
        <ModalCloseButton />
        <ModalBody>Sure, you want to delete?</ModalBody>
        <ModalFooter display={"flex"} flexDirection={"column"}>
          <Box display={"flex"} justifyContent={"start"}>
            <Button colorScheme="gray" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              isDisabled={disable}
              colorScheme="red"
              onClick={() => {
                onClick(id);
                setDisable(true);
              }}
            >
              Yes
            </Button>
          </Box>
          <FormControl>
            <FormLabel color="textColor" py="10px" userSelect={"none"}>
              Please type &quot;DELETE&quot;
            </FormLabel>
            <Core.Input
              // helpText={`please type "DELETE"`}
              placeholder="DELETE"
              onChange={confirmDelete}
            />
          </FormControl>
        </ModalFooter>
      </ModalContent>
    </ChakraModal>
  );
};

export default Modal;
