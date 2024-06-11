import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";

import { formatDateAndTime } from "@/utils/helpers/functions";

import { Core } from "..";

interface SubmittedReportFormProps {
  formFields: IFormField[];
  DropZone?: any;
  deleteItem?: any;
  editItem?: any;
  templateName: string;
  pageType?: string;
}

const SubmittedReportForm: React.FC<SubmittedReportFormProps> = ({
  formFields,
  templateName,
}) => {
  // const [error, setError] = useState<string>("");

  return (
    <Box
      maxW={"800px"}
      padding={"20px"}
      borderRadius={"10px"}
      backgroundColor={"white.500"}
      boxShadow={"0px 2px 5px 2px rgba(0,0,0,0.05)"}
      mx={"auto"}
    >
      <Core.H5 pb="10px">{templateName}</Core.H5>
      <Flex flexDirection={"column"} justifyContent={"space-between"}>
        <Flex
          rowGap={"10px"}
          columnGap={"2px"}
          flexWrap={"wrap"}
          justifyContent={"space-between"}
        >
          {formFields.map((field) => {
            if (
              field.type === "text" ||
              field.type === "password" ||
              field.type === "number" ||
              field.type === "email"
            ) {
              return (
                <Box key={field._id} width={"49%"}>
                  <Text fontSize={"12px"} textTransform={"capitalize"} mb="2px">
                    {field?.label}
                  </Text>
                  <Core.Input value={field?.value} />
                </Box>
              );
            }
            if (field.type === "textarea") {
              return (
                <Box key={field._id} width={"100%"}>
                  <Text fontSize={"12px"} textTransform={"capitalize"} mb="2px">
                    {field?.label}
                  </Text>
                  <Core.Textarea
                    width={"100%"}
                    height="150px"
                    value={field?.value}
                  />
                </Box>
              );
            }
            if (field.type === "select") {
              return (
                <Box key={field._id} width={"49%"}>
                  <Text fontSize={"12px"} textTransform={"capitalize"} mb="2px">
                    {field?.label}
                  </Text>
                  <Core.Input value={"0000"} />
                </Box>
              );
            }
            if (field.type === "date") {
              return (
                <Box key={field._id} width={"49%"}>
                  <Text fontSize={"12px"} textTransform={"capitalize"} mb="2px">
                    {field?.label}
                  </Text>
                  <Core.Input
                    value={
                      field?.value && formatDateAndTime(new Date(field.value))
                    }
                  />
                </Box>
              );
            }
            if (field.type === "mcqs") {
              return (
                <Box key={field._id} width={"100%"}>
                  <Text
                    fontSize={"12px"}
                    textTransform={"capitalize"}
                    mb="2px"
                    fontWeight={"bold"}
                  >
                    Q: {field?.label}
                  </Text>
                  <Core.Input value={field?.value} />
                </Box>
              );
            }
            if (field.type === "image") {
              return (
                <Box key={field._id} width={"49%"}>
                  <Text fontSize={"12px"} textTransform={"capitalize"} mb="2px">
                    Image
                  </Text>
                  <Image
                    alt=""
                    src={
                      "https://blog.hubspot.com/hs-fs/hubfs/parts-url-hero.jpg?width=595&height=400&name=parts-url-hero.jpg"
                    }
                    width={"100%"}
                    height={"fit-content"}
                    borderRadius={"10px"}
                  />
                </Box>
              );
            }
            if (field.type === "video") {
              return (
                <Box key={field._id} width={"49%"}>
                  <Text fontSize={"12px"} textTransform={"capitalize"} mb="2px">
                    Video
                  </Text>
                  <Core.Video
                    src={"https://www.youtube.com/embed/rw7bxTqkYYs"}
                    width={"100%"}
                  />
                </Box>
              );
            }
            return null;
          })}
          {/* {error && (
            <Alert status="error" mt="15px">
              <AlertIcon />
              {error}
            </Alert>
          )} */}
        </Flex>
      </Flex>
    </Box>
  );
};
export default SubmittedReportForm;
