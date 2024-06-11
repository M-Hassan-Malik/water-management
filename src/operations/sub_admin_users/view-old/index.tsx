import { Box } from "@chakra-ui/react";

import { Core, Dashboard } from "@/components";

const UploaderMainView = () => {
  const breadcrumb = [
    { label: "Waterpark Management", link: "/dashboard" },
    { label: "Client Admin", link: "/Client-Admin" },
    { label: "Add Client Admin" },
  ];
  const tabsDetail = {
    tabsName: ["Basic Details", "Parks/Branches", "Subscription History"],
    tabsContent: [
      {
        informations: {
          data: [
            {
              title: "name",
              value: "Ammar Qureshi",
            },
            {
              title: "email",
              value: "abc@gmail.com",
            },
            {
              title: "contact number",
              value: "0323 0000000",
            },
          ],
        },
      },
      {
        informations: {
          data: [
            {
              title: "Total Locations",
              value: "Lorem ipsum dolor ",
            },
            {
              title: "Total Parks",
              value: "Lorem ipsum dolor ",
            },
          ],
        },
        table: {
          columns: ["name", "location", "registeredNo", "action"],
          rowsData: [
            {
              name: "Abc Water Park",
              location: "Kharadar, Karachi",
              registeredNo: "28826387",
              action: {
                edit: true,
                delete: true,
              },
            },
            {
              name: "Kids Water Park",
              location: "Sakkur, Sindh",
              registeredNo: "28826387",
              action: {
                edit: true,
                delete: true,
              },
            },
            {
              name: "Child Water Park",
              location: "Kharadar, Karachi",
              registeredNo: "28826387",
              action: {
                edit: true,
                delete: true,
              },
            },
            {
              name: "Abc Water Park",
              location: "Kharadar, Karachi",
              registeredNo: "28826387",
              action: {
                edit: true,
                delete: true,
              },
            },
          ],
        },
      },
    ],
  };
  return (
    <Box w="100%" p={4} h="100%">
      <Dashboard.DashboardHeader
        heading="Add Client Admin User"
        breadcrumb={breadcrumb}
      />
      <Box
        borderRadius="15px"
        backgroundColor="white.100"
        boxShadow="0px 2px 5px 2px rgba(0,0,0,0.05)"
        padding="20px"
        h="100%"
      >
        <Core.Tabb tabsDetail={tabsDetail} />
      </Box>
    </Box>
  );
};

export default UploaderMainView;
