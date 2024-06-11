import { Box, Input, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

interface InputTextProps {
  field: any;
  onChange?: any;
}

const InputAutoPopulateText: React.FC<InputTextProps> = ({
  field,
  onChange,
}) => {
  const user: IUser = useSelector((state: any) => state.user.user);

  useEffect(() => {
    if (user.company.park.name) onChange(field, user.company.park.name);
  }, [user?.company.park.name]);

  return (
    <Box width="95%">
      <Text fontSize={"12px"} textTransform={"capitalize"} mb="2px">
        {field?.label}
      </Text>
      <Input
        onChange={() => {}}
        value={user?.company.park.name || ""}
        type={field.type}
        placeholder={field.placeholder ? field.placeholder : "placeholder"}
        size="sm"
        fontSize={"12px"}
        id={field?.id ? field.id : "id"}
      />
    </Box>
  );
};
export default InputAutoPopulateText;
