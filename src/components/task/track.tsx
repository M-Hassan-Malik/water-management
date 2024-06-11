import { useRouter } from "next/router";
import { useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";

import { HandleLogout } from "@/components/auth";
import { EScheduleType } from "@/graphql/generated/graphql";
import { TrackAllTasks } from "@/services/api";

import { Table } from "../core";

const columns = [
  "title",
  "Picked by",
  "assigned To Facility",
  "deadline",
  "action",
];

interface ITrackTask {
  _id: string;
  title: string;
  deadline: Date;
  "Picked by": string;
  "assigned To Facility": string;
}

const actions = {
  view: true,
};
interface ITaskDetailsCardProps {}
const TrackTask: React.FC<ITaskDetailsCardProps> = () => {
  const { push } = useRouter();
  const [tasks, setTasks] = useState<ITrackTask[]>([]);
  const [tableFilters, setTableFilters] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const user: IUser = useSelector((state: any) => state.user.user);

  useQuery(
    ["TrackTaskOfAllMyEmployees", tableFilters],
    () => TrackAllTasks({ creatorId: user._id || "", tableFilters }),
    {
      onSuccess({ trackAllTasks }) {
        const temp: ITrackTask[] = trackAllTasks?.map(
          (_) =>
            ({
              _id: _._id,
              title: _.title,
              deadline:
                _.scheduleType === EScheduleType.Always
                  ? EScheduleType.Always
                  : _.deadline,
              "Picked by": _?.userId
                ? `${_.userId?.first_name} ${_.userId?.last_name}`
                : "",
              "assigned To Facility": _?.assignedToFacilityRef
                ? _.assignedToFacilityRef?.facility
                : "",
            } as ITrackTask)
        );
        setTasks(temp);
        setIsLoading(false);
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

  const onViewClick = (id: any) => {
    push(
      {
        pathname: "/tasks/details",
        query: { id, from: "track" },
      },
      undefined,
      {
        shallow: true,
      }
    );
  };

  return (
    <Table
      id="track-tasks"
      tableData={tasks}
      columns={columns}
      isLoading={isLoading}
      shadow
      filterBy={["Task"]}
      setTableFilters={setTableFilters}
      actions={actions}
      onViewClick={onViewClick}
    />
  );
};

export default TrackTask;
