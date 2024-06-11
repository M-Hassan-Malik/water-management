import type { HeadingProps } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";

interface IH2Props extends HeadingProps {
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

const H2: React.FunctionComponent<IH2Props> = ({
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
}) => {
  return (
    <Heading
      textTransform={"capitalize"}
      as="h5"
      size="lg"
      color={color || "#555"}
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

export default H2;
