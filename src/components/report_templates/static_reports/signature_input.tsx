import { Flex, FormControl, FormLabel, useMediaQuery } from "@chakra-ui/react";

import { Core } from "@/components";

interface ISignatureInputProps {
  data: string;
}

const SignatureInput: React.FunctionComponent<ISignatureInputProps> = ({
  data,
}) => {
  const [isScreenMax768] = useMediaQuery("(max-width: 768px)");

  return (
    <Flex width="100%" justifyContent={"end"} columnGap={"5px"}>
      <Flex width={isScreenMax768 ? "70%" : "50%"} flexDirection={"column"}>
        <FormControl>
          <FormLabel textAlign={"center"}>{data}</FormLabel>
          <Core.Input />
        </FormControl>
      </Flex>
    </Flex>
  );
};

export default SignatureInput;
