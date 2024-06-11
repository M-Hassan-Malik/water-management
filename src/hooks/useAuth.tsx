import Router from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";

import { setUser } from "@/redux/user/userReducer";
import { UserById } from "@/services/api";
import { verifyJWT } from "@/utils/helpers/jwt";

enum EmployeeType {
  SUBADMIN = "SUBADMIN",
  MANAGER = "MANAGER",
  LIFEGUARD = "LIFEGUARD",
}

export function useAuth() {
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [cookies] = useCookies(["auth"]);

  const [userId, setUserId] = useState("");

  useQuery("FindUserByIdForAuth", () => UserById({ userByIdId: userId }), {
    onSuccess({ userById: user }) {
      if (user) {
        dispatch(
          setUser({
            _id: user._id,
            active: user.active,
            admin: user.admin,
            themeId: user.themeId || "",
            company: {
              _id: user?.company?._id || "",
              location: user?.company?.location as unknown as IParkLocation[],
              park: {
                _id: user?.company?.park?._id || "",
                logo: "",
                name:
                  user.company && user.company.park && user.company.park.name
                    ? user.company.park.name
                    : "",
                additionalDetails: {},
                locations:
                  user.company &&
                  user.company.park &&
                  user.company.park.locations
                    ? user.company.park.locations.map((item) => {
                        if (!item) {
                          return {
                            active: false,
                            facility: "",
                            address: "",
                            city: "",
                            country: "",
                            GPS: { lat: 0, lng: 0 },
                            state: "",
                            additionalDetails: {},
                          };
                        }
                        return {
                          active: item.active ?? false,
                          address: item.address ?? "",
                          facility: item.facility ?? "",
                          city: item.city ?? "",
                          country: item.country ?? "",
                          state: item.state ?? "",
                          _id: item._id ?? "",
                          GPS: {
                            lat: item.GPS?.lat ?? 0,
                            lng: item.GPS?.lng ?? 0,
                          },
                          additionalDetails: {},
                        };
                      })
                    : [
                        {
                          active: false,
                          address: "",
                          facility: "",
                          city: "",
                          country: "",
                          GPS: { lat: 0, lng: 0 },
                          state: "",
                          additionalDetails: {},
                        },
                      ],
              },
              subAdmin:
                user.company && user.company.subAdmin
                  ? user.company.subAdmin
                  : false,
              employee:
                user.company && user.company.employee
                  ? user.company.employee
                  : false,
              employeeType:
                user.company && user.company.employeeType
                  ? (user.company.employeeType as unknown as EmployeeType)
                  : ("" as EmployeeType),
            },
            email: user.email,
            stripeCustomerId: user.stripeCustomerId,
            first_name: user.first_name,
            last_name: user.last_name,
            modules: user.modules
              ? user.modules.map((module) => ({
                  name: module ? module.name : "",
                  views:
                    module && module.views
                      ? module.views.map((view) => view || "")
                      : [""],
                }))
              : [{ name: "", views: [""] }],
            operations: user.operations
              ? user.operations?.map((operation) => ({
                  name: operation ? operation.name : "",
                  views:
                    operation && operation.views
                      ? operation.views.map((view) => view || "")
                      : [""],
                }))
              : [{ name: "", views: [""] }],
            photo_url: user.photo_url ? user.photo_url : "",
            rec_email: user.rec_email,
            created_by: user?.created_by || "",
            belongsTo: user?.belongsTo || "",
            role: {
              active: user.role ? user.role.active : false,
              name: user.role ? user.role.name : "",
              user_id: user.role ? user.role.user_id : "",
              modules: user.role?.modules
                ? user.role.modules.map((module) => ({
                    name: module ? (module.name as EModules) : ("" as EModules),
                    views:
                      module && module.views
                        ? module.views.map(
                            (view) =>
                              (view as EModuleViews) || ("" as EModuleViews)
                          )
                        : ["" as EModuleViews],
                  }))
                : [{ name: "" as EModules, views: ["" as EModuleViews] }],
              operations: user.role?.operations
                ? user.role.operations.map((operation) => ({
                    name: operation
                      ? (operation.name as EOperations)
                      : ("" as EOperations),
                    views:
                      operation && operation.views
                        ? operation.views.map(
                            (view) =>
                              (view as EOperationViews) ||
                              ("" as EOperationViews)
                          )
                        : ["" as EOperationViews],
                  }))
                : [{ name: "" as EOperations, views: ["" as EOperationViews] }],
            },
            package: user?.package as unknown as IPackage,
            scopes: user.scopes
              ? user.scopes.map((scope) => scope || "")
              : [""],
          })
        );
      }
    },
    enabled: Boolean(userId),
  });

  const getUserData = async (userID: string) => {
    if (userID) {
      setUserId(userID);
    }
  };

  const checkAuthState = useCallback(async () => {
    try {
      const redirectToLogin = () => {
        Router.replace(`/auth/login`);
      };
      if (!cookies?.auth) {
        redirectToLogin();
      } else {
        const verified = verifyJWT(cookies?.auth);
        if (verified) {
          getUserData(verified.id);
        }
      }
    } catch (err: unknown) {
      setError(`${err}`);
    }
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    checkAuthState();
  }, [checkAuthState, dispatch]);

  return [isLoading, error];
}
