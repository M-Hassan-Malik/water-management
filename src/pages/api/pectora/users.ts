import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (_: NextApiRequest, res: NextApiResponse) => {
  try {
    const headers = {
      "X-Auth-Id": _.body.x_auth_id,
      "X-Auth-Token": _.body.x_auth_token,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept",
    };

    const response = await axios
      .get("https://app.pectora.com/api/v1/users", {
        headers,
      })
      .catch((error) => {
        console.log("error11", error.message);
        return error;
      });
    const data = await response?.data;

    if (response.status === 200)
      return res.status(200).json({
        status: "success",
        message: "success",
        data,
      } as IResponseAPI);
    return res.status(400).json({
      status: "failed",
      message: "failed",
      data: null,
    } as IResponseAPI);
  } catch (error: any) {
    return res.status(400).json({
      status: "failed",
      message: error.message,
      data: null,
    } as IResponseAPI);
  }
};

export default handler;
