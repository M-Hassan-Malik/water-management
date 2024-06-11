import { Box, Radio, RadioGroup, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";

import { Core } from "..";

interface RadioButtonProps {
  field: any;
}

const RadioButton: React.FC<RadioButtonProps> = ({ field }) => {
  const [value, setValue] = useState<string>("1");
  return (
    <Box minW={"49%"}>
      <Text fontSize={"12px"} textTransform={"capitalize"} mb="2px">
        {field?.label}
      </Text>
      <RadioGroup onChange={setValue} value={value}>
        <Stack
          direction="row"
          flexWrap={"wrap"}
          rowGap={"5px"}
          columnGap={"5px"}
          spacing="0"
        >
          {field.options?.map((option: string, index: number) => (
            <Core.ItemBtn key={index} px="10px" radiusFull={true} pb="2px">
              <Radio
                value={option}
                size="sm"
                fontSize={"12px"}
                pt="5px"
                pb="2px"
              >
                {option}
              </Radio>
            </Core.ItemBtn>
          ))}
        </Stack>
      </RadioGroup>
    </Box>
  );
};
export default RadioButton;
