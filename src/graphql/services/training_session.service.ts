/* eslint-disable */
import _ from "@/models/training_session.model";
import { ObjectId } from "mongoose";
export class TrainingSessionDBService {

  getUserTrainingSession = async ({ userId }: IGetUserTrainingSessionInput): Promise<ITrainingSession[]> => {
    
    const trainingSessions = await _.find({ authority: userId }).sort({ "createdAt": -1 }).populate('userRef').populate('trainingRef')
      .catch((_) => {
        throw new Error(_.message)

      }) as unknown as ITrainingSession[]
    
    return trainingSessions
  };
 
  findById = async (taskId: ObjectId): Promise<ITrainingSession> => {
    
    const trainingSessions = await _.findById(taskId).populate('userRef').populate('trainingRef')
      .catch((_) => {
        throw new Error(_.message)

      }) as unknown as ITrainingSession
    
    return trainingSessions
  };

}
