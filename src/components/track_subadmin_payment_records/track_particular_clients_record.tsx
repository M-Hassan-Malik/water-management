import { useRouter } from "next/router";
import { useState } from "react";
import { useQuery } from "react-query";

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

interface ITrackSubAdminPaymentRecordsListingProps {}

interface IList {
  _id: string; // Package ID
  clientName: string;
  email: string;
  date: Date;
  amount: number;
  subscription: string;
  packageStatus: string;
}

const TrackSubAdminPaymentRecordsListing: React.FC<
  ITrackSubAdminPaymentRecordsListingProps
> = () => {
  const { push, query } = useRouter();
  const { id } = query;
  const [isLoading, setIsLoading] = useState(true);
  const [list, setList] = useState<IList[]>([]);

  useQuery(
    ["trackParticularClientRecord", id],
    () => TrackParticularClientRecord({ userId: (id as string) || "" }),
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
      refetchOnMount: true,
      enabled: Boolean(id),
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
      id="track-particular-client-record"
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
    />
  );
};

export default TrackSubAdminPaymentRecordsListing;
