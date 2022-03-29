import {
  GoogleMap,
  LoadScript,
  Marker,
  MarkerClusterer,
} from "@react-google-maps/api";
import React, { useState } from "react";

type Location = {
  lat: number;
  lng: number;
  fullname?: string;
};

type Props = {
  positions: Location[];
};

type MapState = {
  currentLocation: Location;
  bounds: google.maps.LatLngBounds | undefined;
};

const containerStyle = {
  width: "100%",
  height: "80vh",
};

const createKey = (location: Location) => {
  return location.lat + location.lng;
};

const calculateCenter = (
  locations: Location[],
  defaultCenter: Location
): Location => {
  if (locations.length === 0) return defaultCenter;
  const lat =
    locations.map((x) => x.lat).reduce((a, b) => a + b, 0) / locations.length;
  const lng =
    locations.map((x) => x.lng).reduce((a, b) => a + b, 0) / locations.length;
  return { lat: lat, lng: lng };
};

const MapElement: React.FC<Props> = ({ positions }) => {
  const [state, setState] = useState<MapState>({
    currentLocation: { lat: 0, lng: 0 },
    bounds: undefined,
  });

  const onMapLoad = (map: google.maps.Map) => {
    navigator
      ? navigator.geolocation.getCurrentPosition(
          ({ coords: { latitude: lat, longitude: lng } }) => {
            const pos = { lat, lng };
            setState({ currentLocation: pos, bounds: state.bounds });
          }
        )
      : alert("this browser not supported to get current location.");
  };

  const apiKey: string = process.env.REACT_APP_GOOGLE_MAP_API_KEY || "";

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={calculateCenter(positions, state.currentLocation)}
        zoom={10}
        onLoad={(map) => onMapLoad(map)}
      >
        <MarkerClusterer averageCenter>
          {(clusterer) =>
            positions.map((location) => (
              <Marker
                key={createKey(location)}
                position={location}
                clusterer={clusterer}
                label={location.fullname}
              />
            ))
          }
        </MarkerClusterer>
      </GoogleMap>
    </LoadScript>
  );
};

export default MapElement;
