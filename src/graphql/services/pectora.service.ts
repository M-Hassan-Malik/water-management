/* eslint-disable */
import { ObjectId } from "mongoose";
import _ from "../../models/pectora";
import userModel from "../../models/user.model";
import parkModel from "../../models/park.model";
import { AddPectoraAuthInput, PectoraAuth } from "../generated/graphql";
import axios from "axios";

export class PectoraDBService {

  addPectoraAuth = async (payload: AddPectoraAuthInput): Promise<string> => {

    const park = await parkModel.findOne({ locations: { $in: [payload.facilityId] } })
    if (!park) throw new Error(`Could not find Park to this facility`);

    await _.create({ ...payload, parkId: park._id })
      .catch((_) => {
        throw new Error(_.message);
      });

    return "keys Added Successfully"
  };

  getPectoraAuth = async (facilityId: ObjectId): Promise<PectoraAuth> => {

    const result = await _.findOne({ facilityId })
      .catch((_) => {
        throw new Error(_.message);
      }) as unknown as PectoraAuth;

    return result
  };

  getPectoraAndAppUsers = async (facilityId: ObjectId): Promise<string[]> => {

    const pectora = await _.findOne({ facilityId })
      .catch((_) => {
        throw new Error(_.message);
      }) as unknown as IPectora;
    if (!pectora?.X_Auth_Id || !pectora?.X_Auth_Token) throw new Error("Unable to find Pectora Auth");

    const { data, status }: IResponseAPI = await axios.post(
      `${process.env.FRONT_END_URL}/api/pectora/users`,
      {
        x_auth_id: pectora.X_Auth_Id,
        x_auth_token: pectora.X_Auth_Token,
      }
    );
    
    if (!status) throw new Error("Unable to find Pectora Rosters");
      
      const pectoraNames: any[] = data?.data?.data?.flatMap(
        (_: any) => `${_.first_name} ${_.last_name}`
        );
        
        
        const users = await userModel.find({ "company.location": { $in: [facilityId] } },{first_name: 1, last_name: 1})
        .catch((_) => {
          throw new Error(_.message);
        }) as unknown as IUser[];
        
        if(!users.length) throw new Error("Unable to find App Users");
        
        
        const userNames: any[] = users.flatMap(
          (_: any) => `${_.first_name} ${_.last_name}`
          );
          
          
          const overallUsers = userNames.concat(pectoraNames).sort((a: string, b: string) => a.localeCompare(b));
          
          

    return overallUsers;
  };


}
