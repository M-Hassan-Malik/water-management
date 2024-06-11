import {
  Box,
  Checkbox,
  Flex,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import type { ChangeEvent } from "react";
import { memo } from "react";

import { Input } from "@/components/core";
import { EIndicator } from "@/graphql/generated/graphql";
import { convertModuleOperationPermissionsIDsToTitleCase } from "@/utils/helpers/functions";

interface ISubscriptionPermissionsListProps {
  permissions: {
    name: { key: string; active: boolean };
    views: { key: string; active: boolean }[];
    usage: number;
    indicator: EIndicator;
  }[];
  setPermissions: React.Dispatch<
    React.SetStateAction<
      {
        name: { key: string; active: boolean };
        views: { key: string; active: boolean }[];
        usage: number;
        indicator: EIndicator;
      }[]
    >
  >;
  isDisabled: boolean;
  disableViews: boolean;
  setIsRoleIdChange?: any;
}

const SubscriptionPermissionsList: React.FunctionComponent<
  ISubscriptionPermissionsListProps
> = ({
  permissions,
  setPermissions,
  isDisabled,
  disableViews,
  setIsRoleIdChange,
}) => {
  const namePermissionsHandler = (
    value: string,
    name: { key: string; active: boolean },
    views: { key: string; active: boolean }[],
    usage: number,
    indicator: EIndicator,
    index: number
  ) => {
    const bool = value === "true";
    const updatedPermissions = [...permissions]; // Create a copy of the permissions array
    const updatedName = {
      name: { key: name.key, active: bool },
      usage,
      indicator,
      views: bool
        ? views.map((view) => ({ ...view, active: true }))
        : views.map((view) => ({ ...view, active: false })),
    };
    updatedPermissions.splice(index, 1, updatedName); // Replace the element at the specified index with the updated name object
    setPermissions(updatedPermissions); // Update the state with the new permissions array
    if (setIsRoleIdChange) setIsRoleIdChange(false);
  };

  const usageHandler = (
    event: ChangeEvent<HTMLInputElement>,
    name: { key: string; active: boolean },
    views: { key: string; active: boolean }[],
    usage: number,
    indicator: EIndicator,
    index: number
  ) => {
    event.preventDefault();

    const { name: targetName, value: targetValue, checked } = event.target;

    if (targetName === "usage-limit") {
      const updatedPermissions = [...permissions]; // Create a copy of the permissions array
      const updatedName = {
        name,
        views,
        usage: Number(targetValue),
        indicator,
      };

      updatedPermissions.splice(index, 1, updatedName); // Replace the element at the specified index with the updated name object
      setPermissions(updatedPermissions); // Update the state with the new permissions array
      if (setIsRoleIdChange) setIsRoleIdChange(false);
    } else if (targetName === "usage-checkbox") {
      const updatedPermissions = [...permissions]; // Create a copy of the permissions array
      const updatedName = {
        name,
        views,
        usage,
        indicator: checked ? EIndicator.Limitless : EIndicator.Limited,
      };

      updatedPermissions.splice(index, 1, updatedName); // Replace the element at the specified index with the updated name object
      setPermissions(updatedPermissions); // Update the state with the new permissions array
      if (setIsRoleIdChange) setIsRoleIdChange(false);
    }
  };

  const viewPermissionsHandler = (
    value: string,
    nameIndex: number,
    viewIndex: number
  ) => {
    let bool: boolean = false;
    if (value === "true") bool = true;
    // Create a copy of the permissions array
    const updatedPermissions = [...permissions];
    // Retrieve the existing name object at nameIndex
    const existingNameObject = updatedPermissions[nameIndex];
    if (existingNameObject) {
      // Create a copy of the views array in the existing name object
      const updatedViews = [...existingNameObject.views];
      // Replace the existing view object at the specified viewIndex with the updated view
      updatedViews.splice(viewIndex, 1, {
        key: updatedViews[viewIndex]?.key ?? "",
        active: bool,
      });
      // Create an updated name object with the updated views array
      const updatedNameObject = { ...existingNameObject, views: updatedViews };
      // Replace the existing name object in the permissions array at the specified nameIndex with the updated name object
      updatedPermissions.splice(nameIndex, 1, updatedNameObject);

      const allViewsEnabled = updatedNameObject.views.some(
        (view) => view.active === true
      );

      if (allViewsEnabled) {
        updatedNameObject.name.active = true;
      }

      const allViewsDisabled = updatedNameObject.views.every(
        (view) => view.active === false
      );

      if (allViewsDisabled) {
        updatedNameObject.name.active = false;
      }

      // Set the updated permissions array
      setPermissions(updatedPermissions);
    }
  };

  return (
    <Flex
      flexDirection="column"
      justifyContent="space-between"
      w="100%"
      rowGap={"10px"}
      pt="5px"
      pb="20px"
      pr="25px"
      maxH={"440px"}
      overflow={"auto"}
      className="orange-scrollbar"
    >
      {permissions?.map((perm, nameIndex) => {
        return (
          <Box
            color={"textColor"}
            backgroundColor={"gray.200"}
            // background={'linear-gradient(45deg, #dcdcdc, #fbfbfb)'}
            borderRadius={"10px"}
            p="10px"
            key={nameIndex}
          >
            <Flex
              flexDirection="row"
              justifyContent="space-between"
              w="100%"
              pb="5px"
              borderBottom={"1px solid #ddd"}
            >
              <Box as="p" fontWeight={"bold"} textTransform={"capitalize"}>
                {convertModuleOperationPermissionsIDsToTitleCase(perm.name.key)}
              </Box>

              {perm.name.active && (
                <Flex
                  background={"white.100"}
                  p={2}
                  borderRadius={"5px"}
                  columnGap={"10px"}
                >
                  <Input
                    name="usage-limit"
                    placeholder="Usage Limit"
                    type="number"
                    size="sm"
                    value={
                      perm.indicator === EIndicator.Limitless ? 0 : perm.usage
                    }
                    onChange={(e) =>
                      usageHandler(
                        e,
                        perm.name,
                        perm.views,
                        perm.usage,
                        perm.indicator,
                        nameIndex
                      )
                    }
                  >
                    Number of Module Usage
                  </Input>
                  <Flex columnGap={"5px"} justifyContent={"center"}>
                    <Checkbox
                      name={"usage-checkbox"}
                      isChecked={perm.indicator === EIndicator.Limitless}
                      colorScheme="orange"
                      onChange={(e) =>
                        usageHandler(
                          e,
                          perm.name,
                          perm.views,
                          perm.usage,
                          perm.indicator,
                          nameIndex
                        )
                      }
                    >
                      <span className="whitespace-nowrap text-[14px]">
                        Limitless usage
                      </span>
                    </Checkbox>
                  </Flex>
                </Flex>
              )}

              <RadioGroup
                isDisabled={isDisabled}
                id={String(nameIndex)}
                value={perm?.name?.active?.toString()}
                onChange={(value) =>
                  namePermissionsHandler(
                    value,
                    perm.name,
                    perm.views,
                    perm.usage,
                    perm.indicator,
                    nameIndex
                  )
                }
              >
                <Stack direction="row">
                  <Radio colorScheme="green" value="true">
                    Enable
                  </Radio>
                  <Radio colorScheme="red" value="false">
                    Disable
                  </Radio>
                </Stack>
              </RadioGroup>
            </Flex>
            <Flex
              flexDirection="column"
              justifyContent="space-between"
              w="100%"
              pt="5px"
            >
              {perm?.views?.length &&
                perm?.views?.map((view: any, viewIndex: number) => (
                  <Flex
                    key={`${nameIndex}-${viewIndex}`}
                    flexDirection="row"
                    justifyContent="space-between"
                    w="100%"
                    pt="4px"
                  >
                    <Text as="p" fontSize={"sm"} pl="10px">
                      {convertModuleOperationPermissionsIDsToTitleCase(
                        view.key
                      )}
                    </Text>

                    <RadioGroup
                      isDisabled={isDisabled || disableViews}
                      id={String(viewIndex)}
                      value={view?.active?.toString() || perm.name.active}
                      onChange={(value) =>
                        viewPermissionsHandler(value, nameIndex, viewIndex)
                      }
                    >
                      <Stack direction="row">
                        <Radio colorScheme="green" value="true">
                          Enable
                        </Radio>
                        <Radio colorScheme="red" value="false">
                          Disable
                        </Radio>
                      </Stack>
                    </RadioGroup>
                  </Flex>
                ))}
            </Flex>
          </Box>
        );
      })}
    </Flex>
  );
};

export default memo(SubscriptionPermissionsList);
