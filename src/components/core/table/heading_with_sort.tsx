import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";

import { Icons } from "@/components/icons";

interface IHeadingWithSortProps {
  title?: string;
  sortOrderId?: boolean;
  sortDueDate?: boolean;
  sortRegisteredNo?: boolean;
  sortCreatedOn?: boolean;
  sortPaymentDate?: boolean;
  sortUserId?: boolean;
  sortCustomerName?: boolean;
  sortDate?: boolean;
  sortAmount?: boolean;
  sortName?: boolean;
}

const HeadingWithSort: React.FunctionComponent<IHeadingWithSortProps> = ({
  title,
  sortOrderId,
  sortDueDate,
  sortRegisteredNo,
  sortCreatedOn,
  sortPaymentDate,
  sortUserId,
  sortCustomerName,
  sortDate,
  sortAmount,
  sortName,
}) => {
  return (
    <Flex color={"inherit"}>
      <Text color={"inherit"}>{title}</Text>
      {(sortOrderId ||
        sortDueDate ||
        sortRegisteredNo ||
        sortCreatedOn ||
        sortPaymentDate ||
        sortUserId ||
        sortCustomerName ||
        sortDate ||
        sortAmount ||
        sortName) && (
        <Flex flexDirection={"column"} pl="4px">
          <Box as="span" position={"relative"} _hover={{ color: "blue.400" }}>
            <Icons.TiArrowSortedUp
              fontSize={"13px"}
              cursor="pointer"
              style={{ marginTop: "-3px" }}
            />
          </Box>
          <Box as="span" position={"relative"} _hover={{ color: "blue.400" }}>
            <Icons.TiArrowSortedDown
              fontSize={"13px"}
              cursor="pointer"
              style={{ marginTop: "-5px" }}
            />
          </Box>
        </Flex>
      )}
    </Flex>
  );
};

export default HeadingWithSort;
