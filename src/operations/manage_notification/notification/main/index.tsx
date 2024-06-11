import { Box } from "@chakra-ui/react";

import { Dashboard } from "@/components";
import { NotificationsListing } from "@/components/manage_notification";

interface AllNotificationsProps {}
const AllNotifications: React.FC<AllNotificationsProps> = (_props) => {
  return (
    <Box w="100%" p={4}>
      <Dashboard.DashboardHeader heading="Notifications" />
      <NotificationsListing />
    </Box>
  );
};

export default AllNotifications;
