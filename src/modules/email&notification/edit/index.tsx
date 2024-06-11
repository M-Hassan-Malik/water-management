import { Box } from "@chakra-ui/react";

import { Dashboard, EmailAndNotification } from "@/components";

const EmailAndNotificationEdit = () => {
  const breadcrumb = [
    { label: "Waterpark Management", link: "/dashboard" },
    { label: "Email & Notifications", link: "/email-&-notifications" },
    { label: "Edit Email or Notification" },
  ];

  return (
    <Box width="100%" p={4}>
      <Dashboard.DashboardHeader
        heading="Email or Notifications"
        breadcrumb={breadcrumb}
      />
      <EmailAndNotification.ActionEmailOrNotificationForm />
    </Box>
  );
};

export default EmailAndNotificationEdit;
