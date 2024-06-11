import { Box, Flex, RadioGroup, Stack, Text } from "@chakra-ui/react";
import React, { memo } from "react";

// import { convertModuleOperationPermissionsIDsToTitleCase } from "@/utils/helpers/functions";
import Checkbox from "../checkbox";

interface ICheckListProps {
  permissions: {
    name: { key: string; active: boolean };
    views: { key: string; active: boolean }[];
  }[];
  setPermissions: React.Dispatch<
    React.SetStateAction<
      {
        name: { key: string; active: boolean };
        views: { key: string; active: boolean }[];
      }[]
    >
  >;
  isDisabled: boolean;
  disableViews: boolean;
}

const CheckList: React.FunctionComponent<ICheckListProps> = ({
  permissions,
  setPermissions,
  isDisabled,
  disableViews,
}) => {
  const namePermissionsHandler = (
    value: string,
    name: { key: string; active: boolean },
    views: { key: string; active: boolean }[],
    index: number
  ) => {
    const bool = value === "true";
    const updatedPermissions = [...permissions]; // Create a copy of the permissions array
    const updatedName = {
      name: { key: name.key, active: bool },
      views: bool
        ? views.map((view) => ({ ...view, active: true }))
        : views.map((view) => ({ ...view, active: false })),
    };
    updatedPermissions.splice(index, 1, updatedName); // Replace the element at the specified index with the updated name object
    setPermissions(updatedPermissions); // Update the state with the new permissions array
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
      pt="10px"
      pb="20px"
      pr="25px"
      // maxH={"440px"}
      // overflow={"auto"}
      // className="orange-scrollbar"
    >
      {permissions?.map((perm, nameIndex) => {
        return (
          <Box
            backgroundColor={"gray.200"}
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
              {/* <Box as="p" fontWeight={"bold"}>
                {convertModuleOperationPermissionsIDsToTitleCase(perm.name.key)}
              </Box> */}
              perm.name.key
              <RadioGroup
                isDisabled={isDisabled}
                id={String(nameIndex)}
                value={perm?.name?.active?.toString()}
                onChange={(value) =>
                  namePermissionsHandler(
                    value,
                    perm.name,
                    perm.views,
                    nameIndex
                  )
                }
              >
                <Stack direction="row">
                  {/* <Radio colorScheme="green" value="true">
                    Enable
                  </Radio>
                  <Radio colorScheme="red" value="false">
                    Disable
                  </Radio> */}
                  <Checkbox
                    size="lg"
                    mr={"20px"}
                    //  isChecked={true}
                  />
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
                      {/* {convertModuleOperationPermissionsIDsToTitleCase(
                        view.key
                      )} */}
                      view.key
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
                        {/* <Radio colorScheme="green" value="true">
                          Enable
                        </Radio>
                        <Radio colorScheme="red" value="false">
                          Disable
                        </Radio> */}
                        <Checkbox size="lg" mr={"20px"} />
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

export default memo(CheckList);
