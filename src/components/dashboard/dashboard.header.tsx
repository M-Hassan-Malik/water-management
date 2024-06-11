import { Box, Flex } from "@chakra-ui/react";
import Link from "next/link";
import * as React from "react";

import { Core } from "..";
import Breadcrumbs from "../core/breadcrumbs";

interface IDashboardHeaderProps {
  heading: string;
  dropdwonOptions?: any;
  dropdwonType?: string;
  defaultName?: string;
  // selectOption?: (selectedOption: any) => void;
  breadcrumb?: {
    label: string;
    link?: string;
  }[];
  button?:
    | {
        name: string;
        link: string;
      }
    | undefined;
  handleFilter?: any;
}

const DashboardHeader: React.FunctionComponent<IDashboardHeaderProps> = ({
  heading,
  dropdwonOptions,
  dropdwonType,
  defaultName,
  // selectOption,
  breadcrumb,
  button,
  handleFilter,
}) => {
  return (
    <Flex
      justifyContent={"space-between"}
      alignItems="center"
      pt="0px"
      pb="15px"
    >
      <Box pl="5px">
        <Core.H5 color="textColor.500">{heading}</Core.H5>
        <Breadcrumbs breadcrumb={breadcrumb} />
      </Box>
      <Box>
        {dropdwonOptions && (
          <Core.ActionsDropdown
            dropdwonOptions={dropdwonOptions}
            dropdwonType={dropdwonType}
            defaultName={defaultName}
            handleFilter={handleFilter}
            // selectOption={selectOption}
            md
          />
        )}
        &nbsp;&nbsp;
        {button && (
          <Link href={`${button.link}`} as={button.link}>
            <Core.Button btnBlueMd>{button.name}</Core.Button>
          </Link>
        )}
      </Box>
    </Flex>
  );
};

export default DashboardHeader;
