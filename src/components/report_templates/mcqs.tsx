import { Box, Radio, RadioGroup, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";

import { Core } from "..";

interface McqsProps {
  field: any;
  onChange: any;
}
const Mcqs: React.FC<McqsProps> = ({ field, onChange }) => {
  const [value, setValue] = useState<string>(field?.value || "");
  const handleRadioChange = (selectedValue: string) => {
    setValue(selectedValue);
    onChange(field, selectedValue);
  };
  return (
    <Box minW={"90%"}>
      <Text
        fontSize={"12px"}
        textTransform={"capitalize"}
        mb="2px"
        fontWeight={"bold"}
      >
        Q: {field?.label}
      </Text>
      <RadioGroup onChange={handleRadioChange} value={value}>
        <Stack
          display={"inline-flex"}
          direction="column"
          flexWrap={"wrap"}
          rowGap={"5px"}
          columnGap={"5px"}
          spacing="0"
        >
          {field.options?.map((option: string, index: number) => (
            <Core.ItemBtn key={index} px="10px" radiusFull={true} pb="2px">
              <Radio
                size="sm"
                fontSize={"12px"}
                value={option}
                pt="5px"
                pb="2px"
              >
                <Box as="span" color={"textColor"} overflowWrap={"anywhere"}>
                  {option}
                </Box>
              </Radio>
            </Core.ItemBtn>
          ))}
        </Stack>
      </RadioGroup>
    </Box>
  );
};

export default Mcqs;
