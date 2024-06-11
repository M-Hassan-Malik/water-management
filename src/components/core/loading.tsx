/* eslint-disable prettier/prettier */
import { Box, ChakraProvider, Flex, Spacer, Spinner ,Text} from "@chakra-ui/react";
import Image from "next/image";
import type { FC } from "react";
import { memo, useMemo } from "react";
import { useSelector } from "react-redux";

import {
  blueDefaultTheme,
  darkTheme,
  greenTheme,
  orangeDefaultTheme,
  purpleTheme,
} from "@/utils/AppConfig";

import logo from "../../assets/logo/logo.png";

interface LoadingComponentProps {
  minH?: string;
  text?: string;
}
const LoadingComponent: FC<LoadingComponentProps> = ({ minH, text }) => {
  const user: IUser = useSelector((state: any) => state.user.user);
  const setUserTheme = () => {
    if (user?.themeId === "green") {
      return greenTheme;
    }
    if (user?.themeId === "purple") {
      return purpleTheme;
    }
    if (user?.themeId === "dark") {
      return darkTheme;
    }
    if (user.admin) {
      return blueDefaultTheme;
    }
    return orangeDefaultTheme;
  };

  const chosenTheme = useMemo(() => setUserTheme(), [user?.themeId]);
  return (
    <ChakraProvider theme={chosenTheme}>
      <Box
        w="100%"
        minH={minH || "100vh"}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        h="100%"
      >
        <Flex flexDirection={"column"} alignItems="center">
          <Spinner
            size="xl"
            thickness="6px"
            speed="0.80s"
            style={{ width: "40px", height: "40px" }}
            color="orange.900"
            emptyColor="blue.900"
            mt={"-20px"}
          />
          <Spacer />
          <Box width="140px">
            <Image src={logo} alt="logo" />
          </Box>
          {text && <Text fontWeight={"600"}>
            {text}
          </Text>}
        </Flex>
      </Box>
    </ChakraProvider>
  );
};

export default memo(LoadingComponent);
