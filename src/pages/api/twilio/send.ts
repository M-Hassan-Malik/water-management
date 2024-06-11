import type { NextApiRequest, NextApiResponse } from "next";
import twilio from "twilio";

const from = "+17605238470";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID as string;
  const token = process.env.TWILIO_AUTH_TOKEN as string;
  const client = twilio(accountSid, token);

  try {
    const { phones, message } = req.body;

    if (!phones || !Array.isArray(phones) || phones.length === 0) {
      throw new Error("Invalid or empty 'phones' array");
    }

    const messagesPromises = phones.map(async (phone: string) => {
      return client.messages.create({
        body: message,
        from,
        to: phone,
      });
    });

    const messages = await Promise.all(messagesPromises);

    res.send({
      success: true,
      data: messages,
    });
  } catch (error: any) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

export default handler;
