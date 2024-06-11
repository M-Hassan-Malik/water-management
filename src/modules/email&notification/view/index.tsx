import { Box } from "@chakra-ui/react";

import { Dashboard, EmailAndNotification } from "@/components";

const EmailAndNotificationView = () => {
  const breadcrumb = [
    { label: "Waterpark Management", link: "/dashboard" },
    { label: "Email & Notifications", link: "/email-&-notifications" },
    { label: "Email or Notifications" },
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

export default EmailAndNotificationView;
