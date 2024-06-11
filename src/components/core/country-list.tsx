import { Box, FormControl, FormLabel, Select } from "@chakra-ui/react";
import React, { useState } from "react";

interface Country {
  name: string;
  cities: string[];
}

// interface State {
//   name: string;
//   zipCodes: string[];
// }

const countries: Country[] = [
  {
    name: "USA",
    cities: ["New York", "Los Angeles", "Chicago"],
  },
  {
    name: "Canada",
    cities: ["Toronto", "Vancouver", "Montreal"],
  },
  // Add more countries with their respective cities here
];

const CountrySelector: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedZipCode, setSelectedZipCode] = useState<string>("");

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCountryHandle = event.target.value;
    setSelectedCountry(selectedCountryHandle);
    setSelectedCity("");
    setSelectedState("");
    setSelectedZipCode("");
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCityHandle = event.target.value;
    setSelectedCity(selectedCityHandle);
    setSelectedState("");
    setSelectedZipCode("");
  };

  const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedStateHandle = event.target.value;
    setSelectedState(selectedStateHandle);
    setSelectedZipCode("");
  };

  const handleZipCodeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedZipCodeHandle = event.target.value;
    setSelectedZipCode(selectedZipCodeHandle);
  };

  const countryOptions = countries.map((country) => (
    <option key={country.name} value={country.name}>
      {country.name}
    </option>
  ));

  const cityOptions = selectedCountry
    ? countries
        .find((country) => country.name === selectedCountry)
        ?.cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))
    : null;

  const stateOptions = selectedCity ? (
    <option value="State 1">State 1</option>
  ) : // Add more state options based on the selected city
  null;

  const zipCodeOptions = selectedState ? (
    <option value="Zip Code 1">Zip Code 1</option>
  ) : // Add more zip code options based on the selected state
  null;

  return (
    <Box>
      <FormControl>
        <FormLabel htmlFor="country">Country:</FormLabel>
        <Select
          id="country"
          value={selectedCountry}
          onChange={handleCountryChange}
        >
          <option value="">Select Country</option>
          {countryOptions}
        </Select>
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="city">City:</FormLabel>
        <Select
          id="city"
          value={selectedCity}
          onChange={handleCityChange}
          disabled={!selectedCountry}
        >
          <option value="">Select City</option>
          {cityOptions}
        </Select>
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="state">State:</FormLabel>
        <Select
          id="state"
          value={selectedState}
          onChange={handleStateChange}
          disabled={!selectedCity}
        >
          <option value="">Select State</option>
          {stateOptions}
        </Select>
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="zipCode">Zip Code:</FormLabel>
        <Select
          id="zipCode"
          value={selectedZipCode}
          onChange={handleZipCodeChange}
          disabled={!selectedState}
        >
          <option value="">Select Zip Code</option>
          {zipCodeOptions}
        </Select>
      </FormControl>
    </Box>
  );
};

export default CountrySelector;
