import { Box } from "@chakra-ui/react";

import { Dashboard, TrackSubAdminPaymentRecords } from "@/components";

const ViewParticularClientsRecord = () => {
  const breadcrumb = [
    { label: "Waterpark Management", link: "/dashboard" },
    { label: "Manage Payment", link: "/payment-records/track" },
    {
      label: "Track Records",
      link: "/payment-records/track",
    },
    {
      label: "Details",
    },
  ];

  return (
    <Box w="100%" p={4}>
      <Dashboard.DashboardHeader heading="Details" breadcrumb={breadcrumb} />
      <TrackSubAdminPaymentRecords.TrackParticularClientsRecord />
    </Box>
  );
};

export default ViewParticularClientsRecord;
