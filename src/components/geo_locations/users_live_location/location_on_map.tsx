import { Box } from "@chakra-ui/react";

interface ILocationOnMapProps {}

const LocationOnMap: React.FC<ILocationOnMapProps> = () => {
  return (
    <Box
      borderRadius="10px"
      padding="20px"
      boxShadow="0px 2px 5px 2px rgba(0,0,0,0.05)"
      backgroundColor="white.100"
      // maxW={query.type === "view" ? "700px" : "800px"}
      mx={"auto"}
      w={"full"}
      maxHeight={"500px"}
      position={"relative"}
      overflow={"hidden"}
    >
      Map
    </Box>
  );
};

export default LocationOnMap;
