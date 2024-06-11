import { getMessaging, getToken } from "firebase/messaging";
import moment from "moment-timezone";

import { app } from "@/services";

// moment.tz.setDefault("Asia/Karachi");

export const convertModuleOperationPermissionsIDsToTitleCase = (
  inputString: string
) => {
  // Replace hyphens with spaces
  const stringWithSpaces = inputString.replace(/-/g, " ");

  // Split the updated string into an array of words
  const words = stringWithSpaces.split(/\./);

  // Capitalize the first letter of each word
  const capitalizedWords = words.map((word) => {
    // Capitalize the first letter of the word
    return word.charAt(0).toUpperCase() + word.slice(1);
  });

  // Join the capitalized words with a space or "→" if there was a period in the original string
  const convertedString = capitalizedWords.join(
    inputString.includes(".") ? " → " : " "
  );

  return convertedString;
};

export const doContainsSpecialCharacters = (str: string) => {
  const regex = /[!@#$%^&*()_+=[\]{};':"\\|,.<>/?]+/;
  return regex.test(str);
};

export const getDefinedPatternedName = (str: string) => {
  // Remove dashes from the beginning and end of the string
  let result = str.replace(/^-+|-+$/g, "");
  // Replace spaces with dashes
  result = result.replace(/ /g, "-");
  // Convert the string to uppercase
  result = result.toUpperCase();
  return result;
};

export const addDaysInDate = (days: number, currentDate: Date): string => {
  return moment(currentDate).add(days, "days").format("MM-DD-YYYY, hh:mm:ss A");
};

export const dateFormat = (days: number, currentDate: Date): string => {
  return moment(currentDate).add(days, "days").format("MM-DD-YYYY");
};

export const formatDateAndTime = (date: Date): string => {
  // return moment(date).subtract(5, "hours").format("MM-DD-YYYY, hh:mm:ss A");
  return moment(date).subtract(5, "hours").format("MM-DD-YYYY, hh:mm A");
};

export const requestNotificationPermission = async (): Promise<string> => {
  try {
    const messaging = getMessaging(app);
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: process.env.VAPID_KEY,
      });

      return token;
    }
    if (permission === "denied") {
      console.log(`Please Enable Browser's Notification Permission`);
    }
    return "";
  } catch (_: any) {
    return "";
  }
};

export const getUniqueNumber = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

export const getUniqueNumberDynamic = () => {
  return Math.floor(Math.random() * 9000000000);
};

export const isImageOrVideoURL = (url: string): string => {
  const lowercaseURL = url.toLowerCase();

  if (
    lowercaseURL.endsWith(".mp4") ||
    lowercaseURL.endsWith(".avi") ||
    lowercaseURL.endsWith(".mov") ||
    lowercaseURL.endsWith(".wmv") ||
    lowercaseURL.endsWith(".flv") ||
    lowercaseURL.endsWith(".mkv") ||
    lowercaseURL.endsWith(".webm") ||
    lowercaseURL.endsWith(".ogg") ||
    lowercaseURL.endsWith(".ogv")
  ) {
    return "video"; // It's a video
  }
  if (
    lowercaseURL.endsWith(".jpg") ||
    lowercaseURL.endsWith(".jpeg") ||
    lowercaseURL.endsWith(".png") ||
    lowercaseURL.endsWith(".gif") ||
    lowercaseURL.endsWith(".bmp") ||
    lowercaseURL.endsWith(".webp") ||
    lowercaseURL.endsWith(".tiff") ||
    lowercaseURL.endsWith(".svg") ||
    lowercaseURL.endsWith(".ico") ||
    lowercaseURL.endsWith(".heif") ||
    lowercaseURL.endsWith(".bat") ||
    lowercaseURL.endsWith(".raw") ||
    lowercaseURL.endsWith(".cr2") ||
    lowercaseURL.endsWith(".nef") ||
    lowercaseURL.endsWith(".orf")
  ) {
    return "image"; // It's an image (JPG or PNG)
  }
  return "unknown"; // It's neither an image nor a video
};

export const getAuthValue = (context: any): string => {
  let token = "";

  const bearer = String(context.req?.headers?.authorization).split(" ")[1];
  const reqCookie = context.req?.headers?.cookie;
  if (reqCookie) {
    // Split the cookie string by '; ' to get individual cookies
    const cookiesArray = reqCookie.split("; ");

    // Create an object to store the cookies
    const cookiesObject: { [key: string]: string } = {};

    // Populate the cookies object with key-value pairs
    cookiesArray.forEach((cookie: any) => {
      const [key, value] = cookie.split("=");
      if (key) cookiesObject[key] = value as string;
    });

    // Get only the "auth" cookie
    const authCookie = cookiesObject.auth as string; // Type assertion here
    if (authCookie) token = authCookie || "";
  }
  if (bearer) token = bearer;

  return token;
};

export const removeCommonObjects = (
  array1: OperationViewPermissions[],
  array2: OperationViewPermissions[]
) => {
  const commonNames = array1.map((obj1) => obj1.name);
  const filteredArray = array2.filter(
    (obj2) => !commonNames.includes(obj2.name)
  );
  return filteredArray;
};

export const evaluateLoggedInUserType = (
  admin: boolean,
  company?: ICompany
): EmployeeType | string => {
  if (admin) return "Super Admin";
  if (company?.subAdmin) return "Client Admin";
  if (company?.employeeType === "SUBADMIN") return "Sub Admin";
  if (company?.employeeType) return company.employeeType;
  return "Super Admin's User";
};
