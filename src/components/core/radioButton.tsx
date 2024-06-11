import { Radio, Stack } from "@chakra-ui/react";

interface RadioButtonProps {
  colorScheme: string;
  data: string[];
}

const RadioButtons: React.FC<RadioButtonProps> = ({ data }) => {
  return (
    <Stack spacing={5} direction="row" mt="20px">
      {data.map((option: string, index) => (
        <Radio key={index} colorScheme="green" value={option?.toUpperCase()}>
          {option}
        </Radio>
      ))}
    </Stack>
  );
};
export default RadioButtons;
