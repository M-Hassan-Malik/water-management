/* eslint-disable prettier/prettier */
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import * as React from "react";

interface IBreadcrumbsProps {
  breadcrumb?: any;
}

const Breadcrumbs: React.FunctionComponent<IBreadcrumbsProps> = ({
  breadcrumb,
}) => {
  return (
    <Breadcrumb fontWeight="normal" fontSize="xs" pt="2px" opacity={0.8}>
      {breadcrumb?.map((br: any, index: any) => (
        <BreadcrumbItem key={index * 4}>
          {br.link ? (
            <BreadcrumbLink href={br.link} className="hover:border-0" textTransform={"capitalize"}>
              {br.label}
            </BreadcrumbLink>
          ) : (
            <span>{br.label}</span>
          )}
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
};

export default Breadcrumbs;
