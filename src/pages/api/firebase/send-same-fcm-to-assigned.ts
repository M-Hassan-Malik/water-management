import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const serverKey = process.env.SERVER_KEY;
    const headers = {
      Authorization: `key=${serverKey}`,
      "Content-Type": "application/json",
    };

    const body = req.body as IPayloadFCM;
    const payload: any = {};
    if (body?.data) payload.data = body.data;
    if (body?.link) payload.link = body.link;

    payload.registration_ids = body.to;
    payload.notification = body.notification;

    const response = await axios
      .post("https://fcm.googleapis.com/fcm/send", payload, {
        headers,
      })
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
