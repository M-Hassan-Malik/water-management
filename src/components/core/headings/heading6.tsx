import type { HeadingProps } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import * as React from "react";

interface IH6Props extends HeadingProps {
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
}

const H6: React.FunctionComponent<IH6Props> = ({
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
}) => {
  return (
    <Heading
      as="h5"
      size="xs"
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

export default H6;
