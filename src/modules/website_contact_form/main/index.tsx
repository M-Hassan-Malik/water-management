import { Box } from "@chakra-ui/react";

import { Dashboard, WebsitContactForm } from "@/components";

interface TaskMainViewProps {}

const breadcrumb = [
  { label: "Waterpark Management", link: "/dashboard" },
  { label: "Website Contact Form" },
];

const TaskMainView = (_props: TaskMainViewProps) => {
  return (
    <Box width="100%" p={4}>
      <Dashboard.DashboardHeader
        heading="Website Contact Form"
        breadcrumb={breadcrumb}
      />
      <WebsitContactForm.WebsiteContactFormListing />
    </Box>
  );
};

export default TaskMainView;
