import * as React from "react";

import { EditContent } from "@/components";

const EulaView = () => {
  const DashboardHeaderData = {
    heading: "Edit EULA",
    breadcrumb: [
      { label: "Waterpark Management", link: "/dashboard" },
      { label: "Edit Content" },
      { label: "EULA", link: "/eula/edit" },
    ],
  };
  const heading = "Edit EULA";
  return (
    <EditContent.ContentEdit
      DashboardHeaderData={DashboardHeaderData}
      heading={heading}
    />
  );
};

export default EulaView;
