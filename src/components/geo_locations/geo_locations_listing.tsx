import { useRouter } from "next/router";
import { useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";

import { Core } from "@/components";
import { GetUserParks } from "@/services/api";

const columns = ["userName", "parkName", "createdOn", "status", "action"];

interface IGeoLocationsListingProps {}

const actions = {
  view: true,
};

const GeoLocationsListing: React.FC<IGeoLocationsListingProps> = () => {
  const { push } = useRouter();
  const [tableFilters, setTableFilters] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const user: IUser = useSelector((state: any) => state.user.user);
  const [list, setList] = useState<IUserLocationListing[]>([]);

  useQuery(
    ["GetUserGeo", tableFilters],
    () => GetUserParks({ userId: user._id || "", filter: tableFilters }),
    {
      onSuccess: ({ getUserParks }) => {
        setIsLoading(false);
        if (getUserParks) setList(getUserParks as IUserLocationListing[]);
      },
      onError(err) {
        setIsLoading(false);
        console.log(err);
      },
      refetchOnMount: true,
      enabled: Boolean(user._id),
    }
  );

  const onViewClick = (id: any) => {
    push(
      {
        pathname: "/geo-locations/user-locations-listing",
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
      // actionButton={{
      //   name: "Add Location",
      //   link: "/geo-locations/add",
      // }}
      tableData={list}
      columns={columns}
      shadow
      // title="Geo Locations"
      filterBy={["Name", "ParkName"]}
      setTableFilters={setTableFilters}
      actions={actions}
      onViewClick={onViewClick}
      isLoading={isLoading}
    />
  );
};

export default GeoLocationsListing;
