import { useState } from "react";

import { Core } from "@/components";

const actions = {
  edit: true,
};
interface ISubscriptionPackagesListingProps {}

const SubscriptionPackagesListing: React.FC<
  ISubscriptionPackagesListingProps
> = () => {
  const [, setTableFilters] = useState(null);
  const data = [
    {
      name: "Package Name",
      timePeriod: "1 years",
      amount: "200",
    },
    {
      name: "Package Name",
      timePeriod: "6 months",
      amount: "100",
    },
    {
      name: "Package Name",
      timePeriod: "2 years",
      amount: "100",
    },
    {
      name: "Package Name",
      timePeriod: "3 months",
      amount: "100",
    },
    {
      name: "Package Name",
      timePeriod: "1.5 years",
      amount: "100",
    },
    {
      name: "Package Name",
      timePeriod: "1 years",
      amount: "200",
    },
    {
      name: "Package Name",
      timePeriod: "2 years",
      amount: "200",
    },
    {
      name: "Package Name",
      timePeriod: "6 months",
      amount: "100",
    },
    {
      name: "Package Name",
      timePeriod: "1 years",
      amount: "100",
    },
    {
      name: "Package Name",
      timePeriod: "2 years",
      amount: "100",
    },
  ];
  const columns = ["name", "timePeriod", "amount", "action"];
  return (
    <Core.Table
      id="subscription-packages-listing"
      tableData={data}
      columns={columns}
      shadow
      title="Subscription Packages"
      filterBy={["Dates"]}
      setTableFilters={setTableFilters}
      actions={actions}
    />
  );
};

export default SubscriptionPackagesListing;
