"use client";

import React, { useEffect, useState, useCallback } from "react";
import mapboxgl from "mapbox-gl";
import { ThirdParty } from "../third-party";
import MapSettings from "./MapSetting";
import MapControlsOverlay from "./MapScale";
import SearchOverlay from "./SearchOverlay";

type MapboxGLType = typeof mapboxgl;

const Map: React.FC = () => {
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const [style, setStyle] = useState<string>(
    "mapbox://styles/mapbox/streets-v12"
  );
  const [center, setCenter] = useState<[number, number]>([-74.5, 40]);
  const [zoom, setZoom] = useState<number>(9);
  const [is3D, setIs3D] = useState<boolean>(false);
  const [showLocation, setShowLocation] = useState<boolean>(false);
  const [scale, setScale] = useState<number>(1);
  const [currentLayer, setCurrentLayer] = useState<string>("Streets");
  const layers = ["Streets", "Satellite", "Outdoors"];
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    mapboxgl.accessToken = ThirdParty.MAPBOX_PUBLIC_KEY;
    const initializeMap = ({
      setMap,
      mapboxgl,
    }: {
      setMap: React.Dispatch<React.SetStateAction<mapboxgl.Map | null>>;
      mapboxgl: MapboxGLType;
    }) => {
      const map = new mapboxgl.Map({
        container: "map",
        style: style,
        center: center,
        zoom: zoom,
      });

      map.on("load", () => {
        setMap(map);
        map.on("zoom", () => setZoom(map.getZoom()));
        map.on("styledata", () =>
          setScale(map.getBounds()?.toArray().length || 0)
        );
      });
    };

    if (!map) initializeMap({ setMap, mapboxgl });
    else {
      map.setStyle(style);
      map.setCenter(center);
      map.setZoom(zoom);
    }
  }, [map, style, center, zoom]);

  const zoomIn = useCallback(() => {
    if (map) map.zoomIn();
  }, [map]);

  const zoomOut = useCallback(() => {
    if (map) map.zoomOut();
  }, [map]);

  const toggle3D = useCallback(() => {
    setIs3D((prev) => !prev);
    // Add 3D logic here
  }, []);

  const toggleLocation = useCallback(() => {
    setShowLocation((prev) => !prev);
    // Add location logic here
  }, []);

  const setLayer = useCallback((layer: string) => {
    setCurrentLayer(layer);
    // Update map layer logic here
  }, []);

  const handleSearch = useCallback(
    (query: string) => {
      setSearchQuery(query);
      if (map) {
        map.queryRenderedFeatures().forEach((feature) => {
          if (!feature.properties) {
            return;
          }
          if (
            feature.properties.name &&
            feature.properties.name.includes(query)
          ) {
            //   map.flyTo({ center: feature.geometry.coordinates });
          }
        });
      }
    },
    [map]
  );

  return (
    <main className="h-full w-full relative">
      <div id="map" className="w-full h-full"></div>
      <MapSettings
        style={style}
        setStyle={setStyle}
        center={center}
        setCenter={setCenter}
        zoom={zoom}
        setZoom={setZoom}
      />
      <MapControlsOverlay
        layers={layers}
        currentLayer={currentLayer}
        setLayer={setLayer}
        is3D={is3D}
        toggle3D={toggle3D}
        showLocation={showLocation}
        toggleLocation={toggleLocation}
        zoomIn={zoomIn}
        zoomOut={zoomOut}
        scale={scale}
      />
      <SearchOverlay onSearch={handleSearch} />
    </main>
  );
};

export default Map;
