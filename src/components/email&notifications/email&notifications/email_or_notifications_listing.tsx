import { useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";

import { Core } from "@/components";
import { HandleLogout } from "@/components/auth";
import { Alert, Table } from "@/components/core";
import {
  DeleteEmailAndNotification,
  GetEmailAndNotificationByCreatorId,
} from "@/services/api";

interface IEmailOrNotificationsListingProps {}

const actions = {
  view: true,
  edit: true,
  delete: true,
};

const columns = ["type", "subject", "text", "date", "action"];

const EmailOrNotificationsListing: React.FC<
  IEmailOrNotificationsListingProps
> = () => {
  const user: IUser = useSelector((state: any) => state.user.user);
  const { push } = useRouter();
  const [tableFilters, setTableFilters] = useState(null);
  const [data, setData] = useState<IEmailAndNotification[] | any>([]);
  const [fail, setFail] = useState<IAlertSuccessData>();
  const [success, setSuccess] = useState<IAlertSuccessData>();
  const [isLoading, setIsLoading] = useState(true);
  const [idToDelete, setIdToDelete] = useState<string>("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { refetch } = useQuery(
    ["emailAndNotificationGet", tableFilters],
    () =>
      GetEmailAndNotificationByCreatorId({
        creatorId: user?._id || "",
        filter: tableFilters,
      }),
    {
      onSuccess: ({ getEmailAndNotificationByCreatorId }) => {
        setIsLoading(false);
        if (getEmailAndNotificationByCreatorId.length)
          setData(getEmailAndNotificationByCreatorId);
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
        console.log(_);
      },
      // Enable the query when userId is truthy
      enabled: Boolean(user?._id),
      refetchOnMount: true,
    }
  );

  // const { mutate, isLoading: deleteAPILoading } = useMutation(
  //   (variables) => DeleteEmailAndNotification(variables),
  //   {
  //     onSuccess: ({ addEmailAndNotification }) => {
  //       // setSuccess({
  //       //   status: true,
  //       //   title: "Success",
  //       //   description: addEmailAndNotification.message || "",
  //       // });
  //       // replace(
  //       //   `/email-&-notifications/view/?id=${addEmailAndNotification.data}`
  //       // );
  //     },
  //     onError: (_: any) => {
  //       setFail({
  //         status: true,
  //         title: "Failed",
  //         description: _?.response?.errors[0]?.message,
  //       });
  //     },
  //   }
  // );

  const { mutate: deleteMutation } = useMutation(DeleteEmailAndNotification, {
    onSuccess() {
      setSuccess({
        status: true,
        title: "Success",
        description: "Template Deleted Successfully.",
      });
      refetch();
    },
    onError(_: any) {
      if (
        _?.response?.errors?.length &&
        _?.response?.errors[0]?.message === "Not Authorised!"
      )
        HandleLogout();
      setFail({
        status: true,
        title: "Error",
        description: _?.response?.errors[0]?.message,
      });
    },
  });

  const onViewClick = (id: any) => {
    push(
      {
        pathname: "/email-&-notifications/view",
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
        pathname: "/email-&-notifications/edit/",
        // query: { type: "view", id },
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
    deleteMutation({ notifId: id });

    onClose();
  };

  console.log("data", data);
  return (
    <>
      <Alert show={success} theme="success" />
      <Alert show={fail} theme="error" />
      <Core.Modal
        isOpen={isOpen}
        onClose={onClose}
        onClick={confirmAction}
        id={idToDelete}
      />
      <Table
        id="email-&-notifications-listing"
        actionButton={{
          name: "Add Email or Notifications",
          link: "/email-&-notifications/add/",
        }}
        tableData={data}
        columns={columns}
        shadow
        isLoading={isLoading}
        filterBy={["Dates", "EmailAndNotification"]}
        setTableFilters={setTableFilters}
        actions={actions}
        onViewClick={onViewClick}
        onEditClick={onEditClick}
        onDeleteClick={onDeleteClick}
      />
    </>
  );
};

export default EmailOrNotificationsListing;
