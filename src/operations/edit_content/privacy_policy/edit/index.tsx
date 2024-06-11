import * as React from "react";

import { EditContent } from "@/components";

const PrivacyPolicyView = () => {
  const DashboardHeaderData = {
    heading: "Edit Privacy Policy",
    breadcrumb: [
      { label: "Waterpark Management", link: "/dashboard" },
      { label: "Edit Content" },
      { label: "Privacy Policy", link: "/privacy-policy/edit" },
    ],
  };
  const heading = "Edit Privacy Policy";
  return (
    <EditContent.ContentEdit
      DashboardHeaderData={DashboardHeaderData}
      heading={heading}
    />
  );
};

export default PrivacyPolicyView;
