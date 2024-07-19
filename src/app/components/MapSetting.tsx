import React, { useState, useCallback } from "react";
import StyleInput from "./StyleInput";
import CenterInput from "./CenterInput";
import ZoomInput from "./ZoomInput";

interface MapSettingsProps {
  style: string;
  setStyle: React.Dispatch<React.SetStateAction<string>>;
  center: [number, number];
  setCenter: React.Dispatch<React.SetStateAction<[number, number]>>;
  zoom: number;
  setZoom: React.Dispatch<React.SetStateAction<number>>;
}

const MapSettings: React.FC<MapSettingsProps> = ({ style, setStyle, center, setCenter, zoom, setZoom }) => {
  const [width, setWidth] = useState<number>(300); // Initial width

  const handleMouseDown = (e: React.MouseEvent) => {
    const startX = e.clientX;
    const startWidth = width;

    const handleMouseMove = (e: MouseEvent) => {
      const newWidth = startWidth + e.clientX - startX;
      setWidth(newWidth);
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div
      className="absolute top-0 right-0 p-4 bg-white bg-opacity-90 rounded shadow-md"
      style={{ width }}
    >
      <h2 className="mb-2 font-bold">Map Settings</h2>
      <StyleInput style={style} setStyle={setStyle} />
      <CenterInput center={center} setCenter={setCenter} />
      <ZoomInput zoom={zoom} setZoom={setZoom} />
      <div
        className="absolute top-0 right-0 w-2 h-full cursor-ew-resize"
        onMouseDown={handleMouseDown}
      ></div>
    </div>
  );
};

export default MapSettings;
