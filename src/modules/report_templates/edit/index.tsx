import { Box } from "@chakra-ui/react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { Dashboard, ReportTemplate } from "@/components";

const EditReportTemplate = () => {
  const breadcrumb = [
    { label: "Waterpark Management", link: "/dashboard" },
    { label: "Report Templates", link: "/report-templates" },
    { label: "Edit Report Templates" },
  ];

  return (
    <Box width="100%" p={4}>
      <Dashboard.DashboardHeader
        breadcrumb={breadcrumb}
        heading="Report Templates"
      />
      <Box
        width={"49.5%"}
        borderRadius="10px"
        padding="20px"
        boxShadow="0px 2px 5px 2px rgba(0,0,0,0.05)"
        backgroundColor="white.500"
        minWidth={"100%"}
      >
        <DndProvider backend={HTML5Backend}>
          <ReportTemplate.ReportTemplateBuilder pageType={"edit"} />
        </DndProvider>
      </Box>
    </Box>
  );
};

export default EditReportTemplate;
