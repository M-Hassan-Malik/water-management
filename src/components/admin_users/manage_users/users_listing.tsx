import { useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useSelector } from "react-redux";

import { Core } from "@/components";
import { HandleLogout } from "@/components/auth";
import { Icons } from "@/components/icons";
import type { FindRelatingUsersQuery } from "@/graphql/generated/graphql";
import { DeleteAdminUser, FindRelatingUsers } from "@/services/api";

interface IUsersListingProps {}

const actions = {
  view: true,
  edit: true,
  delete: true,
};
const columns = ["name", "email", "role", "createdOn", "status", "action"];

const UsersListing: React.FC<IUsersListingProps> = () => {
  const { push } = useRouter();
  const [users, setUsers] = useState<
    FindRelatingUsersQuery["findRelatingUsers"]
  >([]);
  const [idToDelete, setIdToDelete] = useState<string>("");
  const [userId, setUserId] = useState("");
  const [success, setSuccess] = useState<IAlertSuccessData>();
  const [fail, setFail] = useState<IAlertSuccessData>();
  const [totalUsers, setTotalUsers] = useState<Number>();
  const [totalActiveUsers, setTotalActiveUsers] = useState<Number>();
  const [totalInActiveUsers, setTotalInActiveUsers] = useState<Number>();
  const user: IUser = useSelector((state: any) => state.user.user);
  const [isLoading, setIsLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [tableFilters, setTableFilters] = useState(null);
  const queryClient = useQueryClient();

  useQuery(
    ["findRelatingUsers", tableFilters],
    () =>
      FindRelatingUsers({ findRelatingUsersId: userId, filter: tableFilters }),
    {
      onSuccess: ({ findRelatingUsers }) => {
        setIsLoading(false);
        if (findRelatingUsers) setUsers(findRelatingUsers);
      },
      onError(_: any) {
        if (
          _?.response?.errors?.length &&
          _?.response?.errors[0]?.message === "Not Authorised!"
        )
          HandleLogout();

        setIsLoading(false);
        setFail({
          status: true,
          title: "Filter",
          description: _?.response?.errors[0]?.message,
        });
      },
      // Enable the query when userId is truthy
      enabled: Boolean(userId),
      refetchOnMount: true,
    }
  );

  const { mutate } = useMutation(DeleteAdminUser, {
    onSuccess() {
      setSuccess({
        status: true,
        title: "Success",
        description: "User successfully deleted.",
      });
      queryClient.invalidateQueries({
        queryKey: ["findRelatingUsers"],
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
        pathname: "/manage-users/view",
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
        pathname: "/manage-users/edit",
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
      deleteAdminUserId: id,
    });
    onClose();
  };

  useEffect(() => {
    if (user._id) setUserId(user._id);
  }, [user.active]);

  useEffect(() => {
    setTotalUsers(users.length);

    // calculating total active and in active users
    let activeCount = 0;
    let inactiveCount = 0;
    users.forEach((item: any) => {
      if (item.status) {
        activeCount += 1;
      } else {
        inactiveCount += 1;
      }
    });
    setTotalActiveUsers(activeCount);
    setTotalInActiveUsers(inactiveCount);
  }, [users]);

  const statsData = [
    {
      title: "Users",
      number: totalUsers,
      icon: <Icons.HiUsers />,
      // percentage: "43",
      // status: false,
      // type: false,
    },
    {
      title: "Active Users",
      number: totalActiveUsers,
      icon: <Icons.HiUsers />,
      // percentage: "57",
      // status: true,
      // type: false,
    },
    {
      title: "Inactive Users",
      number: totalInActiveUsers,
      icon: <Icons.HiUsers />,
      // percentage: "2",
      // status: false,
      // type: false,
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
        id="users-listing"
        actionButton={{ name: "Add User", link: "/manage-users/add" }}
        tableData={users}
        columns={columns}
        shadow
        filterBy={["Dates", "User"]}
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

export default UsersListing;
