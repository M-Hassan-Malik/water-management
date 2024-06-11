import * as React from "react";

import { EditContent } from "@/components";

const AboutView = () => {
  const DashboardHeaderData = {
    heading: "Edit About Us",
    breadcrumb: [
      { label: "Waterpark Management", link: "/dashboard" },
      { label: "Edit Content" },
      { label: "About Us", link: "/about-us/edit" },
    ],
  };
  const heading = "Edit About Us";
  return (
    <EditContent.ContentEdit
      DashboardHeaderData={DashboardHeaderData}
      heading={heading}
    />
  );
};

export default AboutView;
