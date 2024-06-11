import { HStack, PinInput, PinInputField } from "@chakra-ui/react";
import type { FC } from "react";

interface OtpPinInputFieldViewProps {
  changeHandler: (value: string) => void;
}

const OtpPinInputFieldView: FC<OtpPinInputFieldViewProps> = ({
  changeHandler,
}) => {
  return (
    <HStack className="mb-[20px] mt-[-30px]">
      <PinInput size="lg" onChange={changeHandler}>
        <PinInputField />
        <PinInputField />
        <PinInputField />
        <PinInputField />
        <PinInputField />
        <PinInputField />
      </PinInput>
    </HStack>
  );
};

export { OtpPinInputFieldView };
