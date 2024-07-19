import React from "react";

interface StyleInputProps {
  style: string;
  setStyle: React.Dispatch<React.SetStateAction<string>>;
}

const StyleInput: React.FC<StyleInputProps> = ({ style, setStyle }) => {
  const handleStyleChange = (e: React.ChangeEvent<HTMLInputElement>) => setStyle(e.target.value);

  return (
    <label className="block mb-2">
      Style URL:
      <input
        type="text"
        value={style}
        onChange={handleStyleChange}
        className="block w-full mt-1 p-1 border rounded"
      />
    </label>
  );
};

export default StyleInput;
