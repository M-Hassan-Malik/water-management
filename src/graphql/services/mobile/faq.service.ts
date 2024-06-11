/* eslint-disable */
import { ObjectId } from "mongoose";
import FAQModel from "../../../models/faq.model";

export class FAQDBService {
  add = async (data: any): Promise<any> => {
    try {

      let faqData = {
        question: data.faqInput.question,
        answer: data.faqInput.answer,
        status: data.faqInput.status,
      };
      let faqCreated = await FAQModel.create(faqData);
      if (faqCreated) {
        return {
          data: faqCreated,
          message: "Successfully added",
          status: true,
        };
      }
    } catch (e: any) {
      console.log(e.message);
      return {
        data: null,
        message: "Failed to add",
        status: false,
      };
    }
  };
  find = async (status: string): Promise<any> => {
    try {
      let filter = status ? status : {};
      let faqs = await FAQModel.find(filter);

      if (faqs) {
        return {
          data: faqs,
          message: "Successfully fetched",
          status: true,
        };
      }
    } catch (error: any) {
      console.log(error.message);
      return {
        data: null,
        message: "Failed to fetch",
        status: false,
      };
    }
  };
  findOneAndUpdate = async (id: ObjectId, data: any): Promise<any> => {
    try {

      let faqData = {
        ...data,
      };
      let faqUpdate = await FAQModel.updateOne(
        {
          _id: id,
        },
        faqData,
        {
          new: true,
        }
      );
      if (faqUpdate.matchedCount) {
        return {
          data: null,
          message: "Successfully updated",
          status: true,
        };
      }
    } catch (e: any) {
      console.log(e.message);
      return {
        data: null,
        message: "Failed to update",
        status: false,
      };
    }
  };

  deleteFaq = async (id: ObjectId): Promise<any> => {
    try {
      let deletedFaq = await FAQModel.deleteOne({ _id: id });
      if (deletedFaq.deletedCount) {
        return {
          data: null,
          message: "Successfully deleted",
          status: true,
        };
      }
    } catch (e: any) {
      console.log(e.message);
      return {
        data: null,
        message: "Failed to deleted",
        status: false,
      };
    }
  };
}
