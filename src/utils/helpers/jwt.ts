import type { JwtPayload } from "jsonwebtoken";
import { verify } from "jsonwebtoken";

export const verifyJWT = (jwt: string): JwtPayload & IUser => {
  try {
    return verify(jwt, process.env.JWT_SECRET || "") as JwtPayload & IUser;
  } catch (e) {
    console.error("error@: verifyJWT()", e);
    return null as any;
  }
};
