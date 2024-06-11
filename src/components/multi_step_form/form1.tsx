import {
  Avatar,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  SimpleGrid,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { useState } from "react";
import { useSelector } from "react-redux";

import { Svg } from "@/assets";

import { Core } from "..";

const Form1: React.FunctionComponent<FormPartsProps> = ({
  values,
  errors,
  touched,
  handleChange,
  setFieldValue,
  handleBlur,
}) => {
  const [uploadedImage, setUploadedImage] = useState("");
  const user: IUser = useSelector((state: any) => state.user.user);

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
        Profile Information
      </Heading>
      <SimpleGrid columns={2} spacing={"10px"}>
        <FormControl mb="20px">
          {/* <FormLabel
            fontSize="sm"
            fontWeight="md"
            textAlign={"center"}
            color="gray.700"
            m="0"
            mb={4}
          >
            User Photo
          </FormLabel> */}
          <Flex
            flexDirection={"column"}
            alignItems="center"
            justifyContent={"center"}
            mt={1}
          >
            <Wrap>
              <WrapItem>
                {uploadedImage && (
                  <Avatar
                    size="2xl"
                    name={user?.first_name || `${user?.last_name}` || ""}
                    src={uploadedImage}
                  />
                )}
                {!uploadedImage && (
                  <Avatar
                    backgroundColor={"#e7c89f"}
                    border={"15px solid #e7c89f"}
                    size="2xl"
                    name={user?.first_name || `${user?.last_name}` || ""}
                    src={Svg.avatarPlaceholder.src}
                  />
                )}
              </WrapItem>
            </Wrap>
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
            <FormLabel htmlFor="first_name" fontWeight={"normal"}>
              First Name
            </FormLabel>
            <Core.Input
              id="first_name"
              name="step1.first_name"
              placeholder="First Name"
              value={values?.step1?.first_name}
              error={errors?.step1?.first_name}
              touched={touched?.step1?.first_name}
              onChange={(e) => handleChange(e)}
              onBlur={handleBlur}
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="last_name" fontWeight={"normal"}>
              Last name
            </FormLabel>
            <Core.Input
              id="last_name"
              name="step1.last_name"
              placeholder="Last name"
              value={values?.step1?.last_name}
              error={errors?.step1?.last_name}
              touched={touched?.step1?.last_name}
              onChange={(e) => handleChange(e)}
              onBlur={handleBlur}
            />
          </FormControl>
        </Flex>
      </SimpleGrid>
    </>
  );
};

export default Form1;
