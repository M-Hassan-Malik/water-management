import { Box, Input, Text } from "@chakra-ui/react";

interface FileProps {
  field: any;
  accept: string;
}

const File: React.FC<FileProps> = ({ field, accept }) => {
  return (
    <Box width="95%">
      <Text fontSize={"12px"} textTransform={"capitalize"} mb="2px">
        {field?.label}
      </Text>
      <Input
        onChange={(e: any) => {
          const file = e.target.files[0];
          console.log(file);
        }}
        type="file"
        accept={accept}
        id={field?.id ? field.id : "id"}
        pt={"5px"}
        border={"0"}
        px="0"
      />
    </Box>
  );
};
export default File;
