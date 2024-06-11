import { useRouter } from "next/router";
import { useState } from "react";
import { useQuery } from "react-query";

import { Core } from "@/components";
import { HandleLogout } from "@/components/auth";
import { TrackClientAdmins } from "@/services/api";

const actions = {
  view: true,
};
const columns = ["client name", "email", "subscription", "action"];

interface ITrackSubAdminPaymentRecordsListingProps {}
interface IList {
  _id: string; // User ID
  "client name": string;
  email: string;
  date: Date;
  amount: number;
  subscription: string;
}

const TrackSubAdminPaymentRecordsListing: React.FC<
  ITrackSubAdminPaymentRecordsListingProps
> = () => {
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [list, setList] = useState<IList[]>([]);
  const [tableFilters, setTableFilters] = useState(null);

  useQuery(
    ["trackClietAdmins", tableFilters],
    () => TrackClientAdmins({ filter: tableFilters }),
    {
      onSuccess({ trackClientAdmins }) {
        if (trackClientAdmins) {
          const temp = trackClientAdmins?.flatMap(
            (item: any) =>
              ({
                _id: item._id,
                "client name": `${item.first_name} ${item.last_name}`,
                amount: item.package?.cost,
                date: item.package?.createdAt,
                email: item.email,
                subscription: item.package?.title,
              } as IList)
          );
          setList(temp);
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
    }
  );
  const onViewClick = (_: any) => {
    push(
      {
        pathname: `/track/payments`,
        query: { id: _ },
      },
      undefined,
      { shallow: true }
    );
  };
  return (
    <Core.Table
      id="track-subadmin-payment-records-listing"
      tableData={list}
      columns={columns}
      shadow
      // title="Client-Admin Payments"
      filterBy={["Name", "Package", "Dates"]}
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
      actions={actions}
      isLoading={isLoading}
      onViewClick={onViewClick}
      setTableFilters={setTableFilters}
    />
  );
};

export default TrackSubAdminPaymentRecordsListing;
