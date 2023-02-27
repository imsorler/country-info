import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import axios from 'axios';

import { Button } from '../components/Button';

import { IoArrowBack } from 'react-icons/io5';
import { Info } from '../components/Info';

export const Details = () => {
  const [countryInfo, setCountryInfo] = useState(null);
  const { name } = useParams();
  const postCountry = useNavigate();
  const goBack = useNavigate();

  useEffect(() => {
    axios.get(`https://restcountries.com/v2/name/${name}`).then(({ data }) => {
      setCountryInfo(data[0]);
    });
  }, [name]);

  return (
    <div>
      <Button onClick={() => goBack(-1)}>
        <IoArrowBack />
        Back
      </Button>
      {countryInfo && <Info {...countryInfo} />}
    </div>
  );
};
