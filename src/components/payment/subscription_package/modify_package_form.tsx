import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import type { FC } from "react";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";

import { Core } from "@/components";
import { HandleLogout } from "@/components/auth";
import { LoadingComponent } from "@/components/core";
import PermissionsList from "@/components/core/permissions_list/permissions_list";
import { EIndicator } from "@/graphql/generated/graphql";
import { FindAllPackages } from "@/services/api";

enum DiscountType {
  FIXED = "FIXED",
  PERCENTAGE = "PERCENTAGE",
}

enum ESubscriptionStatus {
  SUBSCRIBED = "SUBSCRIBED",
  UPGRADE = "UPGRADE",
  DOWNGRADE = "DOWNGRADE",
}

interface IAddSubscriptionPackageFormProps {}

const SubscriptionPackageForm: FC<IAddSubscriptionPackageFormProps> = () => {
  const { push } = useRouter();
  const [modificationStatus, setModificationStatus] = useState("UPGRADE");
  const [fail, setFail] = useState<IAlertSuccessData>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDisableBtn, setIsDisableBtn] = useState<boolean>(true);
  const [packagesList, setPackagesList] = useState<IPackage[]>([]);
  const [selectedPackage, setSelectedPackage] = useState<IPackage>();
  const user: IUser = useSelector((state: any) => state.user.user);
  const [modulesForActions, setModulesForActions] = useState<{
    modules: Array<IFeatureType>;
  }>();

  const moduleViewPermissions: ModuleViewPermissions[] = [
    {
      name: "email-&-notifications",
      views: [
        "email-&-notifications",
        "email-&-notifications.view",
        "email-&-notifications.add",
        "email-&-notifications.edit",
      ],
    },
    {
      name: "tools",
      views: [
        "pool-calculator",
        //  "gallery",
        "documents",
      ],
    },
    {
      name: "report-templates",
      views: [
        "report-templates",
        "report-templates.add",
        "report-templates.edit",
        "report-templates.view",
        "incident-reports",
        "vat-reports",
        "inventory-management",
      ],
    },
    {
      name: "tasks",
      views: [
        "tasks",
        "tasks.add",
        "tasks.edit",
        "tasks.track",
        "tasks.details",
      ],
    },
    {
      name: "trainings",
      views: [
        "trainings",
        "trainings.add",
        "trainings.edit",
        "trainings.assign",
        "trainings.external",
        "trainings.in-service",
      ],
    },
  ];

  const [modulePermissions, setModulePermissions] = useState<
    {
      name: { key: string; active: boolean };
      views: { key: string; active: boolean }[];
    }[]
  >([]);

  useEffect(() => {
    const tempModulePermissions: {
      name: {
        key: string;
        active: boolean;
      };
      views: {
        key: string;
        active: boolean;
      }[];
      price?: number;
    }[] = [];

    moduleViewPermissions.forEach((userModuleObj: any) => {
      if (userModuleObj.name) {
        const views = userModuleObj.views
          .filter((view: any) =>
            moduleViewPermissions.some((module) => module.views.includes(view))
          )
          .map((view: any) => ({ key: view, active: false }));
        tempModulePermissions.push({
          name: { key: String(userModuleObj.name), active: false },
          views,
        });
      }
    });

    if (modulesForActions?.modules) {
      modulesForActions.modules.forEach((aModule) => {
        tempModulePermissions.forEach((f) => {
          if (f.name.key === aModule.name) {
            f.name.active = true;
            f.views.forEach((v) => {
              if (aModule.views.includes(v.key)) v.active = true;
            });
          }
        });
      });
    }
    setModulePermissions(tempModulePermissions);
  }, [modulesForActions]);

  useQuery("findAllSubPackages", () => FindAllPackages(), {
    onSuccess(data) {
      setIsLoading(false);
      if (data?.findAllPackages) {
        // @ts-ignore
        const packages = (data.findAllPackages || [])
          .map((p) => {
            if (p.cost) {
              return {
                _id: p._id,
                title: p.title,
                active: p.active,
                cost: p.cost,
                sizeInGB: p.sizeInGB,
                discount: p.discount,
                discount_type: p.discount_type,
                modules: p.modules,
                number_of_users: p.number_of_users,
                description: p.description,
                duration: p.duration,
              };
            }
            return null;
          })
          .filter((pack) => pack !== null) as IPackage[];

        packages.unshift({
          _id: "",
          title: "Select a package",
          active: false,
          cost: 0,
          annual: false,
          sizeInGB: 0,
          discount: 0,
          discount_type: DiscountType.FIXED,
          modules: [
            {
              name: "",
              views: [""],
              available: 0,
              indicator: EIndicator.Limitless as any,
            },
          ],
          number_of_users: 0,
          description: "",
          duration: 0,
          ref: "",
          packageRef: "",
          paid: false,
          status: ESubscriptionStatus.DOWNGRADE,
        });
        setPackagesList(packages);
        setSelectedPackage({
          _id: user.package?._id || "",
          title: user.package?.title || "",
          active: user.package?.active || false,
          cost: user.package?.cost || 0,
          sizeInGB: user.package?.sizeInGB || 0,
          discount: user.package?.discount || 0,
          discount_type: user.package?.discount_type || "FIXED",
          modules: user.package?.modules || [],
          number_of_users: user.package?.number_of_users || 0,
          description: user.package?.description || "",
          duration: user.package?.duration || 0,
        } as IPackage);
        if (packages[0]?.modules) {
          setModulesForActions({ modules: packages[0].modules });
        } else
          console.log(
            "setModulesForActions is empty in page 'modify_packages_form.tsx'"
          );
      }
    },
    onError(_: any) {
      if (
        _?.response?.errors?.length &&
        _?.response?.errors[0]?.message === "Not Authorised!"
      )
        HandleLogout();
      setIsLoading(false);
    },
    refetchOnMount: true,
  });

  const changeHandler = (e: any) => {
    setIsDisableBtn(false);
    const selected = packagesList.filter(
      (pl) => String(pl._id) === String(e.target.value)
    )[0];

    if (
      selected &&
      selected._id &&
      selected?.modules &&
      user?.package &&
      user.package.cost >= 0
    ) {
      if (user?.package?.cost > selected.cost)
        setModificationStatus("DOWNGRADE");
      else if (user?.package?.cost <= selected.cost)
        setModificationStatus("UPGRADE");
      setModulesForActions({ modules: selected.modules });
      setSelectedPackage(selected);
    }
  };

  const handleSubmit = () => {
    setIsLoading(false);

    if (!modulePermissions.some((_) => _.name.active)) {
      setFail({
        status: true,
        title: "Failed",
        description: "Please select at least a Module or an Operation",
      });
      setIsLoading(false);
      return;
    }

    if (selectedPackage?._id && user._id) {
      if (selectedPackage._id !== user.package?._id) {
        push({
          pathname: "/payment/subscription",
          query: {
            amount: selectedPackage.cost,
            id: selectedPackage._id,
            status: modificationStatus,
          },
        });
        setIsLoading(true);
      } else {
        setFail({
          status: true,
          title: "Failed to update package",
          description: "You need to select a package to request modification",
        });
        setIsLoading(true);
      }
    }
  };
  // function convertDaysToYearsAndMonths(days: number) {
  //   if (days <= 0) {
  //     return "0 days";
  //   }

  //   const years = Math.floor(days / 365);
  //   const remainingDaysAfterYears = days % 365;
  //   const months = Math.floor(remainingDaysAfterYears / 30);
  //   const remainingDays = remainingDaysAfterYears % 30;

  //   const yearText = years > 0 ? `${years} year${years > 1 ? "s" : ""}` : "";
  //   const monthText =
  //     months > 0 ? `${months} month${months > 1 ? "s" : ""}` : "";
  //   const dayText =
  //     remainingDays > 0
  //       ? `${remainingDays} day${remainingDays > 1 ? "s" : ""}`
  //       : "";

  //   const space =
  //     (yearText && monthText) || (yearText && dayText) || (monthText && dayText)
  //       ? " "
  //       : "";
  //   const and =
  //     (yearText && monthText) || (yearText && dayText) || (monthText && dayText)
  //       ? " and "
  //       : "";

  //   return `${yearText}${space}${monthText}${and}${dayText}`;
  // }

  function convertDaysToYearsAndMonths(days: number) {
    if (days <= 0) {
      return "0 days";
    }

    const years = Math.floor(days / 365);
    const months = Math.floor((days % 365) / 30);
    const yearText = years > 0 ? `${years} year${years > 1 ? "s" : ""}` : "";
    const monthText =
      months > 0 ? `${months} month${months > 1 ? "s" : ""}` : "";
    const space = yearText && monthText ? " " : "";
    return `${yearText}${space}${monthText}`;
  }

  // const sortedPackages = [...packagesList].sort((a, b) => a.cost - b.cost);

  return (
    <Box>
      <Core.Alert show={fail} theme="error" />
      {isLoading ? (
        <LoadingComponent minH={"70vh"} />
      ) : (
        <>
          {!selectedPackage?.duration ? (
            <Flex
              width={"100%"}
              height={"70vh"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Core.BtnSpinner size="md" />
            </Flex>
          ) : (
            <Box minHeight={"75vh"}>
              <Flex
                justifyContent={"start"}
                columnGap={"20px"}
                rowGap={"40px"}
                flexWrap={"wrap"}
                pt="10px"
                pb="20px"
              >
                <Box>
                  <FormControl minWidth={"300px"}>
                    <FormLabel>Package Name</FormLabel>
                    <Core.Select
                      name="title"
                      width={"100%"}
                      // sortedPackages?.flatMap
                      list={packagesList?.flatMap((p) => ({
                        name: p.title,
                        value: p._id || "",
                      }))}
                      value={selectedPackage?._id}
                      onChange={changeHandler}
                      textTransform="capitalize"
                      errorBorderColor="red.300"
                      isDisabled={false}
                    />
                  </FormControl>
                </Box>
                <Box px="2%">
                  <Heading as="h6" size="xs" mb="3px">
                    Storage:
                  </Heading>
                  <Text
                    fontSize="md"
                    color={"#8f8f8f"}
                    fontWeight={"bold"}
                    display={"flex"}
                    alignItems={"center"}
                  >
                    {selectedPackage?.sizeInGB} GB
                  </Text>
                </Box>
                <Box px="2%">
                  <Heading as="h6" size="xs" mb="3px">
                    Time Period:
                  </Heading>
                  <Text
                    fontSize="md"
                    color={"#8f8f8f"}
                    fontWeight={"bold"}
                    display={"flex"}
                    alignItems={"center"}
                  >
                    {/* {selectedPackage?.duration} Days */}
                    {convertDaysToYearsAndMonths(selectedPackage?.duration)}
                  </Text>
                </Box>
                <Box px="2%">
                  <Heading as="h6" size="xs" mb="3px">
                    Price:
                  </Heading>
                  <Text
                    fontSize="md"
                    color={"#8f8f8f"}
                    fontWeight={"bold"}
                    display={"flex"}
                    alignItems={"center"}
                  >
                    $ {selectedPackage?.cost}
                  </Text>
                </Box>
                <Box px="2%">
                  <Heading as="h6" size="xs" mb="3px">
                    Number of app & web users:
                  </Heading>
                  <Text
                    fontSize="md"
                    color={"#8f8f8f"}
                    fontWeight={"bold"}
                    display={"flex"}
                    alignItems={"center"}
                  >
                    {selectedPackage?.number_of_users}
                  </Text>
                </Box>
              </Flex>
              {/* <Flex columnGap={"20px"} pb="20px" alignItems={"center"}> */}
              {/* <Box width="32%">
                  <FormControl>
                    <FormLabel>Package Name</FormLabel>
                    <Core.Select
                      name="title"
                      list={packagesList?.flatMap((p) => ({
                        name: p.title,
                        value: p._id || "",
                      }))}
                      value={selectedPackage?._id}
                      onChange={changeHandler}
                      textTransform="capitalize"
                      errorBorderColor="red.300"
                      isDisabled={false}
                    />
                  </FormControl>
                </Box> */}
              {/* <Box width="32%">
                  <Heading as="h6" size="xs" mb="3px">
                    Modification:
                  </Heading>
                  <Text
                    fontSize="md"
                    fontWeight={"bold"}
                    display={"flex"}
                    alignItems={"center"}
                  >
                    <Core.ModificationStatus>
                      {modificationStatus}
                    </Core.ModificationStatus>
                  </Text>
                </Box> */}
              {/* </Flex> */}
              <Box>
                <Core.FormHeading3
                  color="textColor"
                  title="Module Permissions"
                  // searchBox
                />
                <PermissionsList
                  permissions={modulePermissions}
                  setPermissions={setModulePermissions}
                  isDisabled={true}
                  disableViews={true}
                />
              </Box>
              <Flex columnGap={"10px"} justifyContent="end">
                <Core.Button
                  btnOrangeMd
                  type="submit"
                  onClick={handleSubmit}
                  isLoading={isLoading}
                  isDisabled={isDisableBtn}
                >
                  Proceed to payment
                </Core.Button>
              </Flex>
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default SubscriptionPackageForm;
