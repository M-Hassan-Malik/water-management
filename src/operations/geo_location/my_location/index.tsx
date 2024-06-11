import { Box } from "@chakra-ui/react";

import { Dashboard, GeoLocations } from "@/components";

const GeoUserLocationsMainView = () => {
  const breadcrumb = [
    { label: "Waterpark Management", link: "/dashboard" },
    { label: "My Facilities" },
  ];

  return (
    <Box w="100%" p={4}>
      <Dashboard.DashboardHeader heading="Facilities" breadcrumb={breadcrumb} />
      <GeoLocations.UserLocations />
    </Box>
  );
};

export default GeoUserLocationsMainView;
