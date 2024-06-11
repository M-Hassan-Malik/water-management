import { Box, Input, Text } from "@chakra-ui/react";

interface DatePickerProps {
  field: any;
  onChange?: any;
}

const DatePicker: React.FC<DatePickerProps> = ({ field, onChange }) => {
  return (
    <Box width="95%">
      <Text fontSize={"12px"} textTransform={"capitalize"} mb="2px">
        {field?.label}
      </Text>
      <Input
        placeholder={field.placeholder ? field.placeholder : "placeholder"}
        size="sm"
        type="date"
        value={field?.value}
        onChange={(e: any) => {
          onChange(field, e);
        }}
      />
    </Box>
  );
};
export default DatePicker;
