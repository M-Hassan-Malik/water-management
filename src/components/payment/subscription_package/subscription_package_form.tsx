import { Box, Flex, FormControl, FormLabel } from "@chakra-ui/react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import type { FC } from "react";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useSelector } from "react-redux";

import { Core } from "@/components";
import { HandleLogout } from "@/components/auth";
import { LoadingComponent } from "@/components/core";
import SubscriptionPermissionsList from "@/components/core/permissions_list/subscription_permissions_list";
import type {
  FindPackageByIdQuery,
  Package,
} from "@/graphql/generated/graphql";
import { DiscountType, EIndicator } from "@/graphql/generated/graphql";
import { AddPackage, FindPackageById, UpdatePackage } from "@/services/api";

import {
  addValidationSchema,
  updateValidationSchema,
} from "./package.validator";

interface IAddSubscriptionPackageFormProps {
  pageType: PageType;
}

const SubscriptionPackageForm: FC<IAddSubscriptionPackageFormProps> = ({
  pageType,
}) => {
  const { push, query } = useRouter();
  const queryClient = useQueryClient();
  const [success, setSuccess] = useState<IAlertSuccessData>();
  const [queryRun, setQueryRun] = useState<boolean>(false);
  const [error, setError] = useState<IAlertSuccessData>();
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
        // "gallery",
        "documents",
      ],
    },
    {
      name: "report-templates",
      views: [
        "report-templates",
        "report-templates.add",
        "report-templates.view",
        "report-templates.edit",
        "report-templates.assign",
        "report-templates.track",
        "report-templates.submission",
        "incident-reports",
        "vat-reports",
        "inventory-management",
      ],
    },
    {
      name: "trainings",
      views: [
        "trainings",
        "trainings.add",
        "trainings.edit",
        "trainings.assign",
        "trainings.track",
        "trainings.external",
        "trainings.in-service",
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
  ];

  const [modulePermissions, setModulePermissions] = useState<
    {
      name: { key: string; active: boolean };
      views: { key: string; active: boolean }[];
      usage: number;
      indicator: EIndicator;
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
      usage: number;
      indicator: EIndicator;
      price?: number;
    }[] = [];

    if (user?.admin) {
      moduleViewPermissions.forEach((obj) => {
        tempModulePermissions.push({
          name: {
            key: String(obj.name),
            active: false,
          },
          views: obj.views.map((v) => ({ key: v, active: false })),
          usage: 0,
          indicator: EIndicator.Limitless,
        });
      });
    }
    // Client Admin's User (Employee Type == SUB ADMIN)
    else if (!user?.company?._id) {
      moduleViewPermissions.forEach((obj) => {
        tempModulePermissions.push({
          name: {
            key: String(obj.name),
            active: false,
          },
          views: obj.views.map((v) => ({ key: v, active: false })),
          usage: 0,
          indicator: EIndicator.Limitless,
        });
      });
    } else {
      moduleViewPermissions.forEach(() => {
        user?.modules?.forEach((userModuleObj: any) => {
          if (userModuleObj.name) {
            const views = userModuleObj.views.filter((view: any) => {
              if (
                moduleViewPermissions.some((module) =>
                  module.views.includes(view.key)
                )
              )
                return false;
              return false;
            });
            tempModulePermissions.push({
              name: {
                key: String(userModuleObj.name),
                active: false,
              },
              views,
              usage: 0,
              indicator: EIndicator.Limitless,
            });
          }
        });
      });
    }

    if (modulesForActions?.modules) {
      modulesForActions.modules.forEach((moduleForAction) => {
        tempModulePermissions.forEach((tempModulePermission) => {
          if (tempModulePermission.name.key === moduleForAction.name) {
            tempModulePermission.name.active = true;
            tempModulePermission.views.forEach((v) => {
              if (moduleForAction.views.includes(v.key)) v.active = true;
            });
          }
        });
      });
    }
    setModulePermissions(tempModulePermissions);
  }, [modulesForActions]);

  const timePeriod = [
    {
      name: "--",
      value: "",
    },
    {
      name: "1 month",
      value: "30",
    },
    {
      name: "2 months",
      value: "60",
    },
    {
      name: "3 months",
      value: "90",
    },
    {
      name: "4 months",
      value: "120",
    },
    {
      name: "5 months",
      value: "150",
    },
    {
      name: "6 months",
      value: "180",
    },
    {
      name: "7 months",
      value: "210",
    },
    {
      name: "8 months",
      value: "240",
    },
    {
      name: "9 months",
      value: "270",
    },
    {
      name: "10 months",
      value: "300",
    },
    {
      name: "11 months",
      value: "330",
    },
    {
      name: "12 months",
      value: "360",
    },
    {
      name: "13 months",
      value: "390",
    },
    {
      name: "14 months",
      value: "420",
    },
    {
      name: "15 months",
      value: "450",
    },
    {
      name: "16 months",
      value: "480",
    },
    {
      name: "17 months",
      value: "510",
    },
    {
      name: "18 months",
      value: "540",
    },
    {
      name: "19 months",
      value: "570",
    },
    {
      name: "20 months",
      value: "600",
    },
    {
      name: "21 months",
      value: "630",
    },
    {
      name: "22 months",
      value: "660",
    },
    {
      name: "23 months",
      value: "690",
    },
    {
      name: "24 months",
      value: "720",
    },
    {
      name: "25 months",
      value: "750",
    },
    {
      name: "26 months",
      value: "780",
    },
    {
      name: "27 months",
      value: "810",
    },
    {
      name: "28 months",
      value: "840",
    },
    {
      name: "29 months",
      value: "870",
    },
    {
      name: "30 months",
      value: "900",
    },
    {
      name: "31 months",
      value: "930",
    },
    {
      name: "32 months",
      value: "960",
    },
    {
      name: "33 months",
      value: "990",
    },
    {
      name: "34 months",
      value: "1020",
    },
    {
      name: "35 months",
      value: "1050",
    },
    {
      name: "36 months",
      value: "1080",
    },
    {
      name: "37 months",
      value: "1110",
    },
    {
      name: "38 months",
      value: "1140",
    },
    {
      name: "39 months",
      value: "1170",
    },
    {
      name: "40 months",
      value: "1200",
    },
    {
      name: "41 months",
      value: "1230",
    },
    {
      name: "42 months",
      value: "1260",
    },
    {
      name: "43 months",
      value: "1290",
    },
    {
      name: "44 months",
      value: "1320",
    },
    {
      name: "45 months",
      value: "1350",
    },
    {
      name: "46 months",
      value: "1380",
    },
    {
      name: "47 months",
      value: "1410",
    },
    {
      name: "48 months",
      value: "1440",
    },
    {
      name: "49 months",
      value: "1470",
    },
    {
      name: "50 months",
      value: "1500",
    },
    {
      name: "51 months",
      value: "1530",
    },
    {
      name: "52 months",
      value: "1560",
    },
    {
      name: "53 months",
      value: "1590",
    },
    {
      name: "54 months",
      value: "1620",
    },
    {
      name: "55 months",
      value: "1650",
    },
    {
      name: "56 months",
      value: "1680",
    },
    {
      name: "57 months",
      value: "1710",
    },
    {
      name: "58 months",
      value: "1740",
    },
    {
      name: "59 months",
      value: "1770",
    },
    {
      name: "60 months",
      value: "1800",
    },
  ];

  const createPackageMutation = useMutation(AddPackage, {
    onSuccess: () => {
      setSuccess({
        status: true,
        title: "Added",
        description: "Package added successfully.",
      });
      setTimeout(() => {
        push("/subscriptions");
      }, 1000);
    },

    onError: (_: any) => {
      const errorMsg =
        _?.response?.errors[0]?.message || "Unable to add package.";
      setError({
        status: true,
        title: "Failed",
        description: errorMsg,
      });
    },
  });

  const updatePackageMutation = useMutation(UpdatePackage, {
    onSuccess: () => {
      setSuccess({
        status: true,
        title: "Updated",
        description: "Package has been updated successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["FindPackageById"] });
      setTimeout(() => {
        push("/subscriptions");
      }, 1000);
    },
    onError: (_: any) => {
      const errorMsg =
        _?.response?.errors[0]?.message || "Unable to update package.";
      setError({
        status: true,
        title: "Failed",
        description: errorMsg,
      });
    },
  });

  const [prevData, setPrevData] = useState<
    FindPackageByIdQuery["findPackageById"]
  >({
    active: true,
    cost: 0,
    sizeInGB: 1,
    annual: false,
    discount: 0,
    discount_type: DiscountType.Fixed,
    modules: [],
    title: "",
    description: "",
    duration: Number(timePeriod[0]?.value),
    number_of_users: 0,
  });

  const { isFetched } = useQuery(
    "FindPackageById",
    () => FindPackageById({ packageId: String(query.id) }),
    {
      onSuccess(data: any) {
        setPrevData(data.findPackageById);
        const features: {
          modules: Array<IFeatureType>;
        } = {
          modules: data?.findPackageById?.modules || [],
        };
        // to check if operations and modules are not empty
        if (features.modules.length) {
          setModulesForActions(features);
          setQueryRun(true);
        }
      },
      onError(_: any) {
        if (
          _?.response?.errors?.length &&
          _?.response?.errors[0]?.message === "Not Authorised!"
        )
          HandleLogout();
        const errorMsg =
          _?.response?.errors[0]?.message || "Failed to fetch data.";
        setError({
          status: true,
          title: "Something went wrong",
          description: errorMsg,
        });
      },
      enabled:
        Boolean(query.id) && (pageType === "edit" || pageType === "view"),
      refetchOnMount: true,
    }
  );

  const {
    handleSubmit,
    handleChange,
    values,
    errors,
    touched,

    setFieldValue,
  } = useFormik<Package>({
    initialValues: {
      _id: prevData._id ? prevData._id : "",
      active: prevData.active ? prevData.active : true,
      annual: prevData.annual ? prevData.annual : false,
      cost: prevData.cost ? prevData.cost : 0,
      sizeInGB: prevData.sizeInGB ? prevData.sizeInGB : 1,
      discount: prevData.discount ? prevData.discount : 0,
      discount_type: prevData.discount_type
        ? prevData.discount_type
        : DiscountType.Fixed,
      modules: prevData.modules ? prevData.modules : [{ name: "", views: [] }],
      title: prevData.title ? prevData.title : "",
      description: prevData.description ? prevData.description : "",
      duration: prevData.duration
        ? prevData.duration
        : Number(timePeriod[0]?.value),
      number_of_users: prevData.number_of_users ? prevData.number_of_users : 0,
    },
    enableReinitialize: true,
    onSubmit: (inputValues) => {
      const subscriptionModules: ModuleViewPermissions[] = [];
      modulePermissions?.forEach((module) => {
        if (module.name.active) {
          const views: EModuleViews[] = [];
          module.views.forEach(
            (view: any) => view.active && views.push(view.key)
          );
          subscriptionModules.push({
            name: module.name.key as EModules,
            views: views as EModuleViews[],
            available: module.usage,
            indicator: module.indicator as any,
          });
        }
      });

      if (pageType === "create") {
        createPackageMutation.mutate({
          packageInput: {
            active: inputValues.active,
            annual: inputValues.annual,
            modules: subscriptionModules as any,
            duration: Number(inputValues.duration),
            cost: inputValues.cost,
            sizeInGB: inputValues.sizeInGB,
            description: inputValues.description,
            discount: inputValues.discount,
            discount_type: inputValues.discount_type,
            number_of_users: inputValues.number_of_users,
            title: inputValues.title,
          },
        });
      } else if (pageType === "edit") {
        updatePackageMutation.mutate({
          updatePackageInput: {
            _id: String(query.id),
            active: inputValues.active,
            modules: subscriptionModules as any,
            duration: Number(inputValues.duration),
            cost: inputValues.cost,
            sizeInGB: inputValues.sizeInGB,
            description: inputValues.description,
            discount: inputValues.discount,
            discount_type: inputValues.discount_type,
            number_of_users: inputValues.number_of_users,
            title: inputValues.title,
          },
        });
      }
    },
    validationSchema:
      pageType === "edit" ? updateValidationSchema : addValidationSchema,
  });

  useEffect(() => {
    let totalPrice = 0;
    const modulePricing = [
      {
        name: "email-&-notifications",
        price: 60,
      },
      {
        name: "report-templates",
        price: 100,
      },
      {
        name: "tasks",
        price: 5,
      },
      {
        name: "trainings",
        price: 120,
      },
      {
        name: "website-contact-form",
        price: 10,
      },
      {
        name: "tools",
        price: 75,
      },
    ];
    if (!queryRun) {
      modulePermissions.forEach((m) => {
        if (m.name.active) {
          const modulePrice = modulePricing.filter(
            (mp) => mp.name === m.name.key
          )[0];
          totalPrice += modulePrice?.price ?? 0;
        }
      });
      setFieldValue("cost", totalPrice);
    }

    setQueryRun(false);
  }, [modulePermissions]);

  return (
    <Box>
      <Core.Alert show={success} theme="success" />
      <Core.Alert show={error} theme="error" />
      {/* <Core.FormHeading3
        title={`${
          pageType
            ? pageType.charAt(0).toUpperCase() + pageType.slice(1)
            : "Add"
        } Package`}
      /> */}
      {(pageType === "edit" || pageType === "view") && !isFetched ? (
        <LoadingComponent minH={"70vh"} />
      ) : (
        <Box>
          <Flex columnGap={"10px"} pb="20px">
            <FormControl isRequired isInvalid={!!errors.title && touched.title}>
              <FormLabel>Package Name</FormLabel>
              <Core.Input
                name="title"
                placeholder="Package Name"
                type="text"
                onChange={handleChange}
                value={values.title}
                errorBorderColor="red.300"
                error={errors.title}
                touched={touched.title}
                isDisabled={pageType === "view"}
              />
            </FormControl>

            <FormControl
              isRequired
              isInvalid={!!errors.duration && touched.duration}
            >
              <FormLabel>Time Period</FormLabel>
              <Core.Select
                name="duration"
                textTransform="capitalize"
                onChange={handleChange}
                value={values.duration}
                list={timePeriod}
                errorBorderColor="red.300"
                error={errors.duration}
                touched={touched.duration}
                isDisabled={pageType === "view"}
              />
            </FormControl>
          </Flex>
          <Flex columnGap={"10px"} pb="20px">
            <FormControl
              isRequired
              isInvalid={!!errors.number_of_users && touched.number_of_users}
            >
              <FormLabel>Number of app & web users</FormLabel>
              <Core.Input
                name="number_of_users"
                placeholder="Enter Number of app & web users"
                type="number"
                min="0"
                max="100000"
                step="5"
                onChange={handleChange}
                value={values.number_of_users}
                error={errors.number_of_users}
                touched={touched.number_of_users}
                isDisabled={pageType === "view"}
              />
            </FormControl>
            <FormControl isRequired isInvalid={!!errors.cost && touched.cost}>
              <FormLabel>Price</FormLabel>
              <Core.Input
                name="cost"
                placeholder="Enter Price"
                type="number"
                min="1"
                max="100000"
                step="500"
                onChange={(_) => {
                  setFieldValue("cost", _.target.value);
                  handleChange(_);
                }}
                value={values.cost}
                error={errors.cost}
                touched={touched.cost}
                isDisabled={pageType === "view"}
              />
            </FormControl>
            <FormControl
              isRequired
              isInvalid={!!errors.sizeInGB && touched.sizeInGB}
            >
              <FormLabel>Size in GB</FormLabel>
              <Core.Input
                name="sizeInGB"
                placeholder="Enter Size In GB"
                type="number"
                min="1"
                max="100000"
                step="500"
                value={values.sizeInGB}
                error={errors.sizeInGB}
                touched={touched.sizeInGB}
                isDisabled={pageType === "view"}
                onChange={(_) => {
                  setFieldValue("sizeInGB", _.target.value);
                  handleChange(_);
                }}
              />
            </FormControl>
          </Flex>
          <Flex columnGap={"10px"} pb="20px">
            <FormControl
              isRequired
              isInvalid={!!errors.description && touched.description}
            >
              <FormLabel>Description</FormLabel>
              <Core.Textarea
                name="description"
                placeholder="Type package description."
                rows={4}
                onChange={handleChange}
                value={values.description}
                errorBorderColor="red.300"
                error={errors.description}
                touched={touched.description}
                isDisabled={pageType === "view"}
              />
            </FormControl>
          </Flex>
          <Box>
            <Core.FormHeading3
              color="textColor"
              title="Module Permissions"
              // searchBox
            />
            <SubscriptionPermissionsList
              permissions={modulePermissions}
              setPermissions={setModulePermissions}
              isDisabled={pageType === "view"}
              disableViews={false}
            />
          </Box>
          {pageType !== "view" ? (
            <Flex columnGap={"10px"} justifyContent="end">
              <Core.Button
                btnOrangeMd
                type="submit"
                onClick={handleSubmit}
                isLoading={
                  createPackageMutation.isLoading ||
                  updatePackageMutation.isLoading
                }
                isDisabled={
                  createPackageMutation.isLoading ||
                  updatePackageMutation.isLoading
                }
              >
                {pageType === "edit" ? "Update Package" : "Add Package"}
              </Core.Button>
            </Flex>
          ) : null}
        </Box>
      )}
    </Box>
  );
};

export default SubscriptionPackageForm;
