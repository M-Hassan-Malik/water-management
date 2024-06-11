import { Box } from "@chakra-ui/react";

import { Dashboard, GeoLocations } from "@/components";
import { AttractionsListing } from "@/components/attractions";

const AddGeoLocationView = () => {
  const breadcrumb = [
    { label: "Waterpark Management", link: "/dashboard" },
    { label: "My Facilities", link: "/geo-locations" },
    { label: "Edit Facility" },
  ];

  return (
    <Box w="100%" p={4}>
      <Dashboard.DashboardHeader
        heading="Edit Facility"
        breadcrumb={breadcrumb}
      />
      <Box
        borderRadius="15px"
        backgroundColor="white.100"
        boxShadow="0px 2px 5px 2px rgba(0,0,0,0.05)"
        padding="20px"
      >
        <GeoLocations.ActionGeoLocation pageType={"edit"} />
      </Box>
      <AttractionsListing />
    </Box>
  );
};

export default AddGeoLocationView;
