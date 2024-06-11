import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

import { verifyJWT } from "@/utils/helpers/jwt";

const AuthMiddleware = (handler: NextApiHandler) => {
  return async (request: NextApiRequest, response: NextApiResponse) => {
    try {
      // Your middleware logic here
      const token = request?.headers?.authorization?.split(" ")[1];
      if (!token)
        return response.status(401).json({
          success: false,
          message: "Auth token not found",
        });
      const verified = verifyJWT(token);
      if (!verified)
        return response.status(401).json({
          success: false,
          message: "Not authorized",
        });

      // Call the original API route handler
      return await handler(request, response);
    } catch (error: any) {
      return response.status(500).json({
        success: false,
        message: String(error?.message),
      });
    }
  };
};

export default AuthMiddleware;
