import { useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useSelector } from "react-redux";

import { Core } from "@/components";
import { HandleLogout } from "@/components/auth";
import { DeleteAdminUser, GetSubAdminList } from "@/services/api";

import { Icons } from "../icons";

const actions = {
  edit: true,
  delete: true,
  view: true,
};
interface ISubAdminUsersListingProps {}

const SubAdminUsersListing: React.FC<ISubAdminUsersListingProps> = () => {
  const columns = ["name", "package", "payment", "account", "action"];
  const { push } = useRouter();
  const user: IUser = useSelector((state: any) => state.user.user);
  const [subAdminList, setSubAdminList] = useState<ISubAdminList & any>([]);
  const [userId, setUserId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [tableFilters, setTableFilters] = useState(null);
  const [clientUserId, setClientUserId] = useState<string>("");
  const [success, setSuccess] = useState<IAlertSuccessData>();
  const [fail, setFail] = useState<IAlertSuccessData>();
  const queryClient = useQueryClient();

  useQuery(
    ["getSubAdminList", tableFilters],
    () => GetSubAdminList({ getSubAdminListId: userId, filter: tableFilters }),
    {
      onSuccess: ({ getSubAdminList }: { getSubAdminList: ISubAdminList }) => {
        if (getSubAdminList) setSubAdminList(getSubAdminList);

        setIsLoading(false);
      },
      onError(_: any) {
        if (
          _?.response?.errors?.length &&
          _?.response?.errors[0]?.message === "Not Authorised!"
        )
          HandleLogout();
        setIsLoading(false);
        console.log(_);
      },
      // Enable the query when userId is truthy
      enabled: Boolean(userId),
    }
  );

  const { mutate } = useMutation(DeleteAdminUser, {
    onSuccess() {
      setSuccess({
        status: true,
        title: "Success",
        description: "Admin User successfully deleted.",
      });
      queryClient.invalidateQueries({
        queryKey: ["getSubAdminList"],
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

  const onViewClick = (id: any) => {
    push(
      {
        pathname: "/client-admins/view",
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
        pathname: "/client-admins/edit",
        query: { id },
      },
      undefined,
      {
        shallow: true,
      }
    );
  };

  const onDeleteClick = (id: string) => {
    setClientUserId(id);
    onOpen();
  };
  const confirmAction = (id: string) => {
    mutate({
      deleteAdminUserId: id,
    });
    onClose();
  };

  const [totalPaidUsers, setTotalPaidUsers] = useState<Number>();
  const [totalUnpaidUsers, setTotalUnpaidUsers] = useState<Number>();

  useEffect(() => {
    let activeCount = 0;
    let inactiveCount = 0;
    subAdminList.forEach((item: any) => {
      if (item.payment) {
        activeCount += 1;
      } else {
        inactiveCount += 1;
      }
    });
    setTotalPaidUsers(activeCount);
    setTotalUnpaidUsers(inactiveCount);
  }, [subAdminList]);
  const statsData = [
    {
      title: "Client Admins",
      number: subAdminList?.length,
      icon: <Icons.HiUsers />,
      // percentage: "66",
      // status: true,
      // type: false,
    },
    {
      title: "Paid Users",
      number: totalPaidUsers,
      icon: <Icons.HiUsers />,
      // percentage: "66",
      // status: true,
      // type: false,
    },
    {
      title: "Unpaid Users",
      number: totalUnpaidUsers,
      icon: <Icons.HiUsers />,
      // percentage: "66",
      // status: true,
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
        id={clientUserId}
      />
      <Core.StatsGroup statsData={statsData} />
      <Core.Table
        id="client-admin-users-listing"
        actionButton={{
          name: "Add Client Admin",
          link: "/client-admins/add",
        }}
        tableData={subAdminList}
        columns={columns}
        isLoading={isLoading}
        shadow
        // title="Client-Admin Users"
        filterBy={["Name", "Package", "Dates", "paid"]}
        setTableFilters={setTableFilters}
        actions={actions}
        onEditClick={onEditClick}
        onViewClick={onViewClick}
        onDeleteClick={onDeleteClick}
      />
    </>
  );
};

export default SubAdminUsersListing;
