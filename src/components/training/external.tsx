import { Box } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";

import { HandleLogout } from "@/components/auth";
import { GetFacilities, GetPectoraAuth } from "@/services/api";

import { Core } from "..";

const columns = ["first name", "last name", "email", "phone", "id"];
interface IUsers {
  id: string;
  "first name": string;
  "last name": string;
  email: string;
  phone: string;
}
interface IFacilitiesData {
  _id: string;
  facility: string;
}

const ExternalTraining: React.FC = () => {
  const user: IUser = useSelector((state: any) => state.user.user);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState<IUsers[]>([]);
  const [tableFilters, setTableFilters] = useState<ITableFilters | null>(null);
  const [facilities, setFacilities] = useState<IFacilitiesData[]>([]);

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
      (_: any): IUsers => ({
        id: _.id,
        "first name": _.first_name,
        "last name": _.last_name,
        email: _.email,
        phone: _.phone,
      })
    );
    setUsers(temp);
    setFilteredUsers(temp);
    setIsLoading(false);
  };

  const { isLoading: isPectoraUsersLoading } = useQuery(
    ["getPectoraAuth", tableFilters?.dynamicObjectId],
    () => GetPectoraAuth({ facilityId: tableFilters?.dynamicObjectId || "" }),
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
        setUsers([]);
        setFilteredUsers([]);
        setIsLoading(false);
      },
      refetchOnMount: true,
      enabled: Boolean(tableFilters?.dynamicObjectId),
    }
  );

  const { isLoading: isFacilityLoading } = useQuery(
    "getFacilitiesForPectora",
    () => GetFacilities({ userId: user._id || "" }),
    {
      onSuccess({ getFacilities }) {
        const tempData: IFacilitiesData[] = [];
        getFacilities.forEach((_) => {
          if (_?.active) {
            tempData.push({
              _id: _._id || "",
              facility: _.facility || "",
            });
          }
        });
        setFacilities(tempData);
      },
      onError() {},
      refetchOnMount: true,
    }
  );

  const convertToCSV = (data: IUsers[]): string => {
    const header = data[0] && Object.keys(data[0]).join(",");
    const rows = data.map((item: any) =>
      Object.values(item)
        .map((value) => `"${value}"`)
        .join(",")
    );
    return [header, ...rows].join("\n");
  };

  const downloadCSV = (data: IUsers[], filename: string): any => {
    const csv = convertToCSV(data);
    const blob = new Blob([csv], { type: "text/csv" });
    const blobUrl = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = filename;

    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(blobUrl);
  };

  useEffect(() => {
    const tempUsers = users.filter((item: ITableFilters | any) => {
      const nameMatch =
        tableFilters?.Name &&
        item["first name"]
          ?.toLowerCase()
          .startsWith(tableFilters.Name.toLowerCase());
      const emailMatch =
        tableFilters?.Email &&
        item?.email?.toLowerCase().startsWith(tableFilters.Email.toLowerCase());

      if (tableFilters?.Name && !tableFilters?.Email) {
        // Condition 1: Only tableFilters?.Name exists
        return nameMatch;
      }

      if (!tableFilters?.Name && tableFilters?.Email) {
        // Condition 2: Only tableFilters?.Email exists
        return emailMatch;
      }

      if (tableFilters?.Name && tableFilters?.Email) {
        // Condition 3: Both tableFilters?.Name and tableFilters?.Email exist
        return nameMatch || emailMatch;
      }

      // Default condition: No filters
      return true;
    });

    setFilteredUsers(tempUsers);
  }, [tableFilters]);

  const downloadHandler = () => {
    const filename = "external-users-pectora.csv";
    downloadCSV(filteredUsers, filename);
  };

  return (
    <Box>
      <Core.Table
        id={"external-training"}
        columns={columns}
        tableData={filteredUsers}
        filterBy={["Name", "Email", "dynamicObjects"]}
        dynamicObjectsFilter={facilities}
        setTableFilters={setTableFilters}
        actionButton={{
          name: "Download CSV file",
          action: downloadHandler,
        }}
        shadow
        isLoading={isLoading || isFacilityLoading || isPectoraUsersLoading}
      />
    </Box>
  );
};

export default ExternalTraining;
