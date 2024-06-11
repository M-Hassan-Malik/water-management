import { Box, useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";

import { Core } from "@/components";
import { HandleLogout } from "@/components/auth";
import { Icons } from "@/components/icons";
import type { EmployeeType } from "@/graphql/generated/graphql";
import { DeleteEmployee, FindAllEmployees, queryClient } from "@/services/api";

const actions = {
  edit: true,
  view: true,
  delete: true,
};

interface IAddEmployeeFormProps {}

interface EmployeeList {
  _id: string;
  name: string;
  "access type": EmployeeType | string;
  email: string;
  status: boolean;
  _: string;
}

const columns = ["name", "access type", "email", "status", "_", "action"];

const ListEmployees: React.FC<IAddEmployeeFormProps> = () => {
  const { push } = useRouter();
  const user: IUser = useSelector((state: any) => state.user.user);
  const [employees, setEmployees] = useState<EmployeeList[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [success, setSuccess] = useState<IAlertSuccessData>();
  const [fail, setFail] = useState<IAlertSuccessData>();
  const [tableFilters, setTableFilters] = useState(null);
  const [idToDelete, setIdToDelete] = useState<string>("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  useQuery(
    ["listAllEmployees", tableFilters],
    () =>
      FindAllEmployees({ createdById: user._id || "", filter: tableFilters }),
    {
      onSuccess({ findAllEmployees }) {
        setIsLoading(false);
        const employeesData = findAllEmployees?.flatMap((employee) => {
          return {
            _id: employee._id,
            name: `${employee.first_name} ${employee.last_name}`,
            "access type":
              employee?.company && employee.company?.employeeType
                ? employee.company.employeeType
                : `Client Admin`,
            email: employee.email,
            status: employee.active,
            _: String(employee._id) === String(user._id) ? "Myself" : "",
          };
        });
        setEmployees(employeesData);
      },
      onError(_: any) {
        if (
          _?.response?.errors?.length &&
          _?.response?.errors[0]?.message === "Not Authorised!"
        )
          HandleLogout();
        setIsLoading(false);
      },
      enabled: Boolean(user._id),
      refetchOnMount: true,
    }
  );

  const { mutate } = useMutation(DeleteEmployee, {
    onSuccess() {
      setSuccess({
        status: true,
        title: "Success",
        description: "User successfully deleted.",
      });
      queryClient.invalidateQueries({
        queryKey: ["listAllEmployees"],
      });
    },
    onError(_: any) {
      if (
        _?.response?.errors?.length &&
        _?.response?.errors[0]?.message === "Not Authorised!"
      )
        HandleLogout();
      setFail({
        status: true,
        title: "Failed",
        description: _?.response?.errors[0]?.message,
      });
    },
  });

  const statsData = [
    {
      title: "Total Users",
      number: employees?.length,
      icon: <Icons.HiUsers />,
    },
  ];
  const onEditClick = (id: string) => {
    push(
      {
        pathname: `/employees/edit`,
        query: { id },
      },
      undefined,
      { shallow: true }
    );
  };

  const onViewClick = (id: string) => {
    push(
      {
        pathname: `/employees/view`,
        query: { id },
      },
      undefined,
      { shallow: true }
    );
  };
  const onDeleteClick = (id: any) => {
    setIdToDelete(id);
    onOpen();
  };
  const confirmAction = (id: string) => {
    mutate({
      employeeId: id,
    });
    onClose();
  };

  return (
    <Box>
      <Core.Alert show={success} theme="success" />
      <Core.Alert show={fail} theme="error" />
      <Core.Modal
        isOpen={isOpen}
        onClose={onClose}
        onClick={confirmAction}
        id={idToDelete}
      />
      <Core.StatsGroup statsData={statsData} />
      <Core.Table
        id="employees-listing"
        actionButton={{
          name: "Add New User",
          link: "/employees/add",
        }}
        filterBy={["Dates", "User"]}
        setTableFilters={setTableFilters}
        tableData={employees || []}
        columns={columns}
        shadow
        // title="Subscription Packages"
        isLoading={isLoading}
        actions={actions}
        onEditClick={onEditClick}
        onDeleteClick={onDeleteClick}
        onViewClick={onViewClick}
      />
    </Box>
  );
};

export default ListEmployees;
