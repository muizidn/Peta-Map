import React from "react";

interface ZoomInputProps {
  zoom: number;
  setZoom: React.Dispatch<React.SetStateAction<number>>;
}

const ZoomInput: React.FC<ZoomInputProps> = ({ zoom, setZoom }) => {
  const handleZoomChange = (e: React.ChangeEvent<HTMLInputElement>) => setZoom(Number(e.target.value));

  return (
    <label className="block mb-2">
      Zoom:
      <input
        type="number"
        value={zoom}
        onChange={handleZoomChange}
        className="block w-full mt-1 p-1 border rounded"
      />
    </label>
  );
};

export default ZoomInput;
