import { Box } from "@/common/chakra_imports/chakra_imports";
import { Core, Dashboard } from "@/components";

interface IWebsitContactFormDetailsProps {}

const breadcrumb = [
  { label: "Waterpark Management", link: "/dashboard" },
  { label: "website-contact-form", link: "/website-contact-form" },
  {
    label: "Website Contact Form Details",
  },
];

const contactFormDetails = {
  senderName: "John Doe",
  email: "email@liame.com",
  description:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  currentStatus: "pending",
  phoneNo: "0000-0000000",
  dueDateAndTime: new Date(),
};

const WebsitContactFormDetails: React.FunctionComponent<
  IWebsitContactFormDetailsProps
> = (_props) => {
  return (
    <Box width="100%" p={4}>
      <Dashboard.DashboardHeader
        heading="Website Contact Form Details"
        breadcrumb={breadcrumb}
      />
      <Core.WebsiteContactFormDetails contactFormDetails={contactFormDetails} />
    </Box>
  );
};

export default WebsitContactFormDetails;
