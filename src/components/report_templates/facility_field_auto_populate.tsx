import { Box, Select, Text } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";

import { GetFacilities } from "@/services/api";

interface SelectFieldProps {
  field: any;
  onChange?: any;
}
const FacilityFieldAutoPopulate: React.FC<SelectFieldProps> = ({
  field,
  onChange,
}) => {
  const user: IUser = useSelector((state: any) => state.user.user);
  const [selectData, setSelectData] = useState(["Select"]);

  useQuery(
    "getFacilitiesForReportBuilder",
    () => GetFacilities({ userId: user._id || "" }),
    {
      onSuccess({ getFacilities }) {
        const temp: any = [];
        getFacilities.forEach((item) => {
          if (item.active) {
            temp.push(item.facility);
          }
        });
        setSelectData(temp);
      },
      refetchOnMount: true,
      enabled: field.type === "facility",
    }
  );

  // Using useMemo to set selectData when the dependencies change
  useMemo(() => {
    if (!field?.value && selectData.length && selectData[0] !== "Select") {
      onChange(field, { target: { value: selectData[0] } }); //  run onChange
    }
  }, [selectData]);

  return (
    <Box w="95%">
      <Text fontSize="12px" textTransform="capitalize" mb="2px">
        {field?.label}
      </Text>
      <Select
        fontSize="12px"
        value={field?.value || selectData[0]}
        textTransform="capitalize"
        size="sm"
        onChange={(e: any) => onChange(field, e)}
      >
        {field.value ? (
          <option value={String(field.value)}>{field.value}</option>
        ) : (
          selectData.map((option: string, index: number) => (
            <option key={index} value={String(option)}>
              {option}
            </option>
          ))
        )}
      </Select>
    </Box>
  );
};

export default FacilityFieldAutoPopulate;
