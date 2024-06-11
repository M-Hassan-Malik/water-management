import { Box, ChakraProvider } from "@chakra-ui/react";
import React from "react";

import {
  // blueDefaultTheme,
  // darkTheme,
  // greenTheme,
  orangeDefaultTheme,
  // purpleTheme,
} from "@/utils/AppConfig";

// import { useSelector } from "react-redux";
import { MultiStepForm } from "../../components";

// const user: IUser = useSelector((state: any) => state.user.user);
// const setUserTheme = () => {
//   if (user?.themeId === "green") {
//     return greenTheme;
//   }
//   if (user?.themeId === "purple") {
//     return purpleTheme;
//   }
//   if (user?.themeId === "dark") {
//     return darkTheme;
//   }
//   if (user.admin) {
//     return blueDefaultTheme;
//   }
//   return orangeDefaultTheme;
// };
// const chosenTheme = useMemo(() => setUserTheme(), [user?.themeId]);
const Profile = () => {
  return (
    <ChakraProvider theme={orangeDefaultTheme}>
      <Box w="100%" p={4} height={"100vh"}>
        <MultiStepForm.Onboarding />
      </Box>
    </ChakraProvider>
  );
};

export default Profile;

export const getServerSideProps = async (context: any) => {
  const { req, res } = context;

  const authCookie = req.cookies.auth;
  const isAuthenticated = !!authCookie;

  // const { referer } = req.headers;
  // const isLoginPage = referer && referer.includes("/auth/login");

  // const isReload =
  //   req.headers["cache-control"] === "max-age=0" ||
  //   req.headers.pragma === "no-cache";

  let destination = "/complete-profile";
  destination = isAuthenticated ? "/complete-profile" : "/auth/login";

  if (destination === "/dashboard") {
    res.setHeader("Location", destination);
    res.statusCode = 302;
    res.end();
    return { props: {} };
  }

  if (destination === "/auth/login") {
    res.setHeader("Location", destination);
    res.statusCode = 302;
    res.end();
    return { props: {} };
  }

  return { props: {} };
};
