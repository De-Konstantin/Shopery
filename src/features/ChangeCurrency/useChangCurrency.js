import { useState, useEffect } from 'react';

const LOCAL_STORAGE_KEY = 'app_currency';

export function useChangeCurrency() {
  const [currency, setCurrency] = useState(() => {
    return localStorage.getItem(LOCAL_STORAGE_KEY) || 'USD';
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, currency);
    // Тут можно добавить обновление цен в приложении или вызов API
  }, [currency]);

  return { currency, setCurrency };
}
