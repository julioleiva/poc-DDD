import React from "react";

interface SearchComponentProps {
  onSearch: (searchTerm: string) => void;
}

const SearchComponent = ({ onSearch }: SearchComponentProps) => {
  const [input, setInput] = React.useState("");


  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (input.length >= 3 || input.length === 0) {
        onSearch(input);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [input, onSearch]);
  return (
    <div className="p-4">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded"
        placeholder="Buscar..."
      />
    </div>
  );
};

export default SearchComponent;
