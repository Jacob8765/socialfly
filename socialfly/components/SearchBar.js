import React, { useState } from "react";
import { useRouter } from "next/router";

import { FaSearch } from "react-icons/fa";

function SearchBar(props) {
  const [searchInput, setSearchInput] = useState();
  const [sortOrder, setSortOrder] = useState("relevancy");

  let router = useRouter();

  console.log(sortOrder);

  return (
    <form
      className="bg-white w-[450px] h-12 rounded-lg flex items-center font-montserrat px-4 text-[#FC813C] outline outline-1 outline-[#FC813C] my-1"
      onSubmit={(event) => {
        event.preventDefault();
        router.push(`/results/${searchInput}/${sortOrder}`);
      }}
    >
      <FaSearch />
      <input
        onChange={(event) => {
          setSearchInput(event.target.value);
        }}
        type="text"
        placeholder="Enter a username or keywords..."
        className="mx-3 flex flex-grow outline-none text-[#FC813C]"
      />
      <select
        onChange={(event) => {
          setSortOrder(event.target.value);
        }}
      >
        <option value="relevancy">Most Popular</option>
        <option value="recency">Newest</option>
      </select>
    </form>
  );
}

export default SearchBar;
