import { useState, useEffect } from 'react';

const LOCAL_STORAGE_KEY = 'app_language';

export function useChangeLanguage() {
  const [language, setLanguage] = useState(() => {
    // Попытка взять язык из localStorage или по умолчанию 'en'
    return localStorage.getItem(LOCAL_STORAGE_KEY) || 'en';
  });

  useEffect(() => {
    // Сохраняем язык в localStorage при изменении
    localStorage.setItem(LOCAL_STORAGE_KEY, language);

    // Тут можно добавить код для интеграции с i18n, например:
    // i18n.changeLanguage(language);
  }, [language]);

  return { language, setLanguage };
}
