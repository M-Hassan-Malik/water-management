import { useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";

import { Core } from "@/components";
import { HandleLogout } from "@/components/auth/logout";
import { DeleteRole, ManageRolesListing, queryClient } from "@/services/api";

import { Icons } from "../icons";

const actions = {
  edit: true,
  delete: true,
  view: true,
};
interface IRolesListingProps {}

const RolesListing: React.FC<IRolesListingProps> = () => {
  const { push } = useRouter();
  const columns = ["name", "activeUsers", "createdOn", "status", "action"];
  const user: IUser = useSelector((state: any) => state.user.user);
  const [roles, setRoles] = useState<IRole & any>([]);
  const [userId, setUserId] = useState("");
  const [idToDelete, setIdToDelete] = useState<string>("");
  const [success, setSuccess] = useState<IAlertSuccessData>();
  const [fail, setFail] = useState<IAlertSuccessData>();
  const [isLoading, setIsLoading] = useState(true);
  const [totalActiveRoles, setTotalActiveRoles] = useState<Number | undefined>(
    undefined
  );
  const [totalInActiveRoles, setTotalInActiveRoles] = useState<
    Number | undefined
  >(undefined);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [tableFilters, setTableFilters] = useState(null);

  useQuery(
    ["manageRolesListing", tableFilters],
    () =>
      ManageRolesListing({
        userId,
        filter: tableFilters,
      }),
    {
      onSuccess: ({ manageRolesListing }) => {
        setIsLoading(false);
        if (manageRolesListing) setRoles(manageRolesListing);
      },
      onError(_: any) {
        if (
          _?.response?.errors?.length &&
          _?.response?.errors[0]?.message === "Not Authorised!"
        )
          HandleLogout();
        setFail({
          status: true,
          title: "Filter",
          description: _?.response?.errors[0]?.message,
        });
      },
      // Enable the query when userId is truthy
      enabled: Boolean(userId),
    }
  );

  const { mutate } = useMutation(DeleteRole, {
    onSuccess() {
      setSuccess({
        status: true,
        title: "Success",
        description: "Role successfully deleted.",
      });
      queryClient.invalidateQueries({
        queryKey: ["manageRolesListing"],
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

  useEffect(() => {
    if (user?._id) setUserId(user._id);
  }, [user.active]);

  useEffect(() => {
    if (user?._id) setUserId(user._id);

    // calculating total active and in active users
    let activeCount = 0;
    let inactiveCount = 0;
    roles.forEach((item: any) => {
      if (item.status) {
        activeCount += 1;
      } else {
        inactiveCount += 1;
      }
    });
    setTotalActiveRoles(activeCount);
    setTotalInActiveRoles(inactiveCount);
  }, [user.active, roles]);

  const onViewClick = (id: any) => {
    push(
      {
        pathname: "/manage-roles/view",
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
        pathname: "/manage-roles/edit",
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
      deleteRoleId: id,
    });
    onClose();
  };

  const statsData = [
    {
      title: "No. of Roles",
      number: roles?.length ? roles?.length : undefined,
      // percentage: "12",
      // status: false,
      icon: <Icons.FaUserCog />,
    },
    {
      title: "Active Roles",
      number:
        typeof totalActiveRoles === "number" ? totalActiveRoles : undefined,
      // percentage: "12",
      // status: false,
      icon: <Icons.FaUserCheck />,
    },
    {
      title: "Inactive Roles",
      number:
        typeof totalInActiveRoles === "number" ? totalInActiveRoles : undefined,
      // percentage: "12",
      // status: false,
      icon: <Icons.FaUserTimes />,
    },
  ];

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
      <Core.StatsGroup statsData={statsData} />
      <Core.Table
        actionButton={{
          name: "Add Role",
          link: "/manage-roles/add",
        }}
        id="roles-listing"
        tableData={roles}
        columns={columns}
        shadow
        filterBy={["Dates", "Role"]}
        setTableFilters={setTableFilters}
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

export default RolesListing;
