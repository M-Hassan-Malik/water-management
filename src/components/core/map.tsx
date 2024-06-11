import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

import React, { memo, useEffect } from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";

interface IMapProps {
  handleMapClick?: (event: any) => void;
  selectedPosition: {
    lat: number;
    lng: number;
  };
}

const Map: React.FunctionComponent<IMapProps> = ({
  handleMapClick,
  selectedPosition,
}) => {
  const MapClickHandler = () => {
    const map = useMap();

    useEffect(() => {
      if (selectedPosition) {
        map.setView([selectedPosition.lat, selectedPosition.lng]);
      }
    }, [selectedPosition, map]);

    useMapEvents({
      click: handleMapClick,
    });

    return null;
  };

  return (
    <MapContainer
      center={[selectedPosition.lat, selectedPosition.lng]}
      zoom={12}
      style={{ height: "30vh" }}
    >
      <MapClickHandler />

      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {selectedPosition.lat && selectedPosition.lng && (
        <Marker position={[selectedPosition.lat, selectedPosition.lng]} />
      )}
    </MapContainer>
  );
};

export default memo(Map);
