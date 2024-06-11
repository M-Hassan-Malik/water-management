import { Box } from "@chakra-ui/react";

import { Dashboard, ManageProfile } from "@/components";

const Profile = () => {
  return (
    <Box w="100%" p={4}>
      <Dashboard.DashboardHeader heading="Mange Profile" />
      <Box
        borderRadius="15px"
        padding="20px"
        boxShadow="0px 2px 5px 2px rgba(0,0,0,0.05)"
        backgroundColor="white.100"
      >
        <ManageProfile.ProfileForm />
      </Box>
    </Box>
  );
};

export default Profile;
