import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { useQuery } from "react-query";

import { Core } from "@/components";
import type { FindActivityLogByUserIdQuery } from "@/graphql/generated/graphql";
import { FindActivityLogByUserId } from "@/services/api";

import { HandleLogout } from "../auth";

const actions = {
  view: true,
};

const columns = [
  "user_name",
  "access type",
  "activity",
  "interface",
  "dateTime",
  "action",
];

interface IUserLogsListingProps {}

const UserLogsListing: React.FC<IUserLogsListingProps> = () => {
  const { push, query } = useRouter();

  const { userId } = useMemo(() => query as unknown as IPageQuery, [query]);
  const [error, setError] = useState<IAlertSuccessData>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [logs, setLogs] = useState<
    FindActivityLogByUserIdQuery["findActivityLogByUserId"]
  >([]);

  const onViewClick = (id: any) => {
    push(
      {
        pathname: `/activity-logs/details`,
        query: { id },
      },
      undefined,
      { shallow: true }
    );
  };

  useQuery(
    ["findActivityLogs"],
    () => FindActivityLogByUserId({ userId: String(userId) }),
    {
      onSuccess: ({ findActivityLogByUserId }) => {
        setIsLoading(false);
        const temp = findActivityLogByUserId?.flatMap((activity) => ({
          ...activity,
          "access type": activity.role,
        }));
        setLogs(temp);
      },
      onError(_: any) {
        if (
          _?.response?.errors?.length &&
          _?.response?.errors[0]?.message === "Not Authorised!"
        )
          HandleLogout();
        setIsLoading(false);
        setError({
          status: true,
          title: "Something went wrong",
          description: "Failed to get logs",
        });
      },
      refetchOnMount: true,
      enabled: Boolean(userId),
    }
  );

  return (
    <Box width="100%">
      <Core.Alert show={error} theme="error" />
      <Core.Table
        isLoading={isLoading}
        tableData={logs}
        columns={columns}
        shadow
        clickable
        sortOrderId
        sortUserId
        sortDueDate
        sortRegisteredNo
        sortCreatedOn
        sortPaymentDate
        sortCustomerName
        sortAmount
        sortDate
        sortName
        actions={actions}
        onViewClick={onViewClick}
      />
    </Box>
  );
};

export default UserLogsListing;
