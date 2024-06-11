import * as React from "react";

import { EditContent } from "@/components";

const FaqView = () => {
  const DashboardHeaderData = {
    heading: "Edit FAQ",
    breadcrumb: [
      { label: "Waterpark Management", link: "/dashboard" },
      { label: "Edit Content" },
      { label: "FAQ", link: "/faq/edit" },
    ],
  };
  const heading = "Edit FAQ";
  return (
    <EditContent.ContentEdit
      DashboardHeaderData={DashboardHeaderData}
      heading={heading}
    />
  );
};

export default FaqView;
