import "react-phone-number-input/style.css";

import { Text } from "@chakra-ui/react";
import React, { memo, useState } from "react";
import PhoneInput, {
  isValidPhoneNumber,
  parsePhoneNumber,
} from "react-phone-number-input";

interface IPhoneNumberProps {
  phoneNumber?: { code: string; phoneNo: string };
  setPhoneNumber?: any;
  setFieldValue: any;
  isDisabled?: boolean;
}

const PhoneNumber: React.FunctionComponent<IPhoneNumberProps> = ({
  phoneNumber,
  setPhoneNumber,
  setFieldValue,
  isDisabled,
}) => {
  const [startedTyping, setStartedTyping] = useState<boolean>(false);
  const handlePhoneChange = (newPhoneNumber: string | undefined) => {
    setStartedTyping(true);
    if (newPhoneNumber) {
      const parsedNumber = parsePhoneNumber(newPhoneNumber);
      if (parsedNumber) {
        const countryCode = `+${parsedNumber.countryCallingCode}`;
        const phoneNumberWithoutCountryCode = newPhoneNumber.replace(
          `+${countryCode}`,
          ""
        );
        const phoneDataSuccess = {
          code: countryCode,
          phoneNo: phoneNumberWithoutCountryCode,
        };
        setPhoneNumber(phoneDataSuccess);
        setFieldValue("phone", phoneDataSuccess);
      }
    } else {
      const phoneDataNull = {
        code: "",
        phoneNo: "",
      };
      setPhoneNumber(phoneDataNull);
      setFieldValue("phone", phoneDataNull);
    }
  };

  return (
    <>
      <PhoneInput
        disabled={isDisabled}
        name="phone"
        defaultCountry="US"
        placeholder="Enter Phone Number"
        value={phoneNumber?.phoneNo}
        onChange={handlePhoneChange}
        className="phone-input"
        style={{
          width: "100%",
          padding: "8px 10px",
          fontSize: "16px",
          fontFamily: "verdana",
          backgroundColor: "transparent",
          borderWidth: "1px",
          borderColor: startedTyping
            ? phoneNumber?.phoneNo &&
              phoneNumber?.code &&
              isValidPhoneNumber(phoneNumber?.phoneNo)
              ? "inherit"
              : "red"
            : "inherit",
          borderRadius: "5px",
        }}
        error={
          phoneNumber?.phoneNo && phoneNumber?.code
            ? isValidPhoneNumber(phoneNumber?.phoneNo)
              ? undefined
              : "Invalid phone number"
            : "Phone Number required"
        }
      />
      {/* <Text color="red" fontSize={"12px"}>
        {startedTyping
          ? phoneNumber?.phoneNo && phoneNumber?.code
            ? isValidPhoneNumber(phoneNumber.phoneNo)
            : "Invalid phone number"
          : "Phone Number required"}
      </Text> */}
      {startedTyping && (
        <Text color="red" fontSize={"12px"} mt="7px">
          {phoneNumber?.phoneNo && phoneNumber?.code
            ? isValidPhoneNumber(phoneNumber.phoneNo)
              ? undefined
              : "Invalid phone number"
            : "Phone Number required"}
        </Text>
      )}
    </>
  );
};

export default memo(PhoneNumber);
