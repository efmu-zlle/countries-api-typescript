import { useEffect, useReducer } from 'react';
import { SelectOption, StateCountries } from '../interfaces/interfaces';
import { getListCountries } from '../lib/api';
import { CountriesContext } from './CountriesContext';
import PromisePool from '@supercharge/promise-pool';
import { CountriesReducer } from './CountriesReducer';

type props = {
  children: JSX.Element | JSX.Element[];
};

const INITIAL_STATE: StateCountries = {
  initialCountries: [],
  isLoading: true,
  isError: false,
  query: '',
  countries: [],
};

export const CountriesProvider = ({ children }: props) => {
  const [state, dispatch] = useReducer(CountriesReducer, INITIAL_STATE);

  async function setListCountries() {
    try {
      const data = await getListCountries();
      const { results } = await PromisePool.withConcurrency(20)
        .for(data)
        .process(async (res) => res);

      dispatch({ type: 'FETCH_COUNTRIES', payload: results });
    } catch (err) {
      dispatch({ type: 'FETCH_ERROR' });
    }
  }

  useEffect(() => {
    setListCountries();
  }, []);

  const options = state.initialCountries.reduce<SelectOption[]>((arr, item) => {
    let found = arr.find((a) => a.label === item.region);
    let id = arr.reduce((acc, _) => acc + 1, 0);

    if (!found) {
      arr.push({
        value: id,
        label: item.region,
      });
    }
    return arr;
  }, []);

  return (
    <CountriesContext.Provider value={{ state, dispatch, options }}>
      {children}
    </CountriesContext.Provider>
  );
};
