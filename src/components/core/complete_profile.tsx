import {
  Avatar,
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { memo, useMemo } from "react";

import { Core } from "@/components";
// import App from "./drop_image";

interface ICompleteProfileProps {}
const CompleteProfile: React.FunctionComponent<ICompleteProfileProps> = (
  _props
) => {
  const { query } = useRouter();
  const { type } = useMemo(() => query as unknown as IPageQuery, [query]);

  return (
    <Box>
      {/* <Core.Alert show={success} theme="success" /> */}
      <Core.FormHeading3 title={`Complete Your Profile`} />
      <Flex columnGap={"10px"} pb="20px" mb="30px" flexWrap={"wrap"}>
        <Box width={"100%"} pb="20px">
          <Wrap>
            <WrapItem>
              <Avatar
                size="2xl"
                name="Segun Adebayo"
                src="https://statewideguttercompany.com/wp-content/uploads/2012/07/logo-placeholder.jpg"
              />{" "}
            </WrapItem>
          </Wrap>

          <Box
            width={"30px"}
            height="30px"
            borderRadius={"50px"}
            backgroundColor={"red.400"}
            textAlign={"center"}
            fontSize={"20px"}
            color="#fff"
          >
            +
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
              // onDragEnter={startAnimation}
              // onDragLeave={stopAnimation}
            />
          </Box>
        </Box>

        <FormControl isRequired width={"49%"} mb="10px">
          <FormLabel>Park Name</FormLabel>
          <Input
            placeholder="Park Name"
            type="text"
            // onChange={changeHandler}
            name="parkName"
            // defaultValue={lastName}
            isDisabled={type === "view"}
          />
        </FormControl>

        <FormControl isRequired width={"49%"} mb="10px">
          <FormLabel>Country</FormLabel>
          <Input
            placeholder="Country"
            type="text"
            // onChange={changeHandler}
            name="country"
            // defaultValue={firstName}
            isDisabled={type === "view"}
          />
        </FormControl>
        <FormControl isRequired width={"49%"} mb="10px">
          <FormLabel>City</FormLabel>
          <Input
            placeholder="City"
            type="text"
            // onChange={changeHandler}
            name="city"
            // defaultValue={lastName}
            isDisabled={type === "view"}
          />
        </FormControl>

        <FormControl isRequired width={"49%"} mb="10px">
          <FormLabel>State</FormLabel>
          <Input
            placeholder="State"
            type="text"
            // onChange={changeHandler}
            name="state"
            // defaultValue={lastName}
            isDisabled={type === "view"}
          />
        </FormControl>
        <FormControl isRequired width={"49%"} mb="10px">
          <FormLabel>Address</FormLabel>
          <Input
            placeholder="Address"
            type="text"
            // onChange={changeHandler}
            name="address"
            // defaultValue={lastName}
            isDisabled={type === "view"}
          />
        </FormControl>
        <FormControl isRequired width={"49%"} mb="10px">
          <FormLabel>GPS Location</FormLabel>
          <Input
            placeholder="GPS Location"
            type="text"
            // onChange={changeHandler}
            name="gpsLocation"
            // defaultValue={lastName}
            isDisabled={type === "view"}
          />
        </FormControl>
      </Flex>

      <Flex
        columnGap={"10px"}
        justifyContent="end"
        borderTop={"1px solid"}
        borderColor={"gray.200"}
      >
        {/* <Core.Button btnGrayMd>Cancel</Core.Button> */}
        <Core.Button
          btnOrangeMd
          // onClick={submitHandler}
          // isLoading={isLoading}
          // isDisabled={isDisabled}
        >
          {type ? "Update User" : "Add User"}
        </Core.Button>
      </Flex>
    </Box>
  );
};

export default memo(CompleteProfile);
