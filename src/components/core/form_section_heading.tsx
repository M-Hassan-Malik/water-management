import { Flex, Heading } from "@chakra-ui/react";

interface IFormSectionHeadingProps {
  children: string;
}

const FormSectionHeading: React.FunctionComponent<IFormSectionHeadingProps> = ({
  children,
}) => {
  return (
    <Flex
      width={"100%"}
      // mt={"10px"}
      mb={"15px"}
      alignItems={"center"}
    >
      <Heading
        as="h3"
        fontSize={"17px"}
        color="#555"
        pb={"5px"}
        //  w={"210px"}
        width={"100%"}
        backgroundColor={"white.100"}
        className="form-section-heading"
      >
        {children}
      </Heading>
      {/* <Box width={"100%"} h={"2px"} borderBottom={"1px solid gray"}></Box> */}
    </Flex>
  );
};

export default FormSectionHeading;
