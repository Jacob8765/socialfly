import React from "react";

import { FaSearch } from "react-icons/fa";

function SearchBar(props) {
  return (
    <form className="bg-white w-[450px] h-12 rounded-lg flex items-center font-montserrat px-4 text-cement-gray outline outline-1 outline-cement-gray my-1">
      <FaSearch />
      <input
        type="text"
        placeholder="Insert your query here..."
        className="mx-3 flex flex-grow outline-none"
      />
    </form>
  );
}

export default SearchBar;
