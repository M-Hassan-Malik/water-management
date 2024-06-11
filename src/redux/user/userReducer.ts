/* eslint-disable */

import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import {
  IStateEmailAndNotification,
  IStateUser,
  IStorage,
  EmployeeType,
} from "./types";
import { DiscountType, ESubscriptionStatus } from "./types";

interface UserReducerState {
  user: IStateUser;
  emailAndNotification: IStateEmailAndNotification[];
  clientAdmins: any;
  storage: IStorage | undefined;
}

export const initialState: UserReducerState = {
  user: {
    _id: "",
    active: false,
    admin: false,
    company: {
      location: [
        {
          _id: "",
          additionalDetails: {},
          address: "",
          facility: "",
          city: "",
          GPS: { lat: 0.0, lng: 0.0 },
          state: "",
          country: "",
          active: false,
        },
      ],
      park: {
        additionalDetails: {},
        locations: [
          {
            _id: "",
            additionalDetails: {},
            address: "",
            facility: "",
            city: "",
            GPS: { lat: 0.0, lng: 0.0 },
            state: "",
            country: "",
            active: false,
          },
        ],
        logo: "",
        name: "",
        _id: "",
      },
      subAdmin: false,
      employee: false,
      employeeType: EmployeeType.SUBADMIN as any,
      _id: "",
    },
    email: "",
    stripeCustomerId: "",
    first_name: "",
    last_name: "",
    deviceToken: "",
    modules: [{ name: "", views: [""] }],
    operations: [{ name: "", views: [""] }],
    package: {
      _id: "",
      active: false,
      annual: false,
      compare_at: 0,
      packageRef: "",
      ref: "",
      cost: 0,
      sizeInGB: 0,
      description: "",
      discount: 0,
      status: ESubscriptionStatus.SUBSCRIBED,
      discount_type: DiscountType.FIXED,
      paymentDetail: {
        amount: 0,
        method: ""
      },
      duration: 0,
      modules: [],
      number_of_users: 0,
      paid: false,
      title: "",
    },
    belongsTo: "",
    phone: {
      code: "",
      phoneNo: "",
      _id: "",
    },
    photo_url: "",
    rec_email: "",
    role: {
      active: false,
      modules: [],
      name: "",
      operations: [],
      _id: "",
      user_id: "",
    },
    themeId: "",
    scopes: [""],
  },
  emailAndNotification: [],
  storage: undefined,  // in MBs || undefined when not set for First time,
  clientAdmins: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IStateUser>) => {
      state.user = action.payload;
    },
    setStorage: (state, action: PayloadAction<IStorage>) => {
      state.storage = action.payload;
    },
    setEmailAndNotification: (
      state,
      action: PayloadAction<IStateEmailAndNotification[]>
    ) => {
      state.emailAndNotification = action.payload;
    },
    setClientAdmins: (state, action: PayloadAction<any[]>) => {
      state.clientAdmins = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export const { setEmailAndNotification } = userSlice.actions;
export const { setStorage } = userSlice.actions;
export const { setClientAdmins } = userSlice.actions;
export const userReducer = userSlice.reducer;
