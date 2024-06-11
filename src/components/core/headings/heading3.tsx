import type { HeadingProps } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";

interface IH3Props extends HeadingProps {
  m?: string;
  mt?: string;
  mr?: string;
  mb?: string;
  ml?: string;
  p?: string;
  pt?: string;
  pr?: string;
  pb?: string;
  pl?: string;
  children?: string;
  color?: string;
  className?: string;
}

const H3: React.FunctionComponent<IH3Props> = ({
  m,
  mt,
  mr,
  mb,
  ml,
  p,
  pt,
  pr,
  pb,
  pl,
  children,
  color,
  className,
  textAlign,
  fontSize,
}) => {
  return (
    <Heading
      textTransform={"capitalize"}
      as="h3"
      color={color || "#212121"}
      fontSize={fontSize || "25px"}
      textAlign={textAlign}
      className={className && className}
      m={m && m}
      mt={mt && mt}
      mr={mr && mr}
      mb={mb && mb}
      ml={ml && ml}
      p={p && p}
      pt={pt && pt}
      pr={pr && pr}
      pb={pb && pb}
      pl={pl && pl}
    >
      {children && children}
    </Heading>
  );
};

export default H3;
