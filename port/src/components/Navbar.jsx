import React, { useState } from "react";

function Navbar({ onSearchChange }) {
  const [search, setSearch] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    onSearchChange(value); // ✅ Now this is defined as a prop
  };

  return (
    <div className="navbar bg-base-100 shadow-sm justify-between">
      <h1 className="font-bold text-xl ">Lumicho</h1>
      <div className="flex-1 flex justify-end">
        <label className="input w-1/2">
          <input
            value={search}
            onChange={handleInputChange}
            type="search"
            className="grow"
            placeholder="Search"
          />
        </label>
      </div>
    </div>
  );
}

export default Navbar;