import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const serverKey = process.env.SERVER_KEY;
    const headers = {
      Authorization: `key=${serverKey}`,
      "Content-Type": "application/json",
    };

    const notificationPayloads = req.body;

    const response = await axios
      .post(
        "https://fcm.googleapis.com/fcm/send",
        {
          to: notificationPayloads.to,
          notification: notificationPayloads.notification,
        },
        {
          headers,
        }
      )
      .catch((error) => {
        return error;
      });

    const data = await response?.data;
    if (response.status === 200)
      res.status(200).json({
        status: "success",
        message: "success",
        data,
      } as IResponseAPI);
    else
      res.status(400).json({
        status: "failed",
        message: "failed",
        data: null,
      } as IResponseAPI);
  } catch (error: any) {
    res.status(400).json({
      status: "failed",
      message: error.message,
      data: null,
    } as IResponseAPI);
  }
};

export default handler;
