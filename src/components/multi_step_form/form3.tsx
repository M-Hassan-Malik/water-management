import { Box, Flex, FormControl, FormLabel, Heading } from "@chakra-ui/react";
import { City, Country, State } from "country-state-city";
import dynamic from "next/dynamic";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

import { Core } from "..";

const Map = dynamic(() => import("@/components/core/map"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

const Form3: React.FunctionComponent<FormPartsProps> = ({
  values,
  errors,
  touched,
  handleChange,
  setFieldValue,
}) => {
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
    setFieldValue("step3.GPS.lat", lat);
    setFieldValue("step3.GPS.lng", lng);
    setFieldValue("step3.address", `${lat},${lng}`);
  };

  return (
    <>
      <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="20px">
        Location Information
      </Heading>
      <Flex gap={2} flexWrap={"wrap"}>
        <FormControl width={"49%"} isRequired>
          <FormLabel htmlFor="facility" fontWeight={"normal"}>
            Facility Name
          </FormLabel>
          <Core.Input
            id="step3.facility"
            name="step3.facility"
            placeholder="Enter Facility Name"
            value={values?.step3?.facility}
            error={errors?.step3?.facility}
            touched={touched?.step3?.facility}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl width={"49%"}>
          <FormLabel htmlFor="country" fontWeight={"normal"}>
            Country
          </FormLabel>
          <Core.Select
            id="country"
            name="step3.country"
            placeholder="Country"
            list={updatedCountries}
            value={values?.step3?.country}
            error={errors?.step3?.country}
            touched={touched?.step3?.country}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl width={"49%"}>
          <FormLabel htmlFor="state" fontWeight={"normal"}>
            State
          </FormLabel>
          <Core.Select
            list={updatedStates(values.step3.country)}
            id="state"
            name="step3.state"
            placeholder="State"
            value={values?.step3?.state}
            error={errors?.step3?.state}
            touched={touched?.step3?.state}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl width={"49%"}>
          <FormLabel htmlFor="city" fontWeight={"normal"}>
            City
          </FormLabel>
          <Core.Select
            id="city"
            list={updatedCities(values.step3.country, values.step3.state)}
            name="step3.city"
            placeholder="City"
            value={values?.step3?.city}
            error={errors?.step3?.city}
            touched={touched?.step3?.city}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl width={"49%"} isRequired>
          <FormLabel htmlFor="address" fontWeight={"normal"}>
            Address
          </FormLabel>
          <p>
            {errors?.step3?.GPS?.lat
              ? errors?.step3?.GPS?.lat
              : "Please provide the complete street address"}
          </p>
          <PlacesAutocomplete
            value={values?.step3?.address}
            onChange={(address) => {
              setFieldValue("step3.address", address);
            }}
            onSelect={(address) => {
              setFieldValue("step3.address", address);
              geocodeByAddress(address)
                .then((results: Array<any>) => getLatLng(results[0]))
                .then((latLng) => {
                  setFieldValue("step3.GPS.lat", latLng.lat);
                  setFieldValue("step3.GPS.lng", latLng.lng);
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
              const cityFilter = values?.step3?.city; // Replace with the desired city

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
                      style: {
                        width: "100%",
                        padding: "8px 10px",
                        fontSize: "16px",
                        borderWidth: "1px",
                        borderColor: "chakra-border",
                        borderRadius: "5px",
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
        {/* <FormControl width={"49%"}>
          <FormLabel htmlFor="address" fontWeight={"normal"}>
            Address
          </FormLabel>
          <Core.Input
            id="address"
            name="step3.address"
            placeholder="Address"
            value={values?.step3?.address}
            error={errors?.address}
            touched={touched?.address}
            onChange={handleChange}
          />
        </FormControl> */}
        <FormControl width={"100%"}>
          <Box
            backgroundColor={"gray.200"}
            borderRadius={"10px"}
            overflow={"hidden"}
          >
            {/* <FormLabel htmlFor="GPS" fontWeight={"normal"}>
            Latitude: {values?.step3?.GPS?.lat} <br /> Longitude:{" "}
            {values?.step3?.GPS?.lng}
          </FormLabel> */}
            <Map
              handleMapClick={handleMapClick}
              selectedPosition={values?.step3?.GPS}
            />
          </Box>
        </FormControl>
      </Flex>
    </>
  );
};

export default Form3;
