import { Box } from "@chakra-ui/react";

import { Dashboard, EditContent } from "@/components";
// import { H3 } from "@/components/core";

interface ContentEditProps {
  DashboardHeaderData: {
    heading: string;
    breadcrumb: (
      | {
          label: string;
          link: string;
        }
      | {
          label: string;
          link?: undefined;
        }
    )[];
  };
  heading: string | undefined;
}

const ContentEdit: React.FunctionComponent<ContentEditProps> = ({
  DashboardHeaderData,
  heading,
}) => {
  console.log("heading: ", heading);
  return (
    <Box w="100%" p={4}>
      <Dashboard.DashboardHeader
        heading={DashboardHeaderData.heading}
        breadcrumb={DashboardHeaderData.breadcrumb}
      />
      <Box
        style={{
          minHeight: "calc(100vh - 160px)",
          borderRadius: "10px",
          padding: "10px",
          boxShadow: "0px 2px 5px 2px rgba(0,0,0,0.05)",
        }}
        backgroundColor="white.100"
      >
        {/* <H3>{heading && heading}</H3> */}
        <EditContent.TextEditor />
      </Box>
    </Box>
  );
};

export default ContentEdit;
