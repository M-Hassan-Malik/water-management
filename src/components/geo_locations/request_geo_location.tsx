import { useRouter } from "next/router";
import { useState } from "react";
import { useQuery } from "react-query";

import { Core } from "@/components";
import { RequestedLocations } from "@/services/api";

const actions = {
  view: true,
};
const columns = ["parkName", "city", "country", "createdOn", "action"];

interface IGeoLocationsListingProps {}

const GeoLocationsRequests: React.FC<IGeoLocationsListingProps> = () => {
  const [tableFilters, setTableFilters] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [list, setList] = useState<ILocationLists[]>([]);

  const { push } = useRouter();

  useQuery(
    ["requestedLocations", tableFilters],
    () => RequestedLocations({ filter: tableFilters }),
    {
      onSuccess: ({ requestedLocations }) => {
        setIsLoading(false);
        if (requestedLocations) setList(requestedLocations as ILocationLists[]);
      },
      onError(err) {
        setIsLoading(false);
        console.log(err);
      },
      refetchOnMount: true,
    }
  );

  const onViewClick = (id: any) => {
    push(
      {
        pathname: "/geo-locations/view",
        query: { id },
      },
      undefined,
      {
        shallow: true,
      }
    );
  };

  return (
    <Core.Table
      id="geo-locations-listing"
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

export default GeoLocationsRequests;
