import { Box, Select, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";

import { FindMyUsers, GetPectoraAuth } from "@/services/api";

import { HandleLogout } from "../auth";

interface SelectFieldProps {
  field: any;
  onChange?: any;
}
const LifeguardFieldAutoPopulate: React.FC<SelectFieldProps> = ({
  field,
  onChange,
}) => {
  const user: IUser = useSelector((state: any) => state.user.user);
  const [selectData, setSelectData] = useState(["Select"]);
  const [users, setUsers] = useState([]);
  const [pectora, setPectora] = useState([]);
  const [, setIsLoading] = useState(false);

  const requestAPI = async (auth: any) => {
    setIsLoading(true);
    const { data }: IResponseAPI = await axios.post(
      `${process.env.FRONT_END_URL}/api/pectora/users`,
      {
        x_auth_id: auth.X_Auth_Id,
        x_auth_token: auth.X_Auth_Token,
      }
      // {
      //   headers: {
      //     "x_auth_id": auth.X_Auth_Id,
      //     "x_auth_token": auth.X_Auth_Token,
      //   },
      // }
    );

    const temp = data.data.data.flatMap(
      (_: any) => `${_.first_name} ${_.last_name}`
    );
    setPectora(temp);
    setIsLoading(false);
  };

  useQuery(
    ["getPectoraAuth", user.company.location],
    () =>
      GetPectoraAuth({
        facilityId: (user?.company?.location[0]?._id as string) || "",
      }),
    {
      onSuccess({ getPectoraAuth }) {
        requestAPI(getPectoraAuth);
      },
      onError(_: any) {
        if (
          _?.response?.errors?.length &&
          _?.response?.errors[0]?.message === "Not Authorised!"
        )
          HandleLogout();

        setIsLoading(false);
      },
      refetchOnMount: true,
      enabled: Boolean(user?.company?.location[0]?._id),
    }
  );

  useQuery(
    "findAllMyPectora&UsersForReportBuilder",
    () =>
      FindMyUsers({
        ownerId: user?._id || "",
      }),
    {
      onSuccess({ findMyUsers }) {
        const temp: any = [];
        findMyUsers.forEach((item) => {
          if (item.status) {
            temp.push(`${item.first_name} ${item.last_name}`);
          }
        });
        setUsers(temp);
      },
      onError(_: any) {
        if (
          _?.response?.errors?.length &&
          _?.response?.errors[0]?.message === "Not Authorised!"
        )
          HandleLogout();
      },
      refetchOnMount: true,
      enabled: field.type === "lifeguard",
    }
  );

  useEffect(() => {
    const sorted: string[] = [...users, ...pectora].sort(
      (a: string, b: string) => a.localeCompare(b)
    );
    sorted.unshift("Select"); // add to start of array

    setSelectData(sorted);
  }, [users, pectora]);

  return (
    <Box w="75%">
      <Text fontSize="12px" textTransform="capitalize" mb="2px">
        {field?.label}
      </Text>
      <Select
        fontSize="12px"
        value={field?.value || selectData[0]}
        textTransform="capitalize"
        borderColor={"blackAlpha.500"}
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

export default LifeguardFieldAutoPopulate;
