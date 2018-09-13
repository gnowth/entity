import en from './en';

const noLocale = {
  format: {},
  messages: {},
};

const dictionary = {
  en,
};

export default locale => ({
  locale,
  ...(dictionary[locale] || noLocale),
});
