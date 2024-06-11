import { useRouter } from "next/router";
import { useState } from "react";
import { useQuery } from "react-query";

import { Core } from "@/components";
import { UserLocations } from "@/services/api";

const actions = {
  view: true,
};
const columns = ["parkName", "city", "country", "createdOn", "action"];

interface IUserLocationsListingProps {}

const UserLocationsListing: React.FC<IUserLocationsListingProps> = () => {
  const [tableFilters, setTableFilters] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [list, setList] = useState<ILocationLists[]>([]);

  const { push, query } = useRouter();

  useQuery(
    ["user'sLocations", tableFilters],
    () =>
      UserLocations({
        userLocationsId: String(query?.id) || "",
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
      enabled: Boolean(query?.id),
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

  return (
    <Core.Table
      id="user-locations-listing"
      tableData={list}
      columns={columns}
      shadow
      filterBy={["Name", "ParkName"]}
      setTableFilters={setTableFilters}
      isLoading={isLoading}
      actions={actions}
      onViewClick={onViewClick}
    />
  );
};

export default UserLocationsListing;
