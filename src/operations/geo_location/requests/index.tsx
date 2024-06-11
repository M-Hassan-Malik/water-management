import { Box } from "@chakra-ui/react";

import { Dashboard, GeoLocations } from "@/components";

const GeoLocationsRequestsView = () => {
  const breadcrumb = [
    { label: "Waterpark Management", link: "/dashboard" },
    { label: "Locations Requests" },
  ];

  return (
    <Box w="100%" p={4}>
      <Dashboard.DashboardHeader
        heading="Locations Requests"
        breadcrumb={breadcrumb}
      />
      <GeoLocations.GeoLocationsRequests />
    </Box>
  );
};

export default GeoLocationsRequestsView;
