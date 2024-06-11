import { Box } from "@chakra-ui/react";

import { Layouts } from "@/components";
import { Meta } from "@/layouts/Meta";
import ModuleSubPage from "@/utils/pages/slug.view";

const Page = () => {
  return <ModuleSubPage />;
};

Page.getLayout = function getLayout(page: React.ReactNode) {
  return (
    <Layouts.AdminLayout
      meta={
        <Meta
          title="Ellis Docs Water Park"
          description="Next js Boilerplate is the perfect starter code for your project. Build your React application with the Next.js framework."
        />
      }
    >
      <Box maxWidth={"1700px"} mx={"auto"} h={"90vh"}>
        {page}
      </Box>
    </Layouts.AdminLayout>
  );
};

export default Page;
