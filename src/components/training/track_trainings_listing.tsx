import { useRouter } from "next/router";
import { useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";

import { HandleLogout } from "@/components/auth";
import { GetUserTrainingSession } from "@/services/api";

import { Core } from "..";
import { Alert } from "../core";

const actions = {
  view: true,
};
const TrackTrainingListing: React.FC = () => {
  const columns = ["title", "scheduleType", "action"];
  const { push } = useRouter();
  const [selectedTrainingSession, setSelectedTrainingSession] = useState<
    ITrainingSession[]
  >([]);
  const [fail, setFail] = useState<IAlertSuccessData>();
  const user: IUser = useSelector((state: any) => state.user.user);
  const { isFetching } = useQuery(
    ["getUser'sTrainingSession"],
    () =>
      GetUserTrainingSession({
        getUserTrainingSessionInput: {
          userId: user.company.subAdmin ? user._id || "" : user.belongsTo || "",
        },
      }),
    {
      onSuccess: ({
        getUserTrainingSession,
      }: {
        getUserTrainingSession: ITrainingSession[];
      }) => {
        setSelectedTrainingSession(getUserTrainingSession);
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
          description: "Unable to load User's Training Session!",
        });
      },
      refetchOnMount: true,
    }
  );

  const onViewClick = (_: any) => {
    push(
      {
        pathname: "/trainings/track/",
        query: { id: _ },
      },
      undefined,
      {
        shallow: true,
      }
    );
  };
  return (
    <>
      <Alert show={fail} theme="error" />
      <Core.Table
        id="track-trainings"
        isLoading={isFetching}
        tableData={selectedTrainingSession}
        columns={columns}
        shadow
        actions={actions}
        onViewClick={onViewClick}
      />
    </>
  );
};

export default TrackTrainingListing;
