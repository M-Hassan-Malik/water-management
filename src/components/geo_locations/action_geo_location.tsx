import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  SimpleGrid,
} from "@chakra-ui/react";
import { City, Country, State } from "country-state-city";
import { useFormik } from "formik";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";

import { Core } from "@/components";
import { HandleLogout } from "@/components/auth";
import {
  AcceptLocationRequest,
  AddAnotherLocation,
  GetLocationById,
  UpdateFacilityRequest,
} from "@/services/api";

import { addValidationSchema } from "./action_geo_location.validator";

const Map = dynamic(() => import("@/components/core/map"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

interface IActionGeoLocationProps {
  pageType: PageType;
}

const ActionGeoLocation: React.FunctionComponent<IActionGeoLocationProps> = ({
  pageType,
}) => {
  const { replace, query } = useRouter();
  const [success, setSuccess] = useState<IAlertSuccessData>();
  const [fail, setFail] = useState<IAlertSuccessData>();
  const user: IUser = useSelector((state: any) => state.user.user);

  const [prevData, setPrevData] = useState<any>({
    _id: "",
    country: "",
    city: "",
    state: "",
    facility: "",
    address: "",
    GPS: { lat: 33.84870341736182, lng: -117.85884079920385 },
    active: false,
  });

  const {
    mutate: updateFacilityRequestMutation,
    isLoading: updateFacilityRequestLoading,
  } = useMutation(UpdateFacilityRequest, {
    onSuccess: ({ updateFacilityRequest }) => {
      setSuccess({
        status: true,
        title: "Success",
        description: updateFacilityRequest?.message || "",
      });
    },

    onError: (_: any) => {
      setFail({
        status: true,
        title: "Failed",
        description: _?.response?.errors[0]?.message,
      });
    },
  });

  const { mutate: requestLocationMutate, isLoading: requestLocationIsLoading } =
    useMutation(AddAnotherLocation, {
      onSuccess: () => {
        setSuccess({
          status: true,
          title: "Success",
          description: "Facility Requested successfully.",
        });
        setTimeout(() => {
          replace(`/geo-locations/user-locations-listing?id=${user._id}`);
        }, 1000);
      },

      onError: (_: any) => {
        const errorMsg =
          _?.response?.errors[0]?.message || "Unable to add location.";
        setFail({
          status: true,
          title: "Failed",
          description: errorMsg,
        });
      },
    });

  const { mutate: acceptRequestMutate, isLoading: acceptRequestIsLoading } =
    useMutation(AcceptLocationRequest, {
      onSuccess: () => {
        setSuccess({
          status: true,
          title: "Success",
          description: "Facility Request Accepted.",
        });
        setTimeout(() => {
          replace("/geo-locations/requests");
        }, 1000);
      },

      onError: (_: any) => {
        const errorMsg =
          _?.response?.errors[0]?.message || "Unable to  Accepted Request.";
        setFail({
          status: true,
          title: "Failed",
          description: errorMsg,
        });
      },
    });

  const { handleSubmit, handleChange, setFieldValue, values, errors, touched } =
    useFormik<AddGpsLocation>({
      initialValues: {
        country: prevData.country ? prevData.country : "US",
        city: prevData.city ? prevData.city : "Los Angeles",
        state: prevData.state ? prevData.state : "CA",
        facility: prevData.facility ? prevData.facility : "",
        address: prevData.address ? prevData.address : "",
        GPS: prevData.GPS
          ? prevData.GPS
          : { lat: 33.84870341736182, lng: -117.85884079920385 },
      },
      enableReinitialize: true,
      onSubmit: (inputValues) => {
        if (!inputValues.address)
          setFail({
            status: true,
            title: "Warning",
            description: "Please Enter Address",
          });

        if (pageType === "create") {
          requestLocationMutate({
            parkLocationDataInput: {
              _id: user?.company?.park._id,
              city: inputValues.city,
              facility: inputValues.facility,
              GPS: inputValues.GPS,
              address: inputValues.address,
              country: inputValues.country,
              state: inputValues.state,
            },
          });
        } else if (pageType === "edit" && String(query.id)) {
          updateFacilityRequestMutation({
            updateFacilityRequestInput: {
              _id: query.id as string,
              city: inputValues.city,
              facility: inputValues.facility,
              GPS: inputValues.GPS,
              address: inputValues.address,
              country: inputValues.country,
              state: inputValues.state,
            },
          });
        }
      },
      validationSchema: addValidationSchema,
    });

  useQuery(
    ["SpecificPendingLocation"],
    () => GetLocationById({ getLocationByIdId: String(query.id) ?? "" }),
    {
      onSuccess: ({ getLocationById }: { getLocationById: IParkLocation }) => {
        if (getLocationById) {
          setPrevData({
            country: getLocationById.country,
            city: getLocationById.city,
            state: getLocationById.state,
            facility: getLocationById.facility,
            address: getLocationById.address,
            GPS: getLocationById.GPS,
            active: getLocationById.active,
          });
        }
      },
      onError(_: any) {
        if (
          _?.response?.errors?.length &&
          _?.response?.errors[0]?.message === "Not Authorised!"
        )
          HandleLogout();
        setFail({
          status: true,
          title: "Unable to get user",
          description: "Failed to Map User on fields.",
        });
      },
      enabled:
        Boolean(query.id) && (pageType === "view" || pageType === "edit"),
      refetchOnMount: true,
    }
  );

  const acceptRequestHandler = () => {
    if (query.id)
      acceptRequestMutate({ acceptLocationRequestId: String(query.id) });
  };

  const countries = Country.getAllCountries();
  const updatedCountries = countries.map((country) => ({
    label: country.name,
    value: country.isoCode,
    ...country,
  }));

  const updatedStates = (countryId: string) => {
    return State.getStatesOfCountry(countryId).map((state) => ({
      label: state.name,
      value: state.isoCode,
      ...state,
    }));
  };

  const updatedCities = (countryId: string, stateId: string) =>
    City.getCitiesOfState(countryId, stateId).map((city) => ({
      label: city.name,
      value: city.name,
      ...city,
    }));

  const handleMapClick = (event: any) => {
    const { lat, lng } = event.latlng;
    setFieldValue("GPS.lat", lat);
    setFieldValue("GPS.lng", lng);
    setFieldValue("address", `${lat},${lng}`);
  };

  return (
    <>
      <Core.Alert show={success} theme="success" />
      <Core.Alert show={fail} theme="error" />
      {pageType !== "create" && !values.GPS && !values.country ? (
        <Flex
          width={"100%"}
          height={"60vh"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Core.BtnSpinner size="md" />
        </Flex>
      ) : (
        <>
          <SimpleGrid columns={2} spacing={"10px"}>
            <FormControl isDisabled={pageType === "view"}>
              <FormLabel htmlFor="facility" fontWeight={"normal"}>
                Facility
              </FormLabel>
              <Core.Input
                id="facility"
                name="facility"
                placeholder="Enter Facility Name"
                value={values.facility}
                error={errors.facility}
                touched={touched.facility}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl isDisabled={pageType === "view"}>
              <FormLabel htmlFor="country" fontWeight={"normal"}>
                Country
              </FormLabel>
              <Core.Select
                list={updatedCountries}
                id="country"
                name="country"
                placeholder="Country"
                value={values.country}
                error={errors.country}
                touched={touched.country}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl isDisabled={pageType === "view"}>
              <FormLabel htmlFor="state" fontWeight={"normal"}>
                State
              </FormLabel>
              <Core.Select
                list={updatedStates(values.country)}
                id="state"
                name="state"
                placeholder="State"
                value={values.state}
                error={errors.state}
                touched={touched.state}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl isDisabled={pageType === "view"}>
              <FormLabel htmlFor="city" fontWeight={"normal"}>
                City
              </FormLabel>
              <Core.Select
                list={updatedCities(values.country, values.state)}
                id="city"
                name="city"
                placeholder="City"
                value={values.city}
                error={errors.city}
                touched={touched.city}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl isDisabled={pageType === "view"}>
              <FormLabel htmlFor="address" fontWeight={"normal"}>
                Address
              </FormLabel>

              <PlacesAutocomplete
                value={values.address}
                onChange={(address) => setFieldValue("address", address)}
                onSelect={(address) => {
                  setFieldValue("address", address);
                  geocodeByAddress(address)
                    .then((results: Array<any>) => getLatLng(results[0]))
                    .then((latLng) => {
                      setFieldValue("GPS.lat", latLng.lat);
                      setFieldValue("GPS.lng", latLng.lng);
                    })
                    .catch((error) => console.error("Error", error));
                }}
              >
                {({
                  getInputProps,
                  suggestions,
                  getSuggestionItemProps,
                  loading,
                }) => {
                  const cityFilter = values.city; // Replace with the desired city

                  const filteredSuggestions = suggestions.filter((suggestion) =>
                    suggestion.description
                      .toLowerCase()
                      .includes(cityFilter.toLowerCase())
                  );

                  return (
                    <div>
                      <input
                        {...getInputProps({
                          placeholder: "Address",
                          className: "location-search-input",
                          disabled: pageType === "view",
                          style: {
                            width: "100%",
                            padding: "8px 10px",
                            fontSize: "16px",
                            borderWidth: "1px",
                            borderColor: "chakra-border",
                            borderRadius: "5px",
                            backgroundColor: "transparent",
                          },
                        })}
                      />
                      <div className="autocomplete-dropdown-container">
                        {loading && <div>Loading...</div>}
                        {filteredSuggestions.map((suggestion, index) => {
                          const className = suggestion.active
                            ? "suggestion-item--active"
                            : "suggestion-item";
                          // inline style for demonstration purpose
                          const style = suggestion.active
                            ? { backgroundColor: "#fafafa", cursor: "pointer" }
                            : { backgroundColor: "#ffffff", cursor: "pointer" };
                          return (
                            <div
                              {...getSuggestionItemProps(suggestion, {
                                className,
                                style,
                              })}
                              key={index}
                            >
                              <span>{suggestion.description}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                }}
              </PlacesAutocomplete>
            </FormControl>
            <FormControl minHeight={"300px"}>
              {/* <FormLabel htmlFor="GPS" fontWeight={"normal"}>
                Latitude: {values.GPS.lat} <br /> Longitude: {values.GPS.lng}
              </FormLabel> */}
              <Box
                backgroundColor={"gray.200"}
                borderRadius={"10px"}
                overflow={"hidden"}
              >
                <Map
                  handleMapClick={handleMapClick}
                  selectedPosition={values.GPS}
                />
              </Box>
            </FormControl>
          </SimpleGrid>
          {pageType === "create" && (
            <Flex columnGap={"10px"} justifyContent="end">
              <Core.Button
                btnOrangeMd
                type="submit"
                onClick={handleSubmit}
                isLoading={requestLocationIsLoading}
                isDisabled={requestLocationIsLoading}
              >
                Request New Location
              </Core.Button>
            </Flex>
          )}
          {pageType === "edit" && (
            <Flex columnGap={"10px"} justifyContent="end">
              <Core.Button
                btnOrangeMd
                type="submit"
                onClick={handleSubmit}
                isLoading={updateFacilityRequestLoading}
                isDisabled={updateFacilityRequestLoading}
              >
                Request for Update
              </Core.Button>
            </Flex>
          )}
          {pageType === "view" &&
            Boolean(query.id) &&
            !prevData.active &&
            (user.admin || !user?.company?._id) && (
              <Flex columnGap={"10px"} justifyContent="end">
                <Core.Button
                  btnOrangeMd
                  onClick={acceptRequestHandler}
                  isLoading={acceptRequestIsLoading}
                  isDisabled={acceptRequestIsLoading}
                >
                  Accept Request
                </Core.Button>
              </Flex>
            )}
        </>
      )}
    </>
  );
};

export default ActionGeoLocation;
