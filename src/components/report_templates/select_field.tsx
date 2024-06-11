import { Box, Select, Text } from "@chakra-ui/react";

interface SelectFieldProps {
  field: any;
  onChange?: any;
}
const SelectField: React.FC<SelectFieldProps> = ({ field, onChange }) => {
  return (
    <Box w="95%">
      <Text fontSize="12px" textTransform="capitalize" mb="2px">
        {field?.label}
      </Text>
      <Select
        fontSize="12px"
        value={field?.value}
        textTransform="capitalize"
        size="sm"
        placeholder={field.placeholder}
        onChange={(e: any) => onChange(field, e)}
      >
        <option value="select">select</option>
        {field.options?.map((option: string, index: number) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </Select>
    </Box>
  );
};

export default SelectField;
