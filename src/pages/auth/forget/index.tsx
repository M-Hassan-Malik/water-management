// import { useRouter } from "next/router";
import { ChakraProvider } from "@chakra-ui/react";
import { useEffect } from "react";

import { Auth } from "@/components";
import { verifyJWT } from "@/utils/helpers/jwt";

const ScreenComponent = ({ isVerified }: any) => {
  // const router = useRouter();

  useEffect(() => {
    if (isVerified) {
      // router.replace(`/dashboard`);
    }
  }, [isVerified]);

  return isVerified ? null : (
    <ChakraProvider>
      <Auth.ForgotPasswordScreenView />;
    </ChakraProvider>
  );
};

export async function getServerSideProps(context: any) {
  const { auth } = context.req.cookies || {};
  let isVerified: boolean = false;

  if (auth) {
    const verified = verifyJWT(auth);
    if (verified) isVerified = true;
  }
  return {
    props: {
      isVerified,
    },
  };
}

export default ScreenComponent;
