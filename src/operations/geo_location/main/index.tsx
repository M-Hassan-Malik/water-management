import { Box } from "@chakra-ui/react";

import { Dashboard, GeoLocations } from "@/components";

const GeoLocationsMainView = () => {
  const breadcrumb = [
    { label: "Waterpark Management", link: "/dashboard" },
    { label: "Geo Locations" },
  ];

  return (
    <Box w="100%" p={4}>
      <Dashboard.DashboardHeader
        heading="Geo Locations"
        breadcrumb={breadcrumb}
      />
      <GeoLocations.GeoLocationsListing />
    </Box>
  );
};

export default GeoLocationsMainView;
