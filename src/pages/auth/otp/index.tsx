// import { useRouter } from "next/router";
import { ChakraProvider } from "@chakra-ui/react";
import { useContext, useEffect } from "react";

import { Auth } from "@/components";
import { InputsContext } from "@/pages/_app";

const ScreenComponent = () => {
  // const router = useRouter();
  const contextData: any = useContext(InputsContext);
  useEffect(() => {
    if (
      !contextData.inputs.openOTPRoute &&
      !contextData.inputs.openNewPassword
    ) {
      // router.replace(`/dashboard`);
    }
  }, [contextData.inputs.openOTPRoute]);

  return !contextData.inputs.openOTPRoute ? null : (
    <ChakraProvider>
      <Auth.OtpScreenView />;
    </ChakraProvider>
  );
};
export default ScreenComponent;
