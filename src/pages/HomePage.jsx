import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import { Controls } from '../components/Controls';
import { List } from '../components/List';
import { Card } from '../components/Card';

import { ALL_COUNTRIES } from '../config';

export const HomePage = ({ countries, setCountries }) => {
  const [filteredCountries, setFilteredCountries] = useState(countries);

  const currentCuntry = useNavigate();

  const handleSearch = (query, region) => {
    let data = [...countries];

    if (region) {
      data = data.filter((c) => c.region.includes(region));
    }

    if (query) {
      data = data.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()));
    }

    setFilteredCountries(data);
  };

  useEffect(() => {
    if (!countries.length) {
      axios.get(ALL_COUNTRIES).then(({ data }) => setCountries(data));
    }
  }, []);

  useEffect(() => {
    handleSearch();
  }, [countries]);

  return (
    <>
      <Controls onSearch={handleSearch} />
      <List>
        {filteredCountries.map((country) => {
          const countryInfo = {
            img: country.flags.png,
            name: country.name,
            info: [
              {
                title: 'Population',
                description: country.population.toLocaleString(),
              },
              {
                title: 'Region',
                description: country.region,
              },
              {
                title: 'Capital',
                description: country.capital,
              },
            ],
          };
          return (
            <Card
              key={country.name}
              onClick={() => currentCuntry(`/country/${country.name}`)}
              {...countryInfo}
            />
          );
        })}
      </List>
    </>
  );
};
