import { Box, Input, Text } from "@chakra-ui/react";

interface InputTextProps {
  field: any;
  onChange?: any;
}

const InputText: React.FC<InputTextProps> = ({ field, onChange }) => {
  return (
    <Box width="95%">
      <Text fontSize={"12px"} textTransform={"capitalize"} mb="2px">
        {field?.label}
      </Text>
      <Input
        value={field?.value || ""}
        onChange={(e: any) => onChange(field, e)}
        type={field.type}
        placeholder={field.placeholder ? field.placeholder : "placeholder"}
        size="sm"
        fontSize={"12px"}
        id={field?.id ? field.id : "id"}
      />
    </Box>
  );
};
export default InputText;
