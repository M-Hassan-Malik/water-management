import { Box, useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";

import { Core } from "@/components";
import { HandleLogout } from "@/components/auth";
import { Icons } from "@/components/icons";
import type { FindAllPackagesQuery } from "@/graphql/generated/graphql";
import {
  DeleteSubscriptionPackage,
  FindAllPackages,
  queryClient,
} from "@/services/api";

const actions = {
  edit: true,
  view: true,
  delete: true,
};
interface IAddSubscriptionPackageFormProps {}
const columns = ["title", "duration", "type", "cost", "action"];
const ListSubscriptionPackage: React.FC<
  IAddSubscriptionPackageFormProps
> = () => {
  const [subscriptionPackages, setSubscriptionPackages] =
    useState<FindAllPackagesQuery["findAllPackages"]>();
  const [isLoading, setIsLoading] = useState(true);
  const [success, setSuccess] = useState<IAlertSuccessData>();
  const [fail, setFail] = useState<IAlertSuccessData>();
  const { push } = useRouter();
  const [idToDelete, setIdToDelete] = useState<string>("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  useQuery("listAllSubscriptionPackages", () => FindAllPackages(), {
    onSuccess({ findAllPackages }) {
      setIsLoading(false);
      const temp = findAllPackages.flatMap((x) => ({
        ...x,
        type: x.annual ? "Annual" : "Seasonal",
      }));
      setSubscriptionPackages(temp);
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

  const { mutate } = useMutation(DeleteSubscriptionPackage, {
    onSuccess() {
      setSuccess({
        status: true,
        title: "Success",
        description: "Package successfully deleted.",
      });
      queryClient.invalidateQueries({
        queryKey: ["listAllSubscriptionPackages"],
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

  const statsData = [
    {
      title: "Total Packages",
      number: subscriptionPackages?.length,
      icon: <Icons.GoPackage />,
      // percentage: "32",
      // status: false,
      // type: true,
    },
  ];

  const onEditClick = (id: string) => {
    push(
      {
        pathname: `/subscription/edit`,
        query: { id },
      },
      undefined,
      { shallow: true }
    );
  };

  const onViewClick = (id: string) => {
    push(
      {
        pathname: `/subscription/view`,
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
      deleteSubscriptionPackageId: id,
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
        id="packages-listing"
        actionButton={{
          name: "Add New Package",
          link: "/subscription/add",
        }}
        tableData={subscriptionPackages || []}
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

export default ListSubscriptionPackage;
