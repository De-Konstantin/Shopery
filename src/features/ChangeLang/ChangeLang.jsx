import Select from '../../components/Select/Select';
import { useChangeLanguage } from './useChangLang';

function ChangeLanguage() {
  const { language, setLanguage } = useChangeLanguage();

  return (
    <Select
      value={language}
      options={[
        { label: 'EN', value: 'en' },
        { label: 'UA', value: 'ua' },
      ]}
      onChange={setLanguage}
    />
  );
}
export default ChangeLanguage;
