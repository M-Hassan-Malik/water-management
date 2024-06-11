import {
  Box,
  Flex,
  Heading,
  Input,
  Table as CharkraTable,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tooltip,
  Tr,
  useMediaQuery,
} from "@chakra-ui/react";
// import moment from "moment";
import Link from "next/link";
import type { ChangeEvent } from "react";
import React, { memo, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

import { EScheduleType } from "@/graphql/generated/graphql";
import { formatDateAndTime } from "@/utils/helpers/functions";

import { Core } from "../..";
import { Icons } from "../../icons";
import MessageType from "../message_type";
import ModificationStatus from "../modification_status";
import ActivityStatus from "./activity_status";
import HeadingWithSort from "./heading_with_sort";

const filterByEmailAndNotification = ["Email", "Notification"];
const filterByRole = ["Email", "Notification"];
const filterByTask = ["Completed", "Pending", "In Process"];
const filterByPaid = ["Paid", "Unpaid"];
const filterByMessage = ["Seen", "Unseen"];
const dropdwonOptionsForIntervals = [
  "Today",
  "Last Week",
  "This Month",
  "This Year",
];
interface ITableProps {
  id?: string;
  dynamicObjectsFilter?: any[];
  tableData: any[];
  columns: string[];
  tableFoot?: string[];
  shadow?: boolean;
  dataPerPage?: number;
  captionText?: string;
  title?: string | undefined;
  heading?: string | undefined;
  dropdwonType?: string;
  defaultName?: string;
  selectStatus?: (selectedOption: any) => void;
  filterBy?: string[];
  // manageRoles?: boolean;
  clickable?: boolean;
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
  mt?: string;
  isLoading?: boolean;
  actions?: {
    edit?: boolean;
    delete?: boolean;
    view?: boolean;
    assign?: boolean;
  };
  onViewClick?: any;
  onEditClick?: any;
  onDeleteClick?: any;
  onAssignClick?: any;
  selectedIds?: any;
  setSelectedIds?: any;
  selectedId?: any;
  setSelectedId?: any;
  selectRows?: boolean;
  selectSingleRows?: boolean;
  getDataByUserId?: boolean;
  setTableFilters?: any;
  actionButton?:
    | {
        name: string;
        link?: string;
        action?: (obj: any) => void;
      }
    | undefined;
  maxHeight?: string;
}
const Table: React.FunctionComponent<ITableProps> = ({
  id,
  tableData,
  dynamicObjectsFilter,
  columns,
  shadow,
  captionText,
  tableFoot,
  title,
  filterBy,
  heading,
  // manageRoles,
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
  mt,
  isLoading,
  actions,
  onViewClick,
  onEditClick,
  onDeleteClick,
  onAssignClick,
  selectRows,
  selectSingleRows,
  selectedIds,
  setSelectedIds,
  selectedId,
  setSelectedId,
  setTableFilters,
  actionButton,
  getDataByUserId,
  maxHeight,
}) => {
  const [data, setData] = useState<any>(tableData);
  const [pageNumber, setPageNumber] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(1);
  const [dataPerPage] = useState(10);
  const [isMobileScreen] = useMediaQuery("(max-width: 640px)");
  const [tableFiltersData, setTableFiltersData] = useState<ITableFilters>({
    Name: "",
    Email: "",
    Package: "",
    Role: "",
    ParkName: "",
    Intervals: "",
    Task: "",
    User: "",
    paid: "",
    Message: "",
    OrganizationName: "",
    EmailAndNotification: "",
    Dates: "",
    dynamicObjectId: "",
    reportType: "",
  });

  const user: IUser = useSelector((state: any) => state.user.user);
  // const setUserTheme = () => {
  //   if (user?.themeId === "green") {
  //     return greenTheme;
  //   }
  //   if (user?.themeId === "purple") {
  //     return purpleTheme;
  //   }
  //   if (user?.themeId === "dark") {
  //     return darkTheme;
  //   }
  //   if (user?.themeId === "theme1") {
  //     return theme1;
  //   }
  //   if (user?.themeId === "theme2") {
  //     return theme2;
  //   }
  //   if (user?.themeId === "theme3") {
  //     return theme3;
  //   }
  //   if (user.admin) {
  //     return blueDefaultTheme;
  //   }
  //   return orangeDefaultTheme;
  // };
  // const chosenTheme = useMemo(() => setUserTheme(), [user?.themeId]);

  const sliceData = () => {
    const lastIndex = pageNumber * dataPerPage;
    const firstIndex = lastIndex - dataPerPage;
    const currentData = tableData.slice(firstIndex, lastIndex);
    setData(currentData);
  };

  useMemo(() => {
    if (tableData) {
      const num = tableData.length / dataPerPage;
      setNumberOfPages(Math.ceil(num));
      setPageNumber(1);
      sliceData();
    }
  }, [tableData]);

  const tableHeading = (col: string) => {
    switch (col) {
      case "amount":
        return <HeadingWithSort title="Amount" sortAmount={sortAmount} />;
      case "name":
        return <HeadingWithSort title="Name" sortName={sortName} />;
      case "userId":
        return <HeadingWithSort title="User Id" sortUserId={sortUserId} />;
      case "date":
        return <HeadingWithSort title="Date" sortDate={sortDate} />;
      case "orderId":
        return <HeadingWithSort title="Order Id" sortOrderId={sortOrderId} />;
      case "userName":
        return <HeadingWithSort title="User Name" sortDueDate={sortDueDate} />;
      case "parkName":
        return <HeadingWithSort title="Park Name" sortDueDate={sortDueDate} />;
      case "dueDateAndTime":
        return (
          <HeadingWithSort title="Due Date & Time" sortDueDate={sortDueDate} />
        );
      case "createdOn":
        return (
          <HeadingWithSort title="Created On" sortCreatedOn={sortCreatedOn} />
        );
      case "created_on":
        return (
          <HeadingWithSort title="Created On" sortCreatedOn={sortCreatedOn} />
        );
      case "paymentDate":
        return (
          <HeadingWithSort
            title="Payment Date"
            sortPaymentDate={sortPaymentDate}
          />
        );
      case "registeredNo":
        return (
          <HeadingWithSort
            title="Registered No"
            sortRegisteredNo={sortRegisteredNo}
          />
        );
      case "customerName":
        return (
          <HeadingWithSort
            title="Customer Name"
            sortCustomerName={sortCustomerName}
          />
        );
      case "currentStatus":
        return "Current Status";
      case "nextPayment":
        return "Next Payment";
      case "activeUsers":
        return "Active Users";
      case "organizationName":
        return "Organization Name";
      case "clientAdminName":
        return "Client-Admin Name";
      case "subscriptionAmount":
        return "Subscription Amount";
      case "submissionDate":
        return "Submission Date";
      case "submissionId":
        return "Submission ID";
      case "phoneNo":
        return "Phone No.";
      case "packageType":
        return "Package Type";
      case "timePeriod":
        return "Time Period";
      case "user_name":
        return "User Name";
      case "clientName":
        return "Client Name";
      case "assignedTo":
        return "Assigned To";
      case "created_by":
        return "Created By";
      case "scheduleType":
        return "Schedule Type";
      case "packageStatus":
        return "Package Status";
      case "first_name":
        return "First Name";
      case "last_name":
        return "Last Name";
      case "_id":
        return "ID";
      case "_ID":
        return "ID";
      case "date_time":
        return "DATE TIME";
      case "dateTime":
        return "DATE TIME";
      case "datetime":
        return "DATE TIME";
      default:
        return col;
    }
  };

  const noDataMessage = (_id: string | undefined) => {
    switch (_id) {
      case "employees-listing":
        return "No Users Available";
      case "department-listing":
        return "No Departments Available";
      case "report-templates":
        return "No Reports";
      case "inventory-report-templates":
        return "No Inventory Reports";
      case "incident-report-templates":
        return "No Incident Reports";
      case "payment-records":
        return "No Payment Records Available";
      case "email-&-notifications-listing":
        return "No Email and Notifications Available";
      case "geo-locations-listing":
        return "No Geo Locations Available";
      case "activity-logs":
        return "No Activity Logs Found";
      case "users-listing":
        return "No Users Available";
      case "sales-by-client":
        return "No Sales Found.";
      case "user-locations-listing":
        return "No User Locations Available";
      case "packages-listing":
        return "No Package Available";
      case "subscription-packages-listing":
        return "No Subscription Package Available";
      case "track-user-report":
        return "No User Report Found";
      case "client-admin-users-listing":
        return "No Client Admin Users Found";
      case "track-tasks":
        return "No Task Available";
      case "track-particular-client-record":
        return "No Record Available";
      case "track-subadmin-payment-records-listing":
        return "No Record Available";
      case "assign-training":
        return "No Users Available";
      case "website-contact-form-listing":
        return "No Message Available";
      case "external-training":
        return "Please Select other Pectora Facilities";
      default:
        return "Data not found!";
    }
  };

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

  const renderTableCell = (td: any, col: any) => {
    if (typeof td === "string") td = td.toLowerCase();
    if (
      td === "completed" ||
      td === "pending" ||
      td === "inprocess" ||
      td === "active"
    )
      return <Core.Badge status={td} />;
    if (col.toLowerCase() === "active") return <Core.Badge status={"active"} />;
    if (col.toLowerCase() === "inactive")
      return <Core.Badge status={"inactive"} />;

    switch (col) {
      case "payment":
        if (td === true) {
          return (
            <Flex color="green.400" alignItems={"center"} columnGap={"3px"}>
              <Icons.BsCheck2 />
              <Text color="black">Paid</Text>
            </Flex>
          );
        }
        return (
          <Flex color="red.500" alignItems={"center"} columnGap={"3px"}>
            <Icons.IoMdClose />
            <Text color="black">Unpaid</Text>
          </Flex>
        );
      case "status":
        if (td === true) return <ActivityStatus>Active</ActivityStatus>;
        return <ActivityStatus>Inactive</ActivityStatus>;
      case "account":
        if (td === true) {
          return <ActivityStatus>Active</ActivityStatus>;
        }
        return <ActivityStatus>Inactive</ActivityStatus>;
      case "seen":
        if (td === true) {
          return <Icons.BsEyeFill fontSize={"20px"} color="orange" />;
        }
        return <Icons.BsEyeSlashFill fontSize={"20px"} color="red" />;

      case "packageStatus":
        if (td.toString().toLowerCase() === "subscribed") {
          return (
            <ModificationStatus themeId={user?.themeId}>
              Subscribe
            </ModificationStatus>
          );
        }
        if (td.toString() === "upgrade") {
          return <ModificationStatus>Upgrade</ModificationStatus>;
        }
        return <ModificationStatus>Downgrade</ModificationStatus>;
      case "type":
        if (td === "email") {
          return <MessageType>{td}</MessageType>;
        }
        return <MessageType>{td}</MessageType>;
      case "duration":
        return `${convertDaysToYearsAndMonths(td)}`;
      case "cost":
        return `$${td}`;
      case "email":
        return `${td}`;
      case "department":
        return `${td.toUpperCase()}`;
      case "date":
        return `${formatDateAndTime(td)}`;
      case "createdOn":
        return `${formatDateAndTime(td)}`;
      case "created On":
        return `${formatDateAndTime(td)}`;
      case "createdAt":
        return `${formatDateAndTime(td)}`;
      case "deadline":
        return td === EScheduleType.Always.toLocaleLowerCase()
          ? "No Deadline"
          : `${formatDateAndTime(td)}`;
      case "dateTime":
        return `${formatDateAndTime(td)}`;
      case "state":
        return td?.toUpperCase();
      case "country":
        return td?.toUpperCase();
      case "city":
        return td?.toUpperCase();
      default:
        return <span className="capitalize">{td}</span>;
    }
  };
  const handleFilter = (filterName: string, e: any) => {
    const inputValue = e?.target?.value ? e.target.value : "";

    if (filterName)
      setTableFiltersData((prevFilters: any) => ({
        ...prevFilters,
        [filterName]: inputValue,
      }));
  };

  const handleDynamicObjectFilter = (value: any) => {
    if (value)
      setTableFiltersData((prevFilters: any) => ({
        ...prevFilters,
        dynamicObjectId: value,
      }));
  };

  const handleDropdownFilter = (filterName: string, e: any) => {
    if (filterName)
      setTableFiltersData((prevFilters: any) => ({
        ...prevFilters,
        [filterName]: e,
      }));
  };

  const statusDropdownFilter = (filterName: string) => {
    if (filterName)
      setTableFiltersData((prevFilters: any) => ({
        ...prevFilters,
        status: filterName,
      }));
  };

  const handleInputChange = (
    dateType: any,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = e.target.value;
    setTableFiltersData((prevFilters: any) => ({
      ...prevFilters,
      [dateType]: inputValue,
    }));
  };

  const filterData = () => {
    setTableFilters(tableFiltersData);
  };

  const resetFilterData = () => {
    setTableFilters(null);
    setTableFiltersData({
      Name: "",
      Email: "",
      Package: "",
      Role: "",
      ParkName: "",
      Intervals: "",
      Task: "",
      User: "",
      paid: "",
      Message: "",
      OrganizationName: "",
      EmailAndNotification: "",
      Dates: "",
      dynamicObjectId: "",
    });
    // handleInputChange("start", "2024-04-04T12:50");
    // handleInputChange("end", "")
  };
  useEffect(() => {
    sliceData();
  }, [pageNumber]);

  const dropdownFor = (element: string) => {
    if (element === "Role") {
      return filterByRole;
    }
    if (element === "dynamicObjects") {
      return dynamicObjectsFilter;
    }
    if (element === "Task") {
      return filterByTask;
    }
    if (element === "paid") {
      return filterByPaid;
    }
    if (element === "Message") {
      return filterByMessage;
    }
    if (element === "EmailAndNotification") {
      return filterByEmailAndNotification;
    }
    return dropdwonOptionsForIntervals;
  };

  const allFilters = (filter: string[] | undefined) => {
    return (
      <>
        {filter?.map((element: string) => {
          if (
            element === "Name" ||
            element === "Email" ||
            element === "User" ||
            element === "Package" ||
            element === "Role" ||
            element === "OrganizationName" ||
            element === "ParkName"
          ) {
            return (
              <Input
                fontFamily={"Raleway"}
                key={element}
                variant="outline"
                size="sm"
                maxW={isMobileScreen ? "100%" : "160px"}
                placeholder={element}
                value={tableFiltersData?.[element]}
                onChange={(e) => handleFilter(element, e)}
              />
            );
          }
          if (element.toLowerCase() === "dates") {
            return (
              <div key={element}>
                <Tooltip
                  // label={
                  //   manageRoles ? "Creation Start Date" : "Register Start Date"
                  // }
                  label={"From"}
                >
                  <Input
                    fontFamily={"Verdana"}
                    variant="outline"
                    size="sm"
                    textTransform={"uppercase"}
                    maxW={isMobileScreen ? "100%" : "225px"}
                    type="datetime-local"
                    onChange={(e: any) => handleInputChange("start", e)}
                  />
                </Tooltip>
                &nbsp;
                <Tooltip
                  // label={
                  //   manageRoles ? "Creation End Date" : "Register End Date"
                  // }
                  label={"End"}
                >
                  <Input
                    fontFamily={"Verdana"}
                    variant="outline"
                    size="sm"
                    textTransform={"uppercase"}
                    // maxW={isMobileScreen ? "100%" : "46px"}
                    maxW={isMobileScreen ? "100%" : "225px"}
                    type="datetime-local"
                    onChange={(e: any) => handleInputChange("end", e)}
                  />
                </Tooltip>
              </div>
            );
          }
          if (element.toLowerCase() === "intervals") {
            return (
              <Core.ActionsDropdown
                key={element}
                defaultName={"Filter By"}
                dropdwonOptions={dropdwonOptionsForIntervals}
                handleFilter={handleFilter}
              />
            );
          }
          if (element.toLowerCase() === "paid") {
            return (
              <Core.ActionsDropdown
                key={element}
                element={"paid"}
                dropdwonOptions={dropdownFor(element)}
                defaultName={"Filter By"}
                handleFilter={handleDropdownFilter}
              />
            );
          }
          if (element.toLowerCase() === "emailandnotification") {
            return (
              <Core.ActionsDropdown
                key={element}
                element={"EmailAndNotification"}
                dropdwonOptions={dropdownFor(element)}
                defaultName={"Filter By"}
                handleFilter={handleDropdownFilter}
              />
            );
          }
          if (element === "Task") {
            return (
              <Core.ActionsDropdown
                key={element}
                status
                dropdwonOptions={dropdownFor(element)}
                element={element}
                handleFilter={statusDropdownFilter}
              />
            );
          }
          if (
            element === "Role" ||
            element === "User" ||
            element === "paid" ||
            element === "Message" ||
            element === "EmailAndNotification"
          ) {
            return (
              <Core.ActionsDropdown
                key={element}
                status
                dropdwonOptions={dropdownFor(element)}
                element={element}
                handleFilter={handleFilter}
              />
            );
          }
          if (element === "dynamicObjects") {
            return (
              <Core.ActionsDropdown
                key={element}
                defaultName="Select Facility"
                dropdwonOptions={dropdownFor(element)} // dynamic data () array of objects )
                element={element}
                handleFilter={handleDynamicObjectFilter}
              />
            );
          }
          return null;
        })}
      </>
    );
  };

  const handleCheckboxChangeSelectAll = (e: any) => {
    if (e.target.checked) {
      const allIds = data.map((item: any) => item._id);
      setSelectedIds(allIds);
    } else {
      setSelectedIds([]);
    }
  };

  const handleCheckboxChange = (e: any, __id: any) => {
    setSelectedIds((prevSelectedIds: any) => {
      if (e.target.checked) {
        return [...prevSelectedIds, __id];
      }
      return prevSelectedIds.filter((_selectedId: any) => _selectedId !== __id);
    });
  };

  const handleSingleCheckboxChange = (e: any, __id: any) => {
    console.log(e);
    setSelectedId(__id); // Set the current selection as an array with a single element
  };

  // const dropDownList = [
  //   {
  //     name: "10",
  //     value: 10,
  //   },
  //   {
  //     name: "25",
  //     value: 25,
  //   },
  //   {
  //     name: "50",
  //     value: 50,
  //   },
  // ];

  return (
    <Box width={"100%"} mt={mt && mt}>
      {title && (
        <Core.H5 color="textColor" pb={"10px"}>
          {title}
        </Core.H5>
      )}
      <Box
        width={"100%"}
        style={
          shadow
            ? {
                borderRadius: "10px",
                padding: "0 0 10px 0",
                boxShadow: "0px 2px 5px 2px rgba(0,0,0,0.05)",
              }
            : {}
        }
        backgroundColor="white.100"
        mt={title && "5px"}
      >
        <Flex
          justifyContent={"space-between"}
          alignItems={"center"}
          flexWrap={"wrap-reverse"}
          rowGap={"10px"}
          py="10px"
          px={"10px"}
        >
          <Flex justifyContent={"start"}>
            {selectRows && (
              <Core.Checkbox
                size="lg"
                ml={"20px"}
                selectedIds={selectedIds}
                handleCheckboxChangeSelectAll={handleCheckboxChangeSelectAll}
              />
            )}
            <Flex
              fontFamily={"cursive"}
              paddingRight={"10px"}
              paddingLeft={"10px"}
              flexWrap={"wrap"}
              columnGap="5px"
              rowGap={"3px"}
              alignItems="center"
            >
              {heading && <Core.H5 color="textColor">{heading}</Core.H5>}
              {filterBy?.includes("Name") ||
              filterBy?.includes("Package") ||
              filterBy?.includes("Email") ||
              filterBy?.includes("Roles") ||
              filterBy?.includes("Dates") ||
              filterBy?.includes("Park Name") ? (
                <Icons.CiFilter fontSize="20px" />
              ) : null}
              {allFilters(filterBy)}
              {(() => {
                let conditionCount = 0;
                if (filterBy?.includes("Name")) conditionCount += 1;
                if (filterBy?.includes("Email")) conditionCount += 1;
                if (filterBy?.includes("Package")) conditionCount += 1;
                if (filterBy?.includes("Role")) conditionCount += 1;
                if (filterBy?.includes("ParkName")) conditionCount += 1;
                if (filterBy?.includes("Intervals")) conditionCount += 1;
                if (filterBy?.includes("Task")) conditionCount += 1;
                if (filterBy?.includes("User")) conditionCount += 1;
                if (filterBy?.includes("Payment")) conditionCount += 1;
                if (filterBy?.includes("Message")) conditionCount += 1;
                if (filterBy?.includes("OrganizationName")) conditionCount += 1;
                if (filterBy?.includes("EmailAndNotification"))
                  conditionCount += 1;
                if (filterBy?.includes("Dates")) conditionCount += 1;
                if (conditionCount >= 1) {
                  return (
                    <Flex columnGap={"5px"}>
                      <Core.IconicButton button="Search" onClick={filterData} />
                      <Core.IconicButton
                        button="Reset"
                        onClick={resetFilterData}
                      />
                    </Flex>
                  );
                }
                return null;
              })()}
            </Flex>
          </Flex>
          <Box>
            {actionButton && (
              <>
                {actionButton.action ? (
                  <Core.Button
                    btnBlueMd
                    size="md"
                    onClick={actionButton.action}
                  >
                    {actionButton.name}
                  </Core.Button>
                ) : (
                  <Link href={`${actionButton.link}`} as={actionButton.link}>
                    <Core.Button btnBlueMd size="md">
                      {actionButton.name}
                    </Core.Button>
                  </Link>
                )}
              </>
            )}
          </Box>
        </Flex>
        <TableContainer
          fontSize="14px"
          maxHeight={maxHeight ? "300px" : "100%"}
          // overflowX={maxHeight ? "auto" : "unset"}
          overflowX={"auto"}
          overflowY={maxHeight ? "auto" : "unset"}
        >
          <CharkraTable variant="simple">
            {captionText && <TableCaption>{captionText}</TableCaption>}
            <Thead
              backgroundColor={user?.themeId === "dark" ? "#565656" : "#f5f5f5"}
            >
              <Tr>
                {(selectRows || selectSingleRows) && (
                  <Th
                    width={"35px"}
                    pl="20px"
                    pr="0"
                    borderColor={"gray.200"}
                  ></Th>
                )}

                {columns.map((col) => (
                  <Th
                    key={col}
                    isNumeric={col === "action"}
                    color={"textColor"}
                    borderColor={"gray.200"}
                  >
                    {tableHeading(col)}
                  </Th>
                ))}
              </Tr>
            </Thead>
            {isLoading ? (
              ""
            ) : (
              <Tbody>
                {data?.map((row: any, index: any) => {
                  return (
                    <Tr key={index * 5}>
                      {selectRows && (
                        <Th
                          width={"35px"}
                          pl="20px"
                          pr="0"
                          borderColor={"gray.200"}
                        >
                          <Core.Checkbox
                            size="lg"
                            id={row._id}
                            selectedIds={selectedIds}
                            handleCheckboxChange={handleCheckboxChange}
                          />
                        </Th>
                      )}
                      {selectSingleRows && (
                        <Th
                          width={"35px"}
                          pl="20px"
                          pr="0"
                          borderColor={"gray.200"}
                        >
                          <Core.Checkbox
                            size="lg"
                            id={row._id}
                            selectedId={selectedId}
                            handleSingleCheckboxChange={
                              handleSingleCheckboxChange
                            }
                          />
                        </Th>
                      )}

                      {columns.map((col) => {
                        if (col === "action" && actions) {
                          return (
                            <Td
                              key={col}
                              maxW="500px"
                              overflow={"auto"}
                              isNumeric
                              borderColor={"gray.200"}
                            >
                              {actions?.view && (
                                <>
                                  <abbr title="View">
                                    <Core.IconicButton
                                      button="view"
                                      onClick={() =>
                                        onViewClick && getDataByUserId
                                          ? onViewClick(row.user_id)
                                          : onViewClick(row._id)
                                      }
                                    />
                                  </abbr>
                                  &nbsp;
                                </>
                              )}
                              {actions?.edit && (
                                <>
                                  <abbr title="Edit">
                                    <Core.IconicButton
                                      button={"Edit"}
                                      onClick={() =>
                                        onEditClick && onEditClick(row._id)
                                      }
                                    />
                                  </abbr>
                                  &nbsp;
                                </>
                              )}
                              {actions?.delete && (
                                <>
                                  <abbr title="Delete">
                                    <Core.IconicButton
                                      button={"Delete"}
                                      onClick={() =>
                                        onDeleteClick && onDeleteClick(row._id)
                                      }
                                      isDisabled={row.access === "DEFAULT"}
                                    />
                                  </abbr>
                                  &nbsp;
                                </>
                              )}
                              {actions?.assign && (
                                <abbr title="Assign">
                                  <Core.IconicButton
                                    button="assign"
                                    onClick={() =>
                                      onAssignClick && onAssignClick(row._id)
                                    }
                                  />
                                </abbr>
                              )}
                            </Td>
                          );
                        }
                        return (
                          <Td
                            key={col}
                            maxW="500px"
                            overflow={"auto"}
                            borderColor={"gray.200"}
                          >
                            {row[col]?.edit && (
                              <>
                                <Core.IconicButton
                                  button={"Edit"}
                                  name="edit"
                                  value={row._id}
                                  onClick={onEditClick}
                                />
                                &nbsp;
                              </>
                            )}
                            {row[col]?.delete && (
                              <>
                                <Core.IconicButton
                                  button={"Delete"}
                                  name="delete"
                                  value={row._id}
                                  onClick={onDeleteClick}
                                />
                                &nbsp;
                              </>
                            )}
                            {row[col]?.view && (
                              <Core.IconicButton
                                button={"view"}
                                name="view"
                                value={row._id}
                                onClick={onViewClick}
                              />
                            )}
                            {col === "subscriptionAmount" || col === "amount"
                              ? "$ "
                              : ""}
                            {renderTableCell(row[col], col)}
                          </Td>
                        );
                      })}
                    </Tr>
                  );
                })}
              </Tbody>
            )}
            <Tfoot>
              <Tr>
                {tableFoot?.map((tf) => (
                  <Th key={tf}>{tf}</Th>
                ))}
              </Tr>
            </Tfoot>
          </CharkraTable>
        </TableContainer>
        {isLoading ? (
          <Flex
            width={"100%"}
            h={"200px"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Core.BtnSpinner size="md" />
          </Flex>
        ) : data?.length === 0 ? (
          <Flex
            width={"100%"}
            h={"200px"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Heading color="#aaa" userSelect={"none"}>
              {noDataMessage(id)}
            </Heading>
          </Flex>
        ) : (
          ""
        )}
        <Flex
          justify={"space-between"}
          alignItems="center"
          p="10px 20px 0 20px"
        >
          {/* {tableData?.length > dataPerPage && (
            <Flex alignItems="center" columnGap="5px">
              <Box as="span" fontSize={"12px"}>
                Show
              </Box>
              <Core.Select
                list={dropDownList}
                onChange={(e) => setDataPerPage(Number(e.currentTarget.value))}
                value={String(dataPerPage)}
              />
               <Input
                variant="outline"
                size="xs"
                fontSize={"16px"}
                textAlign="center"
                maxW={"50px"}
                borderColor={"gray.200"}
                type="number"
                placeholder="0"
                pt="0"
                pb="2px"
                px="3px"
                onClick={(e) => setDataPerPage(Number(e.currentTarget.value))}
              /> 
              <Box as="span" fontSize={"12px"}>
                Entries
              </Box>
            </Flex>
          )} */}
          {!isLoading && tableData.length > dataPerPage && (
            <Core.PaginationContainer
              activePage={pageNumber}
              numberOfPages={numberOfPages}
              setPageNumber={setPageNumber}
            />
          )}
        </Flex>
      </Box>
    </Box>
  );
};

export default memo(Table);
