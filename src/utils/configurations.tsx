export const formConfigurations: IConfiguration = {
  LOGIN: {
    slug: "sign_in",
    title: "Log in to your account",
    actionText: "Sign in",
    fields: [
      {
        title: "Email",
        slug: "email",
        placeHolder: "Enter your email",
        key: "email",
        type: "email",
        secure: false,
      },
      {
        title: "Password",
        slug: "password",
        placeHolder: "●●●●●●●●●",
        key: "password",
        secure: true,
      },
    ],
  },
  FORGET_PASSWORD: {
    slug: "forgot_password",
    title: "Forgot Password?",
    actionText: "Send OTP",
    fields: [
      {
        title: "Email",
        slug: "email",
        placeHolder: "Enter your email",
        key: "email",
        type: "email",
        secure: false,
      },
    ],
  },
  OTP: {
    slug: "otp",
    title: "Enter OTP.",
    actionText: "Verify",
  },
  NEW_PASSWORD: {
    slug: "new_password",
    title: "New Password",
    actionText: "Set Password",
    fields: [
      {
        title: "New Password",
        slug: "new_password",
        placeHolder: "Enter new password",
        key: "password",
        secure: true,
      },
      {
        title: "Confirm Password",
        slug: "confirm_password",
        placeHolder: "Re-enter same password again.",
        key: "confirm_password",
        secure: true,
      },
    ],
  },
  ADD_SUB_ADMIN: {
    slug: "sign_in",
    title: "Add Client-Admin",
    actionText: "Add User",
    fields: [
      {
        title: "Email",
        slug: "email",
        placeHolder: "Enter your email",
        key: "email",
        type: "email",
        secure: false,
      },
      {
        title: "Password",
        slug: "password",
        placeHolder: "Enter password",
        key: "password",
        secure: true,
      },
      {
        title: "Company Name",
        slug: "company_name",
        placeHolder: "Your Company Name",
        key: "text",
        type: "text",
        secure: false,
      },
      {
        title: "Company Address",
        slug: "company_address",
        placeHolder: "Your Company Address",
        key: "text",
        type: "text",
        secure: false,
      },
    ],
  },
};

export const theme = {
  colors: {
    purple: "#1f3c71",
    lightPurple: "#2F559D",
    orange: "#df7f1b",
    white: "#FFFFFF",
    bg: "#FFFFFF",
  },
};

export const getEnvoirnment = (key: string) => {
  return process.env[key] as string;
};
