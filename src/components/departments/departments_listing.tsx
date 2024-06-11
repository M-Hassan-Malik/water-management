import { useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  useMutation,
  useQuery,
  //  useQuery
} from "react-query";
import { useSelector } from "react-redux";

import { Core } from "@/components";
import {
  DeleteDepartment,
  FindDepartmentsByOwnerId,
  queryClient,
} from "@/services/api";

import { HandleLogout } from "../auth";

const actions = {
  edit: true,
  delete: true,
  view: true,
};
interface IDepartmentsListingProps {}

const DepartmentsListing: React.FC<IDepartmentsListingProps> = () => {
  const { push } = useRouter();
  const columns = ["department", "createdOn", "status", "action"];
  const user: IUser = useSelector((state: any) => state.user.user);
  const [departments, setDepartments] = useState<IDepartment & any>([]);
  const [idToDelete, setIdToDelete] = useState<string>("");
  const [success, setSuccess] = useState<IAlertSuccessData>();
  const [fail, setFail] = useState<IAlertSuccessData>();
  const [isLoading, setIsLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [tableFilters, setTableFilters] = useState(null);
  useQuery(
    ["findDepartmentsByOwnerId", tableFilters],
    () =>
      FindDepartmentsByOwnerId({
        clientAdminId: user._id || "",
        filter: tableFilters,
      }),
    {
      onSuccess: ({ findDepartmentsByOwnerId }) => {
        setIsLoading(false);
        if (findDepartmentsByOwnerId) setDepartments(findDepartmentsByOwnerId);
      },
      onError(_: any) {
        if (
          _?.response?.errors?.length &&
          _?.response?.errors[0]?.message === "Not Authorised!"
        )
          HandleLogout();
      },
      // Enable the query when userId is truthy
      enabled: Boolean(user._id) && Boolean(user?.company?._id),
      refetchOnMount: true,
    }
  );

  const { mutate } = useMutation(DeleteDepartment, {
    onSuccess() {
      setSuccess({
        status: true,
        title: "Success",
        description: "Department successfully deleted.",
      });
      queryClient.invalidateQueries({
        queryKey: ["findDepartmentsByOwnerId"],
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
        title: "Something went wrong",
        description: _?.response?.errors[0]?.message,
      });
    },
  });

  const onViewClick = (id: any) => {
    push(
      {
        pathname: "/departments/view",
        // query: { type: "view", id },
        query: { id },
      },
      undefined,
      {
        shallow: true,
      }
    );
  };
  const onEditClick = (id: any) => {
    push(
      {
        pathname: "/departments/edit",
        // query: { type: "edit", id },
        query: { id },
      },
      undefined,
      {
        shallow: true,
      }
    );
  };
  const onDeleteClick = (id: any) => {
    setIdToDelete(id);
    onOpen();
  };
  const confirmAction = (id: string) => {
    mutate({
      departmentId: id,
    });
    onClose();
  };

  return (
    <>
      <Core.Alert show={success} theme="success" />
      <Core.Alert show={fail} theme="error" />
      <Core.Modal
        isOpen={isOpen}
        onClose={onClose}
        onClick={confirmAction}
        id={idToDelete}
      />
      {/* <Core.StatsGroup statsData={statsData} /> */}
      <Core.Table
        actionButton={{
          name: "Add Department",
          link: "/departments/add",
        }}
        id="department-listing"
        tableData={departments}
        columns={columns}
        shadow
        // title="Manage Roles"
        filterBy={["Name", "Dates"]}
        setTableFilters={setTableFilters}
        // dropdwonOptions={dropdwonOptions}
        // manageRoles
        isLoading={isLoading}
        actions={actions}
        onViewClick={onViewClick}
        onEditClick={onEditClick}
        onDeleteClick={onDeleteClick}
      />
    </>
  );
};

export default DepartmentsListing;
