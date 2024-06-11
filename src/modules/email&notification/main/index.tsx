import { Box } from "@chakra-ui/react";

import { Dashboard, EmailAndNotification } from "@/components";

interface TaskMainViewProps {}

const breadcrumb = [
  { label: "Waterpark Management", link: "/dashboard" },
  { label: "Email & Notifications" },
];

const TaskMainView = (_props: TaskMainViewProps) => {
  return (
    <Box width="100%" p={4}>
      <Dashboard.DashboardHeader
        heading="Email & Notifications"
        breadcrumb={breadcrumb}
      />
      <EmailAndNotification.EmailOrNotificationsListing />
    </Box>
  );
};

export default TaskMainView;
