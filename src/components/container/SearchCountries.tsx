import { FC } from "react";
import { FaSearch } from "react-icons/fa";
import Select from "react-select";

const SearchCountries: FC<string[]> = (regions) => {
  return (
    <div className="form-group">
      <div className="search">
        <FaSearch className="icon" />
        <input type="search" name="" id="" placeholder="Search for a country" />
      </div>

      <Select />
    </div>
  );
};

export default SearchCountries;