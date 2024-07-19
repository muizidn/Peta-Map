import React, { useState } from "react";

interface MapControlsOverlayProps {
  layers: string[];
  currentLayer: string;
  setLayer: (layer: string) => void;
  is3D: boolean;
  toggle3D: () => void;
  showLocation: boolean;
  toggleLocation: () => void;
  zoomIn: () => void;
  zoomOut: () => void;
  scale: number;
}

const MapControlsOverlay: React.FC<MapControlsOverlayProps> = ({
  layers,
  currentLayer,
  setLayer,
  is3D,
  toggle3D,
  showLocation,
  toggleLocation,
  zoomIn,
  zoomOut,
  scale,
}) => {
  return (
    <div className="fixed bottom-4 right-4 p-4 bg-white bg-opacity-90 rounded shadow-md">
      <div className="mb-4">
        <h3 className="text-lg mb-2">Map Controls</h3>
        <div className="mb-2">
          <label className="block mb-1">Map Layer:</label>
          <select
            value={currentLayer}
            onChange={(e) => setLayer(e.target.value)}
            className="block w-full p-1 border rounded"
          >
            {layers.map((layer) => (
              <option key={layer} value={layer}>
                {layer}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center mb-2">
          <label className="mr-2">3D View:</label>
          <input
            type="checkbox"
            checked={is3D}
            onChange={toggle3D}
            className="ml-2"
          />
        </div>
        <div className="flex items-center mb-2">
          <label className="mr-2">Current Location:</label>
          <input
            type="checkbox"
            checked={showLocation}
            onChange={toggleLocation}
            className="ml-2"
          />
        </div>
        <div className="flex items-center mb-2">
          <button
            onClick={zoomOut}
            className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded shadow"
          >
            -
          </button>
          <span className="mx-2">Zoom</span>
          <button
            onClick={zoomIn}
            className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded shadow"
          >
            +
          </button>
        </div>
        <div>
          <p className="text-sm">Scale: {scale}</p>
        </div>
      </div>
    </div>
  );
};

export default MapControlsOverlay;
