import { ChangeEvent, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useCountries } from '../../hooks/useCountries';
import { SelectOption } from '../../interfaces/interfaces';
import { getCountriesByRegion } from '../../lib/api';
import Select from '../Select';

function Search() {
  const { dispatch, query, options } = useCountries();
  const [value, setValue] = useState<SelectOption | undefined>();

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(undefined);
    dispatch({ type: 'SEARCH_COUNTRIES', payload: e.target.value });
  };

  const handleFilter = async (option: SelectOption) => {
    const data = await getCountriesByRegion(option?.label);

    dispatch({ type: 'FILTER_BY_REGION', payload: data });
  };

  return (
    <div className="form-group">
      <div className="search">
        <FaSearch className="icon" />
        <input
          type="search"
          value={query}
          placeholder="Search for a country"
          onChange={handleSearch}
        />
      </div>

      <Select
        value={value}
        onChange={(o) => {
          handleFilter(o!);
          setValue(o);
        }}
        options={options}
      />
    </div>
  );
}

export default Search;
