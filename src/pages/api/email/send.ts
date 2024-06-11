import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { to, subject, html } = req.body;
    if (!to || !subject || !html) {
      return res
        .status(400)
        .json({ status: false, message: "Missing required parameters" });
    }

    const emailTo = to.replace(/\s/g, "");
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.NOTIFICATION_EMAIL,
        pass: process.env.NOTIFICATION_PASS,
      },
    });

    const options = {
      from: `"Ellis Docs" ${process.env.NOTIFICATION_EMAIL}`,
      to: emailTo,
      subject,
      html,
    };

    const promise: any = await new Promise((resolve, reject) => {
      transporter.sendMail(options, async (err) => {
        if (err) {
          // eslint-disable-next-line prefer-promise-reject-errors
          reject({ status: false, message: err.message });
        } else {
          resolve({ status: true, message: "" });
        }
      });
    });
    return res.send({ status: promise.status, message: promise.message });
  } catch (error: any) {
    return res.send({
      success: false,
      message: String(error?.message),
    });
  }
};

export default handler;
