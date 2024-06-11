type EOperations = "dashboard";

export type SystemModules = {
  [key in EModules]: GenericModule;
};

export type SystemOperations = {
  [key in EOperations]: GenericOperation;
};

export type ModulesList = {
  [key in EModules]: GenericModule;
};
