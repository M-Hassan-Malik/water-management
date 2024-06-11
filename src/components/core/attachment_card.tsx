import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import Image from "next/image";
import Path from "path";

interface AttachmentCardProps {
  attachment: any;
}

const AttachmentCard: React.FC<AttachmentCardProps> = ({ attachment }) => {
  // Path.basename
  const attachmentName = Path.basename(attachment?.src);
  return (
    <Flex
      flexDirection={"column"}
      justifyContent={"start"}
      alignItems={"center"}
      cursor={"pointer"}
      // w={"auto"}
      maxW="126px"
      overflow={"hidden"}
      // borderWidth={"2px"}
      // borderColor={"#000000"}
      className="attachment-card"
    >
      <Box
        // w="17rem"
        display="inline-block"
        p={3}
        width={"100%"}
        border="1px solid"
        borderColor={useColorModeValue("gray.400", "gray.600")}
        rounded="md"
        margin="0 auto"
        _hover={{
          boxShadow: useColorModeValue(
            "0 4px 6px rgba(160, 174, 192, 0.6)",
            "0 4px 6px rgba(9, 17, 28, 0.4)"
          ),
        }}
      >
        {/* <Tooltip
          label="Lahore, Pakistan"
          aria-label="Lahore, Pakistan"
          placement="right-end"
          size="sm"
          // Sizes for Tooltip are not implemented in the default theme. You can extend the theme to implement them
        > */}
        <Box pos="relative">
          <Image
            src={attachment?.src}
            //  name="Muhammad Ahmad"
            //  size="xl"
            width={50}
            height={50}
            alt="image"
            //  borderRadius="md"
          />
          {/* <Avatar
            src={attachment?.src}
            name="Muhammad Ahmad"
            size="xl"
            borderRadius="md"
          /> */}
        </Box>
        {/* </Tooltip> */}
      </Box>
      {/* <Divider /> */}
      <Text fontSize="10px" color="textColor" opacity={"0.7"} pt="3px" px="3px">
        {attachmentName || "--"}
      </Text>
    </Flex>
  );
};

export default AttachmentCard;
