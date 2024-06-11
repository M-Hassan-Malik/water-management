/* eslint-disable */
import { ObjectId } from "mongoose";
import _ from "../../models/task.model";
import userModel from "../../models/user.model";
import { TaskInput,TaskUpdateInput } from "../generated/graphql";
export class TaskDBService {

  create = async (payload: TaskInput): Promise<IGenericType> => {
    try {
      const task = await _.create(payload).catch((_) => {
        throw new Error(_.message);
      });

      return {
        status: true,
        message: "Task Created Successfully",
        data: task,
      };
    } catch (_: any) {
      console.log(_.message);
      throw new Error(_);
    }
  };

  updateOne = async ({
    _id,
    ...rest
  }: TaskUpdateInput): Promise<IGenericType> => {
    
    const task = await _.updateOne({ _id }, rest, { upsert: false }).catch(
      (_) => {
        throw new Error(_.message);
      }
    );
    if (!task.matchedCount || !task.modifiedCount)
      throw new Error("Unable to update task");

    return {
      status: true,
      message: "Task Updated Successfully",
      data: task,
    };
  };

  deleteOne = async (taskId: ObjectId): Promise<string> => {
    const deleted = await _.deleteOne({ _id: taskId }).catch((_) => {
      throw new Error(_.message);
    });
    if (!deleted.deletedCount) throw new Error("Unable to Delete Task");

    return "Task Deleted Successfully";
  };

  find = async (id: ObjectId): Promise<ITask[]> => {
    const requestingUser = await userModel.findById(id);
    let match: any = { 
      $or: [
      {createdBy: id.toString()},
      {clientAdminRef: id.toString()},
      ]
    };
    if (requestingUser?.company.employee && requestingUser?.belongsTo) {
      match = {
        $or: [
          { clientAdminRef: requestingUser.belongsTo },
          { createdBy: requestingUser.belongsTo },
        ]
      };
      
      // If employee type is not sub-admin, then get all task from all facilities
      if(requestingUser?.company.employeeType !== EmployeeType.SUBADMIN ) 
      match["facility"] = requestingUser.company.location
    }

    const tasks = await _.find(match).sort({ "createdAt": -1 })
      .populate("createdBy")
      .populate("clientAdminRef") as unknown as ITask[];
    return tasks;
  };

  findById = async (id: string): Promise<ITask> => {
    return (await _.findOne({ _id: id })
      .populate("createdBy")
      .populate("clientAdminRef")) as unknown as Promise<ITask>;
  };
}
