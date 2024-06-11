import {
  Box,
  Flex,
  Radio,
  RadioGroup,
  Stack,
  Text,
  // useRadio,
} from "@chakra-ui/react";
import { memo } from "react";

import { convertModuleOperationPermissionsIDsToTitleCase } from "@/utils/helpers/functions";

interface IPermissionsListProps {
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
  setIsRoleIdChange?: any;
}

const PermissionsList: React.FunctionComponent<IPermissionsListProps> = ({
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
    if (setIsRoleIdChange) setIsRoleIdChange(false);
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

  // const CustomRadio = (props:any) => {
  //   const { getInputProps, getCheckboxProps } = useRadio(props);

  //   const input = getInputProps();
  //   const checkbox = getCheckboxProps();

  //   return (
  //     <Radio {...checkbox}>
  //       <input {...input} />
  //       <span
  //         style={{
  //           display: "inline-block",
  //           width: "20px",
  //           height: "20px",
  //           borderRadius: "50%",
  //           backgroundColor: props.isDisabled ? "red" : "#CBD5E0", // Custom disabled color
  //         }}
  //       />
  //       {props.children}
  //     </Radio>
  //   );
  // };

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
            borderColor={"red"}
            // background={"linear-gradient(45deg, #dcdcdc, #f6f6f6)"}
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
                  <Radio
                    colorScheme="green"
                    value="true"
                    borderColor={"gray.400"}
                  >
                    Enable
                  </Radio>
                  <Radio
                    colorScheme="red"
                    value="false"
                    borderColor={"gray.400"}
                  >
                    Disable
                  </Radio>
                </Stack>
                {/* <Stack direction="row">
                  <CustomRadio colorScheme="green" value="true">
                    Enable
                  </CustomRadio>
                  <CustomRadio colorScheme="red" value="false">
                    Disable
                  </CustomRadio>
                </Stack> */}
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
                        <Radio
                          colorScheme="green"
                          value="true"
                          borderColor={"gray.400"}
                        >
                          Enable
                        </Radio>
                        <Radio
                          colorScheme="red"
                          value="false"
                          borderColor={"gray.400"}
                        >
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

export default memo(PermissionsList);
