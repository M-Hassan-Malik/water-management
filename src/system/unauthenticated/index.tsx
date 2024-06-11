import { Box, Flex, Heading, Spacer } from "@chakra-ui/react";
import Image from "next/image";

import svg404 from "../../assets/svgs/svg404.svg";

// interface PageNotFoundViewProps {}

const PageNotFoundView = () => {
  return (
    <Box
      w="100%"
      minH={"100vh"}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      h="100%"
    >
      <Flex flexDirection={"column"} alignItems="center">
        {/* <img
          src={svg404.src}
          alt="404 image"
          width={"200px"}
        /> */}
        <Image src={svg404.src} alt="404 image" />
        <Spacer />
        <Heading color="#aaa">No permissions to view the resources!</Heading>
      </Flex>
    </Box>
  );
};

export default PageNotFoundView;
