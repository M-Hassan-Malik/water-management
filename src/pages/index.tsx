import { Meta } from "@/layouts/Meta";
import { Main } from "@/templates/Main";

const Index = () => {
  return (
    <Main
      meta={<Meta title="Ellis Docs Water Park" description="Ellis Docs" />}
    >
      <a href="https://github.com/ixartz/Next-js-Boilerplate">
        {/* <img
          src={`${router.basePath}/assets/images/nextjs-starter-banner.png`}
          alt="Nextjs starter banner"
        /> */}
        {/* <Image
          src={`${router.basePath}/assets/images/nextjs-starter-banner.png`}
          alt="Nextjs starter banner"
          width={400}
          height={400}
        /> */}
        --
      </a>
    </Main>
  );
};

export default Index;
