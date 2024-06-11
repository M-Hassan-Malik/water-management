/* eslint-disable no-param-reassign */
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  HStack,
  Icon,
  // Link,
} from "@chakra-ui/react";
import Link from "next/link";
import React, { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { useAuth } from "@/hooks/useAuth";

import { Core } from "..";
import { Icons } from "../icons";
import type {
  LinkItemProps,
  NavItemProps,
  SidebarNavGroupProps,
} from "./drawer.types";

const NavItem = ({
  icon,
  //  active,
  path,
  children,
  ...rest
}: NavItemProps) => {
  const user: IUser = useSelector((state: any) => state.user.user);
  return (
    <Link
      href={path as any}
      style={{ textDecoration: "none" }}
      // _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        color={user?.themeId === "theme3" ? "white" : ""}
        _hover={{
          backgroundColor: "blue.500",
          // color: "blue.400",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr={2}
            // color={active ? "white" : "gray.300"}
            // color={
            //   user?.themeId === "theme3" ? "#000" : active ? "white" : "white"
            // }
            color={"white"}
            fontSize="18px"
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

const SidebarNavGroup = (props: SidebarNavGroupProps & any) => {
  const { children, title, icon } = props;
  // const user: IUser = useSelector((state: any) => state.user.user);
  return (
    <AccordionItem>
      <AccordionButton
        _expanded={{ bg: "orange.900" }}
        fontSize="14px"
        // color="#fff"
        mt="-5px"
        _hover={{
          bg: "orange.600",
          color: "blue.400",
        }}
        borderRadius="10px 10px 0 0"
        padding={"13px 16px 10px 16px"}
      >
        <HStack width={"100%"}>
          {icon && (
            <Icon
              fontSize="18px"
              // color="gray.300"
              // color={user?.themeId === "theme3" ? "#000" : "white"}
              color={"white"}
              as={icon}
            />
          )}
          <Box
            //  color={"gray.300"}
            // color={user?.themeId === "theme3" ? "#000" : "white"}
            color={"white"}
            as="span"
            flex="1"
            textAlign="left"
          >
            {title}
          </Box>
        </HStack>
        <AccordionIcon
          // color={user?.themeId === "theme3" ? "#000" : "gray.300"}
          color={"white"}
        />
      </AccordionButton>
      <AccordionPanel
        px="15px"
        pt="5px"
        pb="13px"
        // backgroundColor={user.admin ? "blue.700" : "blue.400"}
        backgroundColor={"blue.1000"}
        borderRadius="0 0 10px 10px"
      >
        <ul className="nav-group-items list-unstyled">{children}</ul>
      </AccordionPanel>
    </AccordionItem>
  );
};
const DrawerNavigation = () => {
  const hideFeaturesFromAdmin = [
    "tasks",
    "employees",
    "activity-logs",
    "trainings",
    "report-templates",
    "tools",
  ];
  const hideViewsFromAdmin = [
    "payment-logs",
    "subscription.my-subscription",
    "subscription.modification",
    "geo-locations.add",
    "geo-locations.edit",
    "geo-locations.user-locations-listing",
  ];
  const hideFeaturesFromEmployee: string[] = [];
  const hideViewsFromEmployee: string[] = [];

  const [isLoading] = useAuth();

  const [loading, setLoading] = useState(true);

  const user: IUser = useSelector((state: any) => state.user.user);
  const [linkItems, setLinkItems] = useState<LinkItemProps[]>([
    {
      id: "dashboard",
      name: "Dashboard",
      icon: Icons.RiDashboard2Line,
      type: "single",
      path: "/dashboard",
      active: false,
      links: [
        {
          id: "dashboard",
          name: "Dashboard",
          icon: Icons.FaUsers,
          type: "single",
          path: "/dashboard",
          active: false,
        },
      ],
    },
    {
      id: "manage-admin",
      name: "Users",
      icon: Icons.FaUsers,
      type: "group",
      active: false,
      links: [
        {
          id: "admin-manage-users",
          name: "Users",
          icon: Icons.FaUsers,
          type: "single",
          path: "/admin-manage-users",
          active: false,
        },
        {
          id: "manage-users.add",
          name: "Add User",
          icon: Icons.BsPersonFillAdd,
          type: "single",
          path: "/manage-users/add",
          active: false,
        },
      ],
    },
    {
      id: "manage-roles",
      name: "Roles",
      icon: Icons.MdManageAccounts,
      type: "group",
      active: false,
      links: [
        {
          id: "manage-roles",
          name: "Roles List",
          icon: Icons.ImList2,
          type: "single",
          path: "/manage-roles",
          active: false,
        },
        {
          id: "manage-roles.add",
          name: "Add Role",
          icon: Icons.MdAddTask,
          type: "single",
          path: "/manage-roles/add",
          active: false,
        },
      ],
    },
    {
      id: "client-admins",
      name: "Client Admin",
      icon: Icons.MdManageAccounts,
      type: "group",
      active: false,
      links: [
        {
          id: "client-admins",
          name: "Client Admins",
          icon: Icons.MdAdminPanelSettings,
          type: "single",
          path: " /client-admins",
          active: false,
        },
        {
          id: "client-admins.add",
          name: "Add Client Admin",
          icon: Icons.MdPersonAddAlt,
          type: "single",
          path: "/client-admins/add",
          active: false,
        },
      ],
    },
    {
      id: "employees",
      name: "Users",
      icon: Icons.FaUsers,
      type: "group",
      active: false,
      links: [
        {
          id: "employees",
          name: "Users",
          icon: Icons.FaUsers,
          type: "single",
          path: "/employees",
          active: false,
        },
        {
          id: "employees.add",
          name: "Add User",
          icon: Icons.FaUserPlus,
          type: "single",
          path: "/employees/add",
          active: false,
        },
        {
          id: "departments",
          name: "Departments",
          icon: Icons.LuNetwork,
          type: "single",
          path: "/departments",
          active: false,
        },
        {
          id: "departments.add",
          name: "Add Department",
          icon: Icons.FiPlusCircle,
          type: "single",
          path: "/departments/add",
          active: false,
        },
      ],
    },
    {
      id: "activity-logs",
      name: "Activity Logs",
      icon: Icons.TbFilePencil,
      type: "group",
      active: false,
      links: [
        {
          id: "activity-logs",
          name: "View Logs",
          icon: Icons.TbFileSearch,
          type: "single",
          path: "/activity-logs",
          active: false,
        },
      ],
    },
    {
      id: "tasks",
      name: "Tasks",
      icon: Icons.VscTasklist,
      type: "group",
      active: false,
      links: [
        {
          id: "tasks",
          name: "Tasks",
          icon: Icons.VscTasklist,
          type: "single",
          path: "/tasks",
          active: false,
        },
        {
          id: "tasks.add",
          name: "Add Tasks",
          icon: Icons.MdAddTask,
          type: "single",
          path: "/tasks/add",
          active: false,
        },
        {
          id: "tasks.track",
          name: "Track Assigned Tasks",
          icon: Icons.MdOutlineManageSearch,
          type: "single",
          path: "/tasks/track",
          active: false,
        },
      ],
    },
    {
      id: "trainings",
      name: "Training",
      icon: Icons.GiTeacher,
      type: "group",
      active: false,
      links: [
        {
          id: "trainings",
          name: "Trainings",
          icon: Icons.GiTeacher,
          type: "single",
          path: "/trainings",
          active: false,
        },
        {
          id: "trainings.add",
          name: "Create Training",
          icon: Icons.MdAddTask,
          type: "single",
          path: "/trainings/add",
          active: false,
        },
        {
          id: "trainings.in-service",
          name: "In-Service Training",
          icon: Icons.GiTeacher,
          type: "single",
          path: "/trainings/in-service",
          active: false,
        },
        {
          id: "trainings.external",
          name: "External Rosters",
          icon: Icons.GiTeacher,
          type: "single",
          path: "/trainings/external",
          active: false,
        },
        {
          id: "trainings.track",
          name: "Track Training",
          icon: Icons.GiTeacher,
          type: "single",
          path: "/trainings/track",
          active: false,
        },
      ],
    },
    {
      id: "report-templates",
      name: "Reports",
      icon: Icons.TbReportAnalytics,
      type: "group",
      active: false,
      links: [
        {
          id: "report-templates.add",
          name: "Create Report Template",
          icon: Icons.TbFilePlus,
          type: "single",
          path: "/report-templates/add",
          active: false,
        },
        {
          id: "report-templates",
          name: "Standard Report Templates",
          icon: Icons.TbReportAnalytics,
          type: "single",
          path: "/report-templates",
          active: false,
        },
        {
          id: "incident-reports",
          name: "Incident Report Templates",
          icon: Icons.TbReportAnalytics,
          type: "single",
          path: "/incident-reports",
          active: false,
        },
        {
          id: "inventory-management",
          name: "Inventory Checklist Templates",
          icon: Icons.TbReportAnalytics,
          type: "single",
          path: "/inventory-management",
          active: false,
        },
        {
          id: "vat-reports",
          name: "VAT Report Templates",
          icon: Icons.TbReportAnalytics,
          type: "single",
          path: "/vat-reports",
          active: false,
        },
        {
          id: "report-templates.track",
          name: "Track Reports",
          icon: Icons.TbFileSearch,
          type: "single",
          path: "/report-templates/track",
          active: false,
        },
      ],
    },
    {
      id: "payment",
      name: "Payments/Accounts/Billing",
      icon: Icons.AiOutlineDollarCircle,
      type: "group",
      active: false,
      links: [
        {
          id: "payment-records.track",
          name: "Track Records",
          icon: Icons.FiFileText,
          type: "single",
          path: "/payment-records/track",
          active: false,
        },
        {
          id: "payment-logs",
          name: "Payment Logs",
          icon: Icons.FiFileText,
          type: "single",
          path: "/payment-logs",
          active: false,
        },
      ],
    },
    {
      id: "subscriptions",
      name: "Subscription Packages",
      icon: Icons.GoPackage,
      type: "group",
      active: false,
      links: [
        {
          id: "subscriptions",
          name: "Subscription Package List",
          icon: Icons.GoPackage,
          type: "single",
          path: "/subscriptions",
          active: false,
        },
        {
          id: "subscription.add",
          name: "Add Subscription Packages",
          icon: Icons.GoPackage,
          type: "single",
          path: "/subscription/add",
          active: false,
        },
        {
          id: "subscription.my-subscription",
          name: "My Subscription",
          icon: Icons.GoPackage,
          type: "single",
          path: "/subscription/my-subscription",
          active: false,
        },
        {
          id: "subscription.modification",
          name: "Modify Subscription",
          icon: Icons.GoPackage,
          type: "single",
          path: "/subscription/modification",
          active: false,
        },
      ],
    },
    {
      id: "email-&-notifications",
      name: "Email & Notifications",
      icon: Icons.IoMdNotificationsOutline,
      type: "group",
      active: false,
      links: [
        {
          id: "email-&-notifications",
          name: "Email & Notifications",
          icon: Icons.IoMdNotificationsOutline,
          type: "single",
          path: "/email-&-notifications",
          active: false,
        },
        {
          id: "email-&-notifications.add",
          name: "Add New",
          icon: Icons.BiCommentAdd,
          type: "single",
          path: "/email-&-notifications/add",
          active: false,
        },
      ],
    },
    // {
    //   id: "edit-content",
    //   name: "Edit Content",
    //   icon: Icons.FiEdit,
    //   type: "group",
    //   active: false,
    //   links: [
    //     {
    //       id: "privacy-policy.edit",
    //       name: "Privacy Policy",
    //       icon: Icons.FiEdit2,
    //       type: "single",
    //       path: "/privacy-policy/edit",
    //       active: false,
    //     },
    //     {
    //       id: "eula.edit",
    //       name: "EULA",
    //       icon: Icons.FiEdit2,
    //       type: "single",
    //       path: "/eula/edit",
    //       active: false,
    //     },
    //     {
    //       id: "about-us",
    //       name: "About Us",
    //       icon: Icons.FiEdit2,
    //       type: "single",
    //       path: "/about-us/edit",
    //       active: false,
    //     },
    //     {
    //       id: "faq.edit",
    //       name: "FAQ's",
    //       icon: Icons.FiEdit2,
    //       type: "single",
    //       path: "/faq/edit",
    //       active: false,
    //     },
    //   ],
    // },
    // {
    //   id: "website-contact-form",
    //   name: "Website Contact Form",
    //   icon: Icons.FiEdit,
    //   type: "single",
    //   path: "/website-contact-form",
    //   active: false,
    //   links: [
    //     {
    //       id: "website-contact-form",
    //       name: "Website Contact Form",
    //       icon: Icons.FiEdit,
    //       type: "single",
    //       path: "/website-contact-form",
    //       active: false,
    //     },
    //     {
    //       id: "website-contact-form.details",
    //       name: "Website Contact Form Details",
    //       icon: Icons.GiTeacher,
    //       type: "single",
    //       path: "/website-contact-form.details",
    //       active: false,
    //     },
    //   ],
    // },
    {
      id: "geo-locations",
      name: "Facilities & Geo Locations",
      icon: Icons.MdLocationOn,
      type: "group",
      active: false,
      links: [
        {
          id: "geo-locations",
          name: "Parks",
          icon: Icons.MdLocationOn,
          type: "single",
          path: "/geo-locations",
          active: false,
        },
        {
          id: "geo-locations.add",
          name: "Request New Facility",
          icon: Icons.MdOutlineAddLocation,
          type: "single",
          path: "/geo-locations/add",
          active: false,
        },
        {
          id: "geo-locations.user-locations-listing",
          name: "My Facilities",
          icon: Icons.MdOutlineAddLocation,
          type: "single",
          path: `/geo-locations/user-locations-listing/?id=${String(
            user?._id
          )}`,
          active: false,
        },
        {
          id: "geo-locations.requests",
          name: "Pending Facility Requests",
          icon: Icons.MdOutlineAddLocation,
          type: "single",
          path: "/geo-locations/requests",
          active: false,
        },
        {
          id: "geo-locations.users-live-location",
          name: "Users Live Location",
          icon: Icons.RiUserLocationFill,
          type: "single",
          path: "/geo-locations/users-live-location",
          active: false,
        },
      ],
    },
    {
      id: "tools",
      name: "Tools",
      icon: Icons.TbTools,
      type: "group",
      active: false,
      links: [
        {
          id: "pool-calculator",
          name: "Pool Calculator",
          icon: Icons.BsCalculatorFill,
          type: "single",
          path: "/pool-calculator",
          active: false,
        },
        // {
        //   id: "gallery",
        //   name: "Gallery",
        //   icon: Icons.TbFileSearch,
        //   type: "single",
        //   path: "/gallery",
        //   active: false,
        // },
        {
          id: "documents",
          name: "Documents",
          icon: Icons.TbReportAnalytics,
          type: "single",
          path: "/documents",
          active: false,
        },
      ],
    },
  ]);

  const filterSideBarItems = (item: LinkItemProps) => {
    if (user) {
      if (user.admin || !user?.company?._id) {
        // Features want to hide form super-admin

        if (!hideFeaturesFromAdmin.includes(item.id)) {
          item.links = item?.links?.filter(
            (link) => !hideViewsFromAdmin.includes(link.id)
          );
          return true;
        }
      }

      if (user.modules) {
        const matchingModule = user.modules.find(
          (module) => module.name === item.id
        );
        if (matchingModule && item.links) {
          const matchingViews = matchingModule.views.filter((view) =>
            item.links?.some((link) => link.id === view)
          );
          const filteredLinks = item.links.filter((link) =>
            matchingViews.includes(link.id as EModuleViews)
          );
          item.links = filteredLinks;

          return true;
        }
      }

      if (user.operations) {
        // Hide Operations from Client's Users
        if (user.company.employee && hideFeaturesFromEmployee.includes(item.id))
          return false;

        const matchingOperation = user.operations.find(
          (operation) => operation.name === item.id
        );
        if (matchingOperation && item.links) {
          const matchingViews = matchingOperation.views.filter((view) =>
            item.links?.some((link) => link.id === view)
          );
          const filteredLinks = item.links.filter((link) => {
            if (
              user.company.employee &&
              hideViewsFromEmployee.includes(link.id)
            ) {
              return false;
            }

            return matchingViews.includes(link.id as EOperationViews);
          });

          item.links = filteredLinks;
          return true;
        }
      }
      if (user?.company?.subAdmin && user.package?.modules) {
        const matchingModules = user.package.modules.find(
          (module) => module.name === item.id
        );

        if (matchingModules && item.links) {
          const matchingViews = matchingModules.views.filter((view) =>
            item.links?.some((link) => link.id === view)
          );

          const filteredLinks = item.links.filter((link) =>
            matchingViews.includes(link.id)
          );
          item.links = filteredLinks;
          return true;
        }
      }

      return false;
    }

    return false;
  };

  const filterLinks = () => {
    if (user) {
      const links = linkItems.filter(filterSideBarItems);
      setLinkItems(links);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user._id && Object.keys(user).length) {
      filterLinks();
    }
  }, [user, isLoading]);
  return (
    <>
      {loading ? (
        <Flex
          justifyContent={"center"}
          alignItems="center"
          width={"100%"}
          height={"100%"}
        >
          <Core.BtnSpinner size="xl" />
        </Flex>
      ) : (
        <Accordion
          borderColor={user.admin ? "blue.900" : "blue.900"}
          // defaultIndex={[20]}
          // allowMultiple
          allowToggle
        >
          {linkItems.map((link) => {
            return link.type === "single" ? (
              <NavItem
                key={link.name}
                // color={link.active ? "white" : "gray.300"}
                color={
                  user?.themeId === "theme3"
                    ? // ? "#000"
                      "#fff"
                    : link.active
                    ? "white"
                    : "white"
                }
                fontSize="14px"
                fontWeight={"normal"}
                // height={"40px"}
                padding={"11px 16px 10px 16px"}
                path={link.type === "single" ? link.path : ""}
                icon={link.icon}
                active={link.active && link.active}
              >
                {link.name}
              </NavItem>
            ) : (
              <SidebarNavGroup
                icon={link.icon}
                title={link.name}
                key={link.name}
              >
                {link?.links?.map((lin) => (
                  <NavItem
                    key={lin.name}
                    padding="10px 16px"
                    fontWeight={"normal"}
                    fontSize="13px"
                    // color={"gray.300"}
                    // color={user?.themeId === "theme3" ? "#000" : "white"}
                    color="#fff"
                    path={lin.path}
                    icon={lin.icon}
                  >
                    {lin.name}
                  </NavItem>
                ))}
              </SidebarNavGroup>
            );
          })}
        </Accordion>
      )}
    </>
  );
};

export default memo(DrawerNavigation);
