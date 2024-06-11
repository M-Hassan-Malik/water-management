import { Box } from "@chakra-ui/react";

import { Dashboard } from "@/components";

const GalleryView = () => {
  const breadcrumb = [
    { label: "Waterpark Management", link: "/dashboard" },
    { label: "Gallery" },
  ];
  return (
    <Box w="100%" p={4}>
      <Dashboard.DashboardHeader heading="Gallery" breadcrumb={breadcrumb} />
      <Box
        borderRadius="10px"
        padding="20px"
        boxShadow="0px 2px 5px 2px rgba(0,0,0,0.05)"
        backgroundColor="white.100"
        maxWidth={"1200px"}
        width={"100%"}
      >
        <h1>To be Implemented</h1>
      </Box>
    </Box>
  );
};

export default GalleryView;
