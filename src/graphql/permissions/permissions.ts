import { allow, rule, shield } from "graphql-shield";
import { verify } from "jsonwebtoken";

import { getAuthValue } from "@/utils/helpers/functions";

import Service from "../services";

const isAuth = rule()(async (_parent, _args, context) => {
  const token = getAuthValue(context);

  if (token) {
    const verified = verify(token, process.env.JWT_SECRET as string);
    if (typeof verified !== "string") {
      const user = await Service.user.findById(verified.id);
      if (user) {
        return true;
      }
      return false;
    }
    return false;
  }
  return false;
});

export const permissions = shield(
  {
    Query: {
      "*": isAuth, // Apply the "isAuth" rule to all queries except the ones explicitly allowed
      userById: allow,
      findPackageById: allow,
      getClientSecretForSubscriber: allow,
    },
    Mutation: {
      login: allow, // Allow the "login" mutation
      createSuperAdmin: allow,
      resetPassword: allow,
      verifyOtp: allow,
      forgetPassword: allow,
      updateTemporaryPassword: allow,
      updateUserFields: allow,
      registerClient: allow,
      activateSubAdminAfterSubscription: allow,

      "*": isAuth, // Apply the "isAuth" rule to all mutation except the ones explicitly allowed
    },
  },
  { allowExternalErrors: true }
);
