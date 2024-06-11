import { Spinner } from "@chakra-ui/react";

interface IBtnSpinnerProps {
  size?: string;
  mt?: string;
}

const BtnSpinner: React.FunctionComponent<IBtnSpinnerProps> = ({
  size,
  mt,
}) => {
  return (
    <Spinner
      size={size || "xl"}
      mt={mt && mt}
      thickness="4px"
      speed="0.80s"
      // style={
      //   size
      //     ? { width: "60px", height: "60px" }
      //     : { width: "30px", height: "30px" }
      // }
      color="gray.400"
      emptyColor="white"
    />
  );
};

export default BtnSpinner;
