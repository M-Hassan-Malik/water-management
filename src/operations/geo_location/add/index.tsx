import { Box } from "@chakra-ui/react";

import { Dashboard, GeoLocations } from "@/components";

const AddGeoLocationView = () => {
  const breadcrumb = [
    { label: "Waterpark Management", link: "/dashboard" },
    { label: "Geo Locations", link: "/geo-locations" },
    { label: "Add Facility" },
  ];

  return (
    <Box w="100%" p={4}>
      <Dashboard.DashboardHeader
        heading="Add Facility"
        breadcrumb={breadcrumb}
      />
      <Box
        borderRadius="15px"
        backgroundColor="white.100"
        boxShadow="0px 2px 5px 2px rgba(0,0,0,0.05)"
        padding="20px"
      >
        <GeoLocations.ActionGeoLocation pageType={"create"} />
      </Box>
    </Box>
  );
};

export default AddGeoLocationView;
