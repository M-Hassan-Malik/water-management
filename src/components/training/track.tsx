import { useRouter } from "next/router";

import TrackSingleTraining from "./track_single_training";
import TrackTrainingListing from "./track_trainings_listing";

interface ITrackReportTemplatesProps {}

const TrackTraining: React.FC<ITrackReportTemplatesProps> = () => {
  const { query } = useRouter();
  return <>{query?.id ? <TrackSingleTraining /> : <TrackTrainingListing />}</>;
};

export default TrackTraining;
