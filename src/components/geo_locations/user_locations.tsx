import { useRouter } from "next/router";
import { useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";

import { Core } from "@/components";
import { UserLocations } from "@/services/api";

const actions = {
  view: true,
  edit: true,
};
const columns = [
  "parkName",
  "facility",
  "city",
  "country",
  "status",
  "createdOn",
  "action",
];

interface IUserLocationsListingProps {}

const UserLocationsListing: React.FC<IUserLocationsListingProps> = () => {
  const user: IUser = useSelector((state: any) => state.user.user);
  const [tableFilters, setTableFilters] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [list, setList] = useState<ILocationLists[]>([]);

  const { push, query } = useRouter();

  useQuery(
    ["user'sLocations", tableFilters, user?._id],
    () =>
      UserLocations({
        userLocationsId: String(query?.id) || user?._id || "",
        filter: tableFilters,
      }),
    {
      onSuccess: ({ userLocations }) => {
        setIsLoading(false);
        if (userLocations) setList(userLocations as ILocationLists[]);
      },
      onError(err) {
        console.log("err", err);
        setIsLoading(false);
      },
      enabled: Boolean(query?.id) || Boolean(user?._id),
      refetchOnMount: true,
    }
  );

  const onViewClick = (_: any) => {
    push(
      {
        pathname: "/geo-locations/view",
        query: { id: _ },
      },
      undefined,
      {
        shallow: true,
      }
    );
  };

  const onEditClick = (_: any) => {
    push(
      {
        pathname: "/geo-locations/edit",
        query: { id: _ },
      },
      undefined,
      {
        shallow: true,
      }
    );
  };

  return (
    <Core.Table
      id="user-locations-listing"
      tableData={list}
      columns={columns}
      shadow
      filterBy={["Dates"]}
      setTableFilters={setTableFilters}
      isLoading={isLoading}
      actions={actions}
      onViewClick={onViewClick}
      onEditClick={onEditClick}
    />
  );
};

export default UserLocationsListing;
