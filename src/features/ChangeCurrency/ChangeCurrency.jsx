import React from 'react';

import { useChangeCurrency } from './useChangCurrency';
import Select from '../../components/Select/Select';

const options = [
  { value: 'USD', label: 'USD ' },
  { value: 'EUR', label: 'EUR ' },
  { value: 'UAH', label: 'UAH ' },
];

export default function ChangeCurrency() {
  const { currency, setCurrency } = useChangeCurrency();

  return (
    <Select
      // label="Выберите валюту"
      value={currency}
      options={options}
      onChange={setCurrency}
    />
  );
}
