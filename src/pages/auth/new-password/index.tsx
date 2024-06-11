// import { useRouter } from "next/router";
import { ChakraProvider } from "@chakra-ui/react";
import { useContext, useEffect } from "react";

import { Auth } from "@/components";
import { InputsContext } from "@/pages/_app";

const ScreenComponent = () => {
  // const {replace} = useRouter();
  const contextData: any = useContext(InputsContext);

  useEffect(() => {
    if (!contextData.inputs.openNewPassword) {
      // replace(`/dashboard`);
    }
  }, [contextData.inputs.openNewPassword]);

  return !contextData.inputs.openNewPassword ? null : (
    <ChakraProvider>
      <Auth.NewPasswordView />;
    </ChakraProvider>
  );
};

export default ScreenComponent;
