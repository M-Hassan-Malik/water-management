import { Box } from "@chakra-ui/react";

import { Dashboard } from "@/components";
import { ActionGeoLocation } from "@/components/geo_locations";

const AddGeoLocationView = () => {
  const breadcrumb = [
    { label: "Waterpark Management", link: "/dashboard" },
    { label: "Geo Locations", link: "/geo-locations" },
    { label: "Location Details" },
  ];

  return (
    <Box w="100%" p={4}>
      <Dashboard.DashboardHeader
        heading="Location Details"
        breadcrumb={breadcrumb}
      />
      <Box
        borderRadius="15px"
        backgroundColor="white.100"
        boxShadow="0px 2px 5px 2px rgba(0,0,0,0.05)"
        padding="20px"
      >
        <ActionGeoLocation pageType={"view"} />
      </Box>
    </Box>
  );
};

export default AddGeoLocationView;
