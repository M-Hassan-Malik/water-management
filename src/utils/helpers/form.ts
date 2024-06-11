import { formConfigurations } from "../configurations";

export const getPageFormConfiguration = (page: IPage) => {
  return formConfigurations[page];
};
