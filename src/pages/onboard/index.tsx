import { Box, ChakraProvider } from "@chakra-ui/react";
import type { GetServerSideProps } from "next";
import React from "react";

import { orangeDefaultTheme } from "@/utils/AppConfig";

import RegistrationClient from "./register_client";

interface OnboardProps {
  queryParams: {
    id: string | null;
  };
}

const Onboard: React.FC<OnboardProps> = ({ queryParams }) => {
  return (
    <ChakraProvider theme={orangeDefaultTheme}>
      <Box w="100%" p={4} minHeight={"100vh"} className="bg-[#e9e9e9]">
        {/* Use queryParams.id in your component */}
        {queryParams?.id ? (
          <RegistrationClient packageId={queryParams.id as string} />
        ) : (
          <p>Invalid url parameters</p>
        )}
      </Box>
    </ChakraProvider>
  );
};

export const getServerSideProps: GetServerSideProps<OnboardProps> = async ({
  query,
}) => {
  // Extract query parameters here
  const { id } = query;

  // Pass the query parameters as props to the component
  return {
    props: {
      queryParams: {
        id: id ? String(id) : null,
      },
    },
  };
};

export default Onboard;
