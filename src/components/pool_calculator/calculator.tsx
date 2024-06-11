import {
  Box,
  Flex,
  FormControl,
  Table as CharkraTable,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import type { ChangeEvent } from "react";
import { useEffect, useState } from "react";

import { Core } from "..";
import Dropdown from "./dropdown";

interface IChemical {
  reading: number;
  ideal: number;
  chemical: string;
  amountToBeAdded: string;
}

const chlorineOptions: IChlorineOption[] = [
  {
    title: "Increase",
    options: [
      "Chlorine Gas",
      "Calcium HypoChlorite 67%",
      "Calcium HypoChlorite 75%",
      "Sodium HypoChlorite 12% (bleach)",
      "Lithium HypoChlorite 35%",
      "Trichlor 90%",
      "Dichlor 56%",
      "Dichlor 62%",
    ],
  },
  {
    title: "Neutralize",
    options: ["Sodium Thiosulfate (Neutralizer)", "Sodium Sulfite (100%)"],
  },
];
const pHOptions: IpHOption[] = [
  {
    title: "Increase",
    options: [
      "Sodium Carbonate (Soda Ash)",
      "Sodium Hydroxide (50%) (Caustic Soda)",
    ],
  },
  {
    title: "Decrease",
    options: [
      "Muriatic Acid (Hydrochloric Acid)",
      "Sodium Bisulfate (Dry Acid)",
      "Carbon Dioxide",
    ],
  },
];
const totalAlkalinityOptions: IAlkalinityOption[] = [
  {
    title: "Increase",
    options: [
      "Sodium Bicarbonate (Baking Soda)",
      "Sodium Carbonate (Soda Ash)",
      "Sodium Sesquicarbonate",
    ],
  },
  {
    title: "Decrease",
    options: [
      "Muriatic Acid (Hydrochloric Acid)",
      "Sodium Bisulfate (Dry Acid)",
    ],
  },
];
const caHardnessOptions: ICaHardnessOption[] = [
  {
    title: "Increase",
    options: ["Calcium Chloride (100%)", "Calcium Chloride (77%)"],
  },
];
const stabilizerOptions: IStabilizerOption[] = [
  {
    title: "Increase",
    options: ["Cyanuric Acid (Conditioner)", "Dichlor 56%"],
  },
];

const Calculator: React.FC = () => {
  const [success] = useState<IAlertSuccessData>();
  const [fail, setFail] = useState<IAlertSuccessData>();
  const [az_lb, setAz_lb] = useState<number>();
  const [floz_gal, setFloz_gal] = useState<number>();
  const [az_lbCalculated, setAz_lbCalculated] = useState<number>();
  const [floz_galCalculated, setFloz_galCalculated] = useState<number>();
  const [poolVolume, setPoolVolume] = useState<number>(0);

  // Chlorine
  const [chlorineData, setChlorineData] = useState<IChemical>({
    reading: 0,
    ideal: 5,
    chemical: "",
    amountToBeAdded: "",
  });
  // pH
  const [pHData, setPHData] = useState<IChemical>({
    reading: 0,
    ideal: 7.5,
    chemical: "",
    amountToBeAdded: "",
  });
  // Total Alkalinity
  const [alkalinityData, setAlkalinityData] = useState<IChemical>({
    reading: 0,
    ideal: 100,
    chemical: "",
    amountToBeAdded: "",
  });
  // Calcium Hardness
  const [caHardnessData, setCaHardnessData] = useState<IChemical>({
    reading: 0,
    ideal: 300,
    chemical: "",
    amountToBeAdded: "",
  });
  // Stabilizer
  const [stabilizerData, setStabilizerData] = useState<IChemical>({
    reading: 0,
    ideal: 50,
    chemical: "",
    amountToBeAdded: "",
  });

  const handleChangeAZLB = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setAz_lb(Number(value));
    setAz_lbCalculated(Number(value) * 0.0625);
  };
  const handleChangeFLOZGAL = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFloz_gal(Number(value));
    setFloz_galCalculated(Number(value) * 0.0078125);
  };

  const calculateChlorineDosage = ({ chemical, reading, ideal }: IChemical) => {
    const temp = {
      ...chlorineData,
      ideal,
      reading,
      chemical,
    };
    try {
      // Dosage data for different chemicals
      const dosageData: {
        [key in TChlorineOptions]: { dosage: number; unit: string };
      } = {
        // Increase
        "Chlorine Gas": { dosage: 1.3, unit: "ounces" },
        "Calcium HypoChlorite 67%": { dosage: 2.0, unit: "ounces" },
        "Calcium HypoChlorite 75%": { dosage: 1.75, unit: "ounces" },
        "Sodium HypoChlorite 12% (bleach)": {
          dosage: 10.7,
          unit: "fluid ounces",
        },
        "Lithium HypoChlorite 35%": { dosage: 3.8, unit: "ounces" },
        "Trichlor 90%": { dosage: 1.5, unit: "ounces" },
        "Dichlor 56%": { dosage: 2.4, unit: "ounces" },
        "Dichlor 62%": { dosage: 2.1, unit: "ounces" },
        // (Neutralizer)
        "Sodium Thiosulfate (Neutralizer)": { dosage: 2.6, unit: "ounces" },
        "Sodium Sulfite (100%)": { dosage: 2.4, unit: "ounces" },
      };

      // Get the dosage for the specified chemical

      const { dosage, unit } = dosageData[chemical as TChlorineOptions];

      if (!dosage || !unit) {
        setFail({
          title: "Error",
          description: "Chemical not found in dosage data",
          status: true,
        });
        return;
      }
      // Calculate the amount to be added
      const amountToBeAdded = `${Math.abs(
        dosage * (ideal - reading) * (poolVolume / 10000)
      ).toFixed(2)} ${unit}`;
      temp.amountToBeAdded = amountToBeAdded;
    } catch (_) {
      // eslint-disable-next-line no-empty
    } finally {
      setChlorineData(temp);
    }
  };

  const calculatePhDosage = ({ chemical, reading, ideal }: IChemical) => {
    const temp = {
      ...pHData,
      ideal,
      reading,
      chemical,
    };
    try {
      // Dosage data for pH adjustment
      const dosageData: {
        [key in TpHOptions]: { dosage: number; unit: string };
      } = {
        // Increase
        "Sodium Carbonate (Soda Ash)": { dosage: 6.0, unit: "ounces" },
        "Sodium Hydroxide (50%) (Caustic Soda)": {
          dosage: 5.5,
          unit: "fluid ounces",
        },
        // Decrease
        "Muriatic Acid (Hydrochloric Acid)": {
          dosage: 12,
          unit: "fluid ounces",
        },
        "Sodium Bisulfate (Dry Acid)": { dosage: 1.0, unit: "pounds" },
        "Carbon Dioxide": { dosage: 4.0, unit: "ounces" },
      };

      // Get the dosage and unit for the specified chemical
      const { dosage, unit } = dosageData[chemical as TpHOptions];
      if (!dosage || !unit) {
        return;
      }

      // Calculate the amount to be added
      const amountToBeAdded = Math.abs(
        dosage * (ideal - reading) * (poolVolume / 10000 / 0.2)
      );

      // Convert the result to the appropriate unit
      const convertedResult = `${amountToBeAdded.toFixed(2)} ${unit}`;
      temp.amountToBeAdded = convertedResult;
    } catch (_) {
      // eslint-disable-next-line no-empty
    } finally {
      setPHData(temp);
    }
  };

  const calculateAlkalinityDosage = ({
    chemical,
    reading,

    ideal,
  }: IChemical) => {
    const temp = {
      ...alkalinityData,
      ideal,
      reading,
      chemical,
    };
    try {
      // Dosage data for different chemicals
      const dosageData: {
        [key in TAlkalinityOptions]: { dosage: number; unit: string };
      } = {
        // Increase
        "Sodium Carbonate (Soda Ash)": { dosage: 14, unit: "ounces" },
        "Sodium Bicarbonate (Baking Soda)": { dosage: 1.4, unit: "pounds" },
        "Sodium Sesquicarbonate": { dosage: 1.25, unit: "pounds" },
        // Decrease
        "Muriatic Acid (Hydrochloric Acid)": {
          dosage: 26.0,
          unit: "fluid ounces",
        },
        "Sodium Bisulfate (Dry Acid)": { dosage: 2.1, unit: "pounds" },
      };

      // Get the dosage for the specified chemical
      const { dosage, unit } = dosageData[chemical as TAlkalinityOptions];

      if (!dosage || !unit) {
        return;
      }

      // Calculate the amount to be added
      const amountToBeAdded = Math.abs(
        dosage * (ideal - reading) * (poolVolume / 100000)
      );

      // Convert the result to the appropriate unit
      const convertedResult = `${amountToBeAdded.toFixed(2)} ${unit}`;
      temp.amountToBeAdded = convertedResult;
    } catch (_) {
      // eslint-disable-next-line no-empty
    } finally {
      setAlkalinityData(temp);
    }
  };

  const calculateCaHardnessDosage = ({
    chemical,
    reading,
    ideal,
  }: IChemical) => {
    const temp = {
      ...caHardnessData,
      ideal,
      reading,
      chemical,
    };
    try {
      // Dosage data for different calcium hardness chemicals
      const dosageData: {
        [key in TCaHardnessOptions]: { dosage: number; unit: string };
      } = {
        "Calcium Chloride (100%)": { dosage: 0.9, unit: "pounds" },
        "Calcium Chloride (77%)": { dosage: 1.2, unit: "pounds" },
      };

      // Get the dosage for the specified chemical
      const { dosage, unit } = dosageData[chemical as TCaHardnessOptions];

      if (!dosage || !unit) {
        return;
      }

      // Calculate the amount to be added
      const amountToBeAdded = Math.abs(
        dosage * (ideal - reading) * (poolVolume / 100000)
      );

      // Convert the result to the appropriate unit
      const convertedResult = `${amountToBeAdded.toFixed(2)} ${unit}`;
      temp.amountToBeAdded = convertedResult;
    } catch (_) {
      // eslint-disable-next-line no-empty
    } finally {
      setCaHardnessData(temp);
    }
  };

  const calculateStabilizerDosage = ({
    chemical,
    reading,
    ideal,
  }: IChemical) => {
    const temp = {
      ...stabilizerData,
      ideal,
      reading,
      chemical,
    };

    try {
      // Dosage data for different stabilizer chemicals
      const dosageData: {
        [key in TStabilizerOptions]: { dosage: number; unit: string };
      } = {
        "Cyanuric Acid (Conditioner)": { dosage: 13, unit: "ounces" },
        "Dichlor 56%": { dosage: 1.6, unit: "pounds" },
      };

      // Get the dosage for the specified chemical
      const { dosage, unit } = dosageData[chemical as TStabilizerOptions];

      if (!dosage || !unit) {
        return;
      }

      // Calculate the amount to be added
      const amountToBeAdded = Math.abs(
        dosage * (ideal - reading) * (poolVolume / 100000)
      );

      // Convert the result to the appropriate unit
      const convertedResult = `${amountToBeAdded.toFixed(2)} ${unit}`;
      temp.amountToBeAdded = convertedResult;
    } catch (_) {
      // eslint-disable-next-line no-empty
    } finally {
      setStabilizerData(temp);
    }
  };

  const handleChlorineChanges = (
    name: string,
    value: number | string
  ): void => {
    let temp: IChemical = chlorineData;
    switch (name) {
      case "reading":
        temp = { ...chlorineData, reading: Number(value) };
        calculateChlorineDosage(temp);
        break;
      case "ideal":
        temp = { ...chlorineData, ideal: Number(value) };
        calculateChlorineDosage(temp);
        break;
      case "chemical":
        temp = { ...chlorineData, chemical: value as string };
        calculateChlorineDosage(temp);
        break;

      default:
        break;
    }
  };
  const handlePhChanges = (name: string, value: number | string): void => {
    let temp: IChemical = pHData;
    switch (name) {
      case "reading":
        temp = { ...pHData, reading: Number(value) };
        calculatePhDosage(temp);
        break;
      case "ideal":
        temp = { ...pHData, ideal: Number(value) };
        calculatePhDosage(temp);
        break;
      case "chemical":
        temp = { ...pHData, chemical: value as string };
        calculatePhDosage(temp);
        break;

      default:
        break;
    }
  };
  const handleAlkalinityChanges = (
    name: string,
    value: number | string
  ): void => {
    let temp: IChemical = alkalinityData;

    switch (name) {
      case "reading":
        temp = { ...alkalinityData, reading: Number(value) };
        calculateAlkalinityDosage(temp);
        break;
      case "ideal":
        temp = { ...alkalinityData, ideal: Number(value) };
        calculateAlkalinityDosage(temp);
        break;
      case "chemical":
        temp = { ...alkalinityData, chemical: value as string };
        calculateAlkalinityDosage(temp);
        break;

      default:
        break;
    }
  };
  const handleCaHardnessChanges = (
    name: string,
    value: number | string
  ): void => {
    let temp: IChemical = caHardnessData;
    switch (name) {
      case "reading":
        temp = { ...caHardnessData, reading: Number(value) };
        calculateCaHardnessDosage(temp);
        break;
      case "ideal":
        temp = { ...caHardnessData, ideal: Number(value) };
        calculateCaHardnessDosage(temp);
        break;
      case "chemical":
        temp = { ...caHardnessData, chemical: value as string };
        calculateCaHardnessDosage(temp);
        break;

      default:
        break;
    }
  };
  const handleStabilizerChanges = (
    name: string,
    value: number | string
  ): void => {
    let temp: IChemical = stabilizerData;
    switch (name) {
      case "reading":
        temp = { ...stabilizerData, reading: Number(value) };
        calculateStabilizerDosage(temp);
        break;
      case "ideal":
        temp = { ...stabilizerData, ideal: Number(value) };
        calculateStabilizerDosage(temp);
        break;
      case "chemical":
        temp = { ...stabilizerData, chemical: value as string };
        calculateStabilizerDosage(temp);
        break;

      default:
        break;
    }
  };

  const handleDropdownChanges = (data: any): void => {
    const { id, name, value } = data;
    switch (id) {
      case "chlorine":
        handleChlorineChanges(name, value);
        break;
      case "ph":
        handlePhChanges(name, value);
        break;
      case "alkalinity":
        handleAlkalinityChanges(name, value);
        break;
      case "caHardness":
        handleCaHardnessChanges(name, value);
        break;
      case "stabilizer":
        handleStabilizerChanges(name, value);
        break;

      default:
        break;
    }
  };

  const handleChanges = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, name, value } = event.target;
    // const sanitizedValue = parseInt(value).toString();
    // const sanitizedValue = value.replace(/^0+/, '');
    switch (id) {
      case "chlorine":
        handleChlorineChanges(name, value);
        break;
      case "ph":
        handlePhChanges(name, Number(value));
        break;
      case "alkalinity":
        handleAlkalinityChanges(name, Number(value));
        break;
      case "caHardness":
        handleCaHardnessChanges(name, Number(value));
        break;
      case "stabilizer":
        handleStabilizerChanges(name, Number(value));
        break;

      default:
        break;
    }
  };

  const clearAllFields = () => {
    setChlorineData({
      amountToBeAdded: "",
      chemical: "",
      reading: 0,
      ideal: 5,
    });
    setStabilizerData({
      amountToBeAdded: "",
      chemical: "",
      reading: 0,
      ideal: 50,
    });
    setCaHardnessData({
      amountToBeAdded: "",
      chemical: "",
      reading: 0,
      ideal: 300,
    });
    setAlkalinityData({
      amountToBeAdded: "",
      chemical: "",
      reading: 0,
      ideal: 100,
    });
    setPHData({
      amountToBeAdded: "",
      chemical: "",
      reading: 0,
      ideal: 7.5,
    });
  };

  const clearReadings = () => {
    setChlorineData((_) => ({
      amountToBeAdded: _.amountToBeAdded,
      chemical: _.chemical,
      reading: 0,
      ideal: _.ideal,
    }));
    setStabilizerData((_) => ({
      amountToBeAdded: _.amountToBeAdded,
      chemical: _.chemical,
      reading: 0,
      ideal: _.ideal,
    }));
    setCaHardnessData((_) => ({
      amountToBeAdded: _.amountToBeAdded,
      chemical: _.chemical,
      reading: 0,
      ideal: _.ideal,
    }));
    setAlkalinityData((_) => ({
      amountToBeAdded: _.amountToBeAdded,
      chemical: _.chemical,
      reading: 0,
      ideal: _.ideal,
    }));
    setPHData((_) => ({
      amountToBeAdded: _.amountToBeAdded,
      chemical: _.chemical,
      reading: 0,
      ideal: _.ideal,
    }));
  };

  const resetIdeals = () => {
    setChlorineData((_) => ({
      amountToBeAdded: _.amountToBeAdded,
      chemical: _.chemical,
      reading: _.reading,
      ideal: 5,
    }));
    setStabilizerData((_) => ({
      amountToBeAdded: _.amountToBeAdded,
      chemical: _.chemical,
      reading: _.reading,
      ideal: 50,
    }));
    setCaHardnessData((_) => ({
      amountToBeAdded: _.amountToBeAdded,
      chemical: _.chemical,
      reading: _.reading,
      ideal: 300,
    }));
    setAlkalinityData((_) => ({
      amountToBeAdded: _.amountToBeAdded,
      chemical: _.chemical,
      reading: _.reading,
      ideal: 100,
    }));
    setPHData((_) => ({
      amountToBeAdded: _.amountToBeAdded,
      chemical: _.chemical,
      reading: _.reading,
      ideal: 7.5,
    }));
  };

  const clearSelections = () => {
    setChlorineData((_) => ({
      amountToBeAdded: _.amountToBeAdded,
      chemical: "",
      reading: _.reading,
      ideal: _.ideal,
    }));
    setStabilizerData((_) => ({
      amountToBeAdded: _.amountToBeAdded,
      chemical: "",
      reading: _.reading,
      ideal: _.ideal,
    }));
    setCaHardnessData((_) => ({
      amountToBeAdded: _.amountToBeAdded,
      chemical: "",
      reading: _.reading,
      ideal: _.ideal,
    }));
    setAlkalinityData((_) => ({
      amountToBeAdded: _.amountToBeAdded,
      chemical: "",
      reading: _.reading,
      ideal: _.ideal,
    }));
    setPHData((_) => ({
      amountToBeAdded: _.amountToBeAdded,
      chemical: "",
      reading: _.reading,
      ideal: _.ideal,
    }));
  };

  const clearOutputs = () => {
    setChlorineData((_) => ({
      amountToBeAdded: "",
      chemical: _.chemical,
      reading: _.reading,
      ideal: _.ideal,
    }));
    setStabilizerData((_) => ({
      amountToBeAdded: "",
      chemical: _.chemical,
      reading: _.reading,
      ideal: _.ideal,
    }));
    setCaHardnessData((_) => ({
      amountToBeAdded: "",
      chemical: _.chemical,
      reading: _.reading,
      ideal: _.ideal,
    }));
    setAlkalinityData((_) => ({
      amountToBeAdded: "",
      chemical: _.chemical,
      reading: _.reading,
      ideal: _.ideal,
    }));
    setPHData((_) => ({
      amountToBeAdded: "",
      chemical: _.chemical,
      reading: _.reading,
      ideal: _.ideal,
    }));
  };

  useEffect(() => {
    calculateChlorineDosage(chlorineData);
    calculatePhDosage(pHData);
    calculateAlkalinityDosage(alkalinityData);
    calculateCaHardnessDosage(caHardnessData);
    calculateStabilizerDosage(stabilizerData);
  }, [poolVolume]);

  return (
    <Box>
      <Core.Alert show={success} theme="success" />
      <Core.Alert show={fail} theme="error" />
      <Core.FormHeading3 color="textColor" title="Calculate" />
      <Flex columnGap={"10px"} pb="20px" pt="10px">
        <Flex flexDirection={"column"} width="50%" columnGap={"5px"}>
          <Core.H5 display="block" color="textColor" mb="15px">
            Do you know the pool volume (gal.)?
          </Core.H5>
          <FormControl
            width="100%"
            // isInvalid={!!errors.first_name && touched.first_name}
          >
            {/* <FormLabel>Pool Volume</FormLabel> */}
            <Core.Input
              name="pool-volume"
              placeholder="Pool Volume"
              type="number"
              onChange={(_) => {
                _?.target?.value && setPoolVolume(Number(_.target.value));
              }}
              value={poolVolume}
            />
            <Text fontSize="12px" mt="5px">
              If you do not know your pool volume please visit our Basic Pool
              Calculator
            </Text>
          </FormControl>
        </Flex>
        <Flex flexDirection={"column"} width="50%" columnGap={"5px"}>
          <Core.H5 display="block" color="textColor" mb="15px">
            Amount Conversions:
          </Core.H5>
          <Flex columnGap={"10px"}>
            <FormControl>
              <Core.Input
                name="az_arrow_lb"
                placeholder="az → lb"
                type="number"
                onChange={handleChangeAZLB}
              />
              {az_lb && (
                <div>
                  <Text
                    fontSize="14px"
                    mt="15px"
                    pl="20px"
                    borderLeftWidth={"4px"}
                    borderColor={"green.500"}
                  >
                    {`${az_lb} oz. = ${az_lbCalculated} lbs.`}
                  </Text>
                </div>
              )}
            </FormControl>
            <FormControl>
              <Core.Input
                name="az_arrow_lb"
                placeholder="fl oz → gal"
                type="number"
                onChange={handleChangeFLOZGAL}
              />
              {floz_gal && (
                <div>
                  <Text
                    fontSize="14px"
                    mt="15px"
                    pl="20px"
                    borderLeftWidth={"4px"}
                    borderColor={"green.500"}
                  >
                    {`${floz_gal} fl.oz. = ${floz_galCalculated} gal.`}
                  </Text>
                </div>
              )}
            </FormControl>
          </Flex>
        </Flex>
      </Flex>

      <CharkraTable borderRadius={"15px"} overflow={"hidden"}>
        {/* <TableCaption>captionText</TableCaption> */}
        <Thead backgroundColor="white.200">
          <Tr>
            <Th color="textColor" textAlign={"center"} padding="5px"></Th>
            <Th color="textColor" textAlign={"center"} padding="5px">
              Reading
            </Th>
            <Th color="textColor" textAlign={"center"} padding="5px">
              Ideal
            </Th>
            <Th color="textColor" textAlign={"center"} padding="5px">
              Chemical
            </Th>
            <Th color="textColor" textAlign={"center"} padding="5px">
              Amount to be Added
            </Th>
          </Tr>
        </Thead>
        <Tbody backgroundColor="white.500">
          <Tr _hover={{ backgroundColor: "white.100" }}>
            <Td textAlign={"center"}>Chlorine</Td>
            <Td padding="5px">
              <Core.Input
                id="chlorine"
                name="reading"
                backgroundColor={"white.200"}
                placeholder=""
                value={chlorineData.reading}
                type="number"
                onChange={handleChanges}
              />
            </Td>
            <Td padding="5px">
              <Core.Input
                id="chlorine"
                name="ideal"
                backgroundColor={"white.200"}
                placeholder=""
                type="number"
                value={chlorineData.ideal}
                onChange={handleChanges}
              />
            </Td>
            <Td padding="5px">
              <Dropdown
                id="chlorine"
                name="chemical"
                dropdownOptions={chlorineOptions}
                defaultName="Select Chlorine Type"
                setValues={handleDropdownChanges}
              />
            </Td>
            <Td padding="5px">{`${chlorineData.amountToBeAdded}`}</Td>
          </Tr>
          <Tr _hover={{ backgroundColor: "white.100" }}>
            <Td textAlign={"center"}>pH</Td>
            <Td padding="5px">
              <Core.Input
                backgroundColor={"white.200"}
                id="ph"
                name="reading"
                placeholder=""
                type="number"
                value={pHData.reading}
                onChange={handleChanges}
              />
            </Td>
            <Td padding="5px">
              <Core.Input
                backgroundColor={"white.200"}
                id="ph"
                name="ideal"
                placeholder=""
                type="number"
                value={pHData.ideal}
                onChange={handleChanges}
              />
            </Td>
            <Td padding="5px">
              <Dropdown
                id="ph"
                name="chemical"
                dropdownOptions={pHOptions}
                defaultName="Select Ph Type"
                setValues={handleDropdownChanges}
              />
            </Td>
            <Td padding="5px">{pHData.amountToBeAdded}</Td>
          </Tr>
          <Tr _hover={{ backgroundColor: "white.100" }}>
            <Td textAlign={"center"}>Total Alkalinity</Td>
            <Td padding="5px">
              <Core.Input
                backgroundColor={"white.200"}
                id="alkalinity"
                name="reading"
                placeholder=""
                value={alkalinityData.reading}
                type="number"
                onChange={handleChanges}
              />
            </Td>
            <Td padding="5px">
              <Core.Input
                backgroundColor={"white.200"}
                id="alkalinity"
                name="ideal"
                placeholder=""
                type="number"
                value={alkalinityData.ideal}
                onChange={handleChanges}
              />
            </Td>
            <Td padding="5px">
              <Dropdown
                id="alkalinity"
                name="chemical"
                dropdownOptions={totalAlkalinityOptions}
                defaultName="Select Alkalinity Type"
                setValues={handleDropdownChanges}
              />
            </Td>
            <Td padding="5px">{alkalinityData.amountToBeAdded}</Td>
          </Tr>
          <Tr _hover={{ backgroundColor: "white.100" }}>
            <Td textAlign={"center"}>Ca Hardness</Td>
            <Td padding="5px">
              <Core.Input
                backgroundColor={"white.200"}
                id="caHardness"
                name="reading"
                placeholder=""
                value={caHardnessData.reading}
                type="number"
                onChange={handleChanges}
              />
            </Td>
            <Td padding="5px">
              <Core.Input
                backgroundColor={"white.200"}
                id="caHardness"
                name="ideal"
                placeholder=""
                type="number"
                onChange={handleChanges}
                value={caHardnessData.ideal}
              />
            </Td>
            <Td padding="5px">
              <Dropdown
                id="caHardness"
                name="chemical"
                dropdownOptions={caHardnessOptions}
                defaultName="Select Ca Hardness Type"
                setValues={handleDropdownChanges}
              />
            </Td>
            <Td padding="5px">{caHardnessData.amountToBeAdded}</Td>
          </Tr>
          <Tr _hover={{ backgroundColor: "white.100" }}>
            <Td textAlign={"center"}>Stabilizer (Cyanuric Acid)</Td>
            <Td padding="5px">
              <Core.Input
                backgroundColor={"white.200"}
                id="stabilizer"
                name="reading"
                placeholder=""
                value={stabilizerData.reading}
                onChange={handleChanges}
                type="number"
              />
            </Td>
            <Td padding="5px">
              <Core.Input
                backgroundColor={"white.200"}
                id="stabilizer"
                name="ideal"
                placeholder=""
                type="number"
                onChange={handleChanges}
                value={stabilizerData.ideal}
              />
            </Td>
            <Td padding="5px">
              <Dropdown
                id="stabilizer"
                name="chemical"
                dropdownOptions={stabilizerOptions}
                defaultName="Select Stabilizer Type"
                setValues={handleDropdownChanges}
              />
            </Td>
            <Td padding="5px">{stabilizerData.amountToBeAdded}</Td>
          </Tr>
        </Tbody>
        <Tfoot backgroundColor="white.200">
          <Tr>
            <Th p="0 0 10px 0">
              <Core.Button
                btnRed
                display={"block"}
                mt="10px"
                mx="auto"
                whiteSpace="normal"
                onClick={clearAllFields}
              >
                CLEAR ALL FIELDS
              </Core.Button>
            </Th>
            <Th p="0 0 10px 0">
              <Core.Button
                btnBlue
                display={"block"}
                mt="10px"
                mx="auto"
                whiteSpace="normal"
                onClick={clearReadings}
              >
                CLEAR READINGS
              </Core.Button>
            </Th>
            <Th p="0 0 10px 0">
              <Core.Button
                btnBlue
                display={"block"}
                mt="10px"
                mx="auto"
                whiteSpace="normal"
                onClick={resetIdeals}
              >
                RESET IDEALS
              </Core.Button>
            </Th>
            <Th p="0 0 10px 0">
              <Core.Button
                btnBlue
                display={"block"}
                mt="10px"
                mx="auto"
                whiteSpace="normal"
                onClick={clearSelections}
              >
                CLEAR SELECTIONS
              </Core.Button>
            </Th>
            <Th p="0 0 10px 0">
              <Core.Button
                btnBlue
                display={"block"}
                mt="10px"
                mx="auto"
                whiteSpace="normal"
                onClick={clearOutputs}
              >
                CLEAR OUTPUTS
              </Core.Button>
            </Th>
          </Tr>
        </Tfoot>
      </CharkraTable>
    </Box>
  );
};

export default Calculator;
