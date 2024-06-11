// import { useState } from "react";
import { Core } from "@/components";

const actions = {
  view: true,
};
interface IStaticReportsListingProps {}

const StaticReportsListing: React.FC<IStaticReportsListingProps> = () => {
  // const [, setTableFilters] = useState(null);
  const data = [
    {
      name: "Static Report 1",
    },
    {
      name: "Static Report 2",
    },
    {
      name: "Static Report 3",
    },
    {
      name: "Static Report 4",
    },
    {
      name: "Static Report 5",
    },
    {
      name: "Static Report 6",
    },
    {
      name: "Static Report 7",
    },
    {
      name: "Static Report 8",
    },
    {
      name: "Static Report 9",
    },
    {
      name: "Static Report 10",
    },
  ];
  const columns = ["name", "action"];

  return (
    <Core.Table
      tableData={data}
      columns={columns}
      shadow
      //   title="Subscription Packages"
      //   filterBy={["Dates"]}
      //   setTableFilters={setTableFilters}
      actions={actions}
      // PACKAGE TYPE KONS EHEN JIS KA FILTER LANA HE?
    />
  );
};

export default StaticReportsListing;
