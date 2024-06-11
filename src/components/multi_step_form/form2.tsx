import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  SimpleGrid,
} from "@chakra-ui/react";
import { useState } from "react";

import logoPlaceholder from "../../assets/logo/logo-placeholder.png";
import { Core } from "..";

const Form2: React.FunctionComponent<FormPartsProps> = ({
  values,
  errors,
  touched,
  handleChange,
  setFieldValue,
  handleBlur,
}) => {
  const [uploadedImage, setUploadedImage] = useState("");

  function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]; // Get the selected file
    setFieldValue(file);

    if (file) {
      const reader = new FileReader(); // Create a FileReader object

      reader.onload = (e) => {
        const uploadedImageFromInput = e.target?.result as string; // Get the image data

        // Set the uploaded image in state
        setUploadedImage(uploadedImageFromInput);
      };

      reader.readAsDataURL(file); // Read the file as data URL
    }
  }
  return (
    <>
      <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
        Waterpark Information
      </Heading>

      <SimpleGrid columns={2} spacing={"10px"}>
        <FormControl mb="20px">
          <FormLabel
            fontSize="sm"
            fontWeight="md"
            textAlign={"center"}
            color="gray.700"
            m="0"
            mb={4}
          >
            Waterpark Logo
          </FormLabel>
          <Flex
            flexDirection={"column"}
            alignItems="center"
            justify={"center"}
            mt={1}
          >
            <Box height={"120px"} maxHeight={"120px"}>
              {uploadedImage && (
                <Image
                  src={uploadedImage}
                  height="auto"
                  maxHeight="100%"
                  rounded={"15px"}
                  alt="logo"
                />
              )}
              {!uploadedImage && (
                <Image
                  src={logoPlaceholder.src}
                  fallbackSrc={logoPlaceholder.src}
                  width="128px"
                  height="128px"
                  rounded={"15px"}
                  alt="logo"
                />
              )}
            </Box>
            <Button
              type="button"
              mt={5}
              variant="outline"
              size="sm"
              fontWeight="medium"
              _focus={{
                shadow: "none",
              }}
            >
              <Input
                type="file"
                id="myFile"
                name="filename"
                height="100%"
                width="100%"
                position="absolute"
                top="0"
                left="0"
                opacity="0"
                aria-hidden="true"
                accept="image/*"
                onChange={handleFileUpload}
              />
              Upload
            </Button>
          </Flex>
        </FormControl>

        <Flex
          flexDirection={"column"}
          justify={"center"}
          align="center"
          rowGap={"10px"}
          pr={"10%"}
        >
          <FormControl>
            <FormLabel htmlFor="parkName" fontWeight={"normal"}>
              Park Name
            </FormLabel>
            <Core.Input
              id="park_name"
              name="step2.park_name"
              placeholder="Park name"
              value={values?.step2?.park_name}
              error={errors?.step2?.park_name}
              touched={touched?.step2?.park_name}
              onChange={handleChange}
              onBlur={handleBlur}
              autoFocus={true}
            />
          </FormControl>
        </Flex>
      </SimpleGrid>
    </>
  );
};

export default Form2;
