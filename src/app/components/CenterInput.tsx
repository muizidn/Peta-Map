import React from "react";

interface CenterInputProps {
  center: [number, number];
  setCenter: React.Dispatch<React.SetStateAction<[number, number]>>;
}

const CenterInput: React.FC<CenterInputProps> = ({ center, setCenter }) => {
  const handleCenterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const values = e.target.value.split(",").map(Number);
    setCenter([values[0], values[1]]);
  };

  return (
    <label className="block mb-2">
      Center (lng, lat):
      <input
        type="text"
        value={center.join(",")}
        onChange={handleCenterChange}
        className="block w-full mt-1 p-1 border rounded"
      />
    </label>
  );
};

export default CenterInput;
