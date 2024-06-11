import { Box } from "@chakra-ui/react";
import { useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";

import { HandleLogout } from "@/components/auth";
import { Alert, Table } from "@/components/core";
import type { TaskAssigned } from "@/graphql/generated/graphql";
import { GetFailedVAT } from "@/services/api";

interface IAttachToTaskProps {}

const columns = ["title", "detail", "deadline"];

interface IVATList {
  _id: string;
  title: string;
  detail: string;
  deadline: string;
}

const AttachToTask: React.FC<IAttachToTaskProps> = () => {
  const user: IUser = useSelector((state: any) => state.user.user);
  const [fail, setFail] = useState<IAlertSuccessData>();
  const [success] = useState<IAlertSuccessData>();
  const [selectedId, setSelectedId] = useState();
  const [VATs, setVATs] = useState<IVATList[]>();

  const { isFetching } = useQuery(
    ["getFailedVATAttach"],
    () => GetFailedVAT({ facilityId: String(user?.company?.location[0]?._id) }),
    {
      onSuccess: ({ getFailedVAT }) => {
        const data: IVATList[] = getFailedVAT.flatMap((_) => ({
          _id: _.taskAssignedRef._id || "",
          title: _.taskAssignedRef.title || "",
          detail: _.taskAssignedRef.detail || "",
          deadline: _.taskAssignedRef.deadline || "",
        }));

        setVATs(data);
      },
      onError(_: any) {
        if (
          _?.response?.errors?.length &&
          _?.response?.errors[0]?.message === "Not Authorised!"
        )
          HandleLogout();
        setFail({
          status: true,
          title: _.errors[0].code,
          description: _.errors[0].message,
        });
      },
      enabled: Boolean(user?.company?.location[0]?._id),
      refetchOnMount: true,
    }
  );

  return (
    <>
      <Alert show={success} theme="success" />
      <Alert show={fail} theme="error" />
      <Box p={"15px"}>
        <Table
          maxHeight="300px"
          tableData={(VATs as TaskAssigned[]) || []}
          columns={columns}
          shadow
          title={"Remediation Tasks"}
          selectSingleRows={true}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
          isLoading={isFetching}
        />
      </Box>
    </>
  );
};

export default AttachToTask;
