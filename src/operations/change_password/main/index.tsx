import { Box } from "@chakra-ui/react";

import { ChangePassword, Dashboard } from "@/components";

const ChangePasswordView = () => {
  // const conf = getPageFormConfiguration("ADD_SUB_ADMIN");
  const breadcrumb = [
    { label: "Waterpark Management", link: "/dashboard" },
    { label: "Change Password" },
  ];

  return (
    <Box w="100%" p={4}>
      <Dashboard.DashboardHeader
        heading="Change Password"
        breadcrumb={breadcrumb}
      />
      <Box
        maxWidth={"800px"}
        borderRadius="10px"
        padding="20px"
        boxShadow="0px 2px 5px 2px rgba(0,0,0,0.05)"
        backgroundColor="white.100"
      >
        <ChangePassword.ChangePasswordForm />
        {/* <EmailAndNotification.AddEmailOrNotificationForm /> */}
      </Box>
    </Box>
  );
};

export default ChangePasswordView;
