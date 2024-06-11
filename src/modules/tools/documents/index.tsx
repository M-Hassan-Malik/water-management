import { Box } from "@chakra-ui/react";

import { Dashboard } from "@/components";
import { DocumentsList, DocumentsUpload } from "@/components/documents";

const DocumentsView = () => {
  const breadcrumb = [
    { label: "Waterpark Management", link: "/dashboard" },
    { label: "Documents" },
  ];
  return (
    <Box w="100%" p={4} position={"relative"}>
      <Dashboard.DashboardHeader heading="Documents" breadcrumb={breadcrumb} />
      <DocumentsUpload />
      <Box
        borderRadius="10px"
        padding="15px"
        boxShadow="0px 2px 5px 2px rgba(0,0,0,0.05)"
        backgroundColor="white.100"
        mt={"10px"}
      >
        <DocumentsList />
      </Box>
    </Box>
  );
};

export default DocumentsView;
