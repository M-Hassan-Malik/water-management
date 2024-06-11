import { useRouter } from "next/router";
import { useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";

import { Core } from "@/components";
import type { FindActivityLogByClientAdminIdQuery } from "@/graphql/generated/graphql";
import { FindActivityLogByClientAdminId } from "@/services/api";

import { HandleLogout } from "../auth";

const actions = {
  view: true,
};
const columns = ["user_name", "access type", "action"];

interface IActivityLogsListingProps {}

const ActivityLogsListing: React.FC<IActivityLogsListingProps> = () => {
  const { push } = useRouter();
  const user: IUser = useSelector((state: any) => state.user.user);
  const [fail, setFail] = useState<IAlertSuccessData>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [logs, setLogs] = useState<
    FindActivityLogByClientAdminIdQuery["findActivityLogByClientAdminId"]
  >([]);

  const onViewClick = (id: any) => {
    push(
      {
        pathname: `/activity-logs/user`,

        query: { userId: id },
      },
      undefined,
      {
        shallow: true,
      }
    );
  };

  useQuery(
    ["findActivityLogs"],
    () => FindActivityLogByClientAdminId({ belongsTo: String(user._id) }),
    {
      onSuccess: ({ findActivityLogByClientAdminId }) => {
        const temp = findActivityLogByClientAdminId.flatMap((activity) => ({
          ...activity,
          "access type": activity.role,
        }));
        setLogs(temp);
        setIsLoading(false);
      },
      onError(_: any) {
        if (
          _?.response?.errors?.length &&
          _?.response?.errors[0]?.message === "Not Authorised!"
        )
          HandleLogout();

        setFail({
          status: true,
          title: "Something went wrong",
          description: "Failed to get logs",
        });
        setIsLoading(false);
      },
      enabled: Boolean(user._id),
      refetchOnMount: true,
    }
  );

  return (
    <>
      <Core.Alert show={fail} theme="error" />
      <Core.Table
        id="activity-logs"
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
        getDataByUserId
      />
    </>
  );
};

export default ActivityLogsListing;
