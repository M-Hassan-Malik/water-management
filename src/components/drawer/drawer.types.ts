import type { FlexProps } from "@chakra-ui/react";
import type { ReactText } from "react";
import type { IconType } from "react-icons";

export interface LinkItemProps {
  id: string;
  name: string;
  icon: IconType;
  type: "single" | "group";
  links?: Array<LinkItemProps>;
  path?: string | undefined;
  active?: boolean;
}

export interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
  path?: string | undefined;
  active?: boolean;
}

export type SidebarNavGroupProps = {
  title: string;
};
