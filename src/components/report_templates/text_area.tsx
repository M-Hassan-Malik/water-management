import { Box, Text, Textarea } from "@chakra-ui/react";

interface TextAreaProps {
  field: any;
}

const TextArea: React.FC<TextAreaProps> = ({ field }) => {
  return (
    <Box width="100%">
      <Text fontSize={"12px"} textTransform={"capitalize"} mb="2px">
        {field?.label}
      </Text>
      <Textarea
        size="sm"
        placeholder={field.placeholder}
        value={field?.value || ""}
        backgroundColor={"white.100"}
        readOnly={true}
      />
    </Box>
  );
};
export default TextArea;
