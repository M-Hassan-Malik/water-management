import { useRouter } from "next/router";
import { useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";

import { Core } from "@/components";
import { HandleLogout } from "@/components/auth";
import { TrackParticularClientRecord } from "@/services/api";

const actions = {
  view: true,
};
const columns = [
  "clientName",
  "email",
  "date",
  "amount",
  "subscription",
  "packageStatus",
  "action",
];

interface IPaymentLogListingProps {}

interface IList {
  _id: string; // Package ID
  clientName: string;
  email: string;
  date: Date;
  amount: number;
  subscription: string;
  packageStatus: string;
}

const PaymentLogListing: React.FC<IPaymentLogListingProps> = () => {
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [list, setList] = useState<IList[]>([]);
  const user: IUser = useSelector((state: any) => state.user.user);
  const [, setTableFilters] = useState(null);

  useQuery(
    ["myPaymentLogs"],
    () => TrackParticularClientRecord({ userId: user._id || "" }),
    {
      onSuccess(data) {
        if (data?.trackParticularClientRecord) {
          setList(
            data.trackParticularClientRecord.flatMap(
              (item: any) =>
                ({
                  _id: item._id,
                  clientName: `${item.ref?.first_name} ${item.ref?.last_name}`,
                  amount: item.cost,
                  date: item.createdAt,
                  email: item.ref?.email,
                  subscription: item.title,
                  packageStatus: item.status,
                } as IList)
            )
          );
        }
        setIsLoading(false);
      },
      onError(_: any) {
        if (
          _?.response?.errors?.length &&
          _?.response?.errors[0]?.message === "Not Authorised!"
        )
          HandleLogout();
        setIsLoading(false);
      },
      enabled: Boolean(user._id),
      refetchOnMount: true,
    }
  );

  const onViewClick = (_: any) => {
    push(
      {
        pathname: `/payment/details`,
        query: { type: "view", id: _ },
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <Core.Table
      id="payment-records"
      tableData={list}
      columns={columns}
      shadow
      // title="Client-Admin Payments"
      filterBy={["Name", "Dates"]}
      // filterBy={[
      // "Name",
      // "Dates",
      // "Package",
      // "Role",
      // "OrganizationName",
      // "ParkName",
      // "Intervals",
      // "Task",
      // "User",
      // "Payment",
      // "Message",
      // "EmailAndNotification",
      // ]}
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
      isLoading={isLoading}
      actions={actions}
      onViewClick={onViewClick}
      setTableFilters={setTableFilters}
    />
  );
};

export default PaymentLogListing;
