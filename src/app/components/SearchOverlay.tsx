import React, { useState, ChangeEvent, FormEvent } from "react";

interface SearchOverlayProps {
  onSearch: (query: string) => void;
}

const SearchOverlay: React.FC<SearchOverlayProps> = ({ onSearch }) => {
  const [query, setQuery] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="fixed top-4 left-4 p-4 bg-white bg-opacity-90 rounded shadow-md w-80">
      <h2 className="text-lg mb-2">Search</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search location or address"
          className="w-full p-2 border rounded mb-2"
        />
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchOverlay;
