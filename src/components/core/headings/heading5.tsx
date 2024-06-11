import type { HeadingProps } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";

interface IH5Props extends HeadingProps {
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
  className?: string;
  color?: string;
  display?: string;
}

const H5: React.FunctionComponent<IH5Props> = ({
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
  className,
  color,
  textAlign,
  display,
}) => {
  return (
    <Heading
      as="h5"
      size="md"
      display={display || "initial"}
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

export default H5;
