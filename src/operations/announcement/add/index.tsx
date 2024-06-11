import { Box } from "@chakra-ui/react";

import { Announcement, Dashboard } from "@/components";

const AddAnnouncement = () => {
  const breadcrumb = [
    { label: "Waterpark Management", link: "/dashboard" },
    { label: "Announcements" },
    { label: "Add Announcement", link: "/announcement/add" },
  ];

  return (
    <Box w="100%" p={4}>
      <Dashboard.DashboardHeader
        heading="Add Announcement"
        breadcrumb={breadcrumb}
      />
      {/* <Box
        borderRadius="15px"
        backgroundColor="white.100"
        boxShadow="0px 2px 5px 2px rgba(0,0,0,0.05)"
        padding="20px"
      > */}
      <Announcement.AddAnnouncementForm />
      {/* </Box> */}
    </Box>
  );
};

export default AddAnnouncement;
