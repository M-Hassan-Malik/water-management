import { Box } from "@chakra-ui/react";

const ItemBtn = ({
  children,
  px,
  py,
  pt,
  pr,
  pb,
  pl,
  p,
  radiusFull,
  bg,
}: {
  children: React.ReactNode;
  pt?: string;
  pr?: string;
  pb?: string;
  pl?: string;
  px?: string;
  py?: string;
  p?: string;
  bg?: string;
  radiusFull?: boolean;
}) => {
  return (
    <Box
      p={p || "0"}
      px={px || ""}
      py={py || ""}
      pt={pt || ""}
      pr={pr || ""}
      pb={pb || ""}
      pl={pl || ""}
      borderRadius={radiusFull ? "100px" : "5px"}
      overflow={"hidden"}
      fontSize="14px"
      style={{
        borderWidth: "1px",
        cursor: "pointer",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      }}
      className="item-btn"
      backgroundColor={bg || ""}
    >
      {children}
    </Box>
  );
};
export default ItemBtn;
