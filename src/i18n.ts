import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import En from "./translations/en/en.json";
import Ru from "./translations/ru/ru.json";
import Uz from "./translations/uz/uz.json";
import Cr from "./translations/cr/cr.json";

const resources = {
  Uz,
  Cr,
  En,
  Ru,
};

export const availableLanguages = Object.keys(resources);

i18n.use(initReactI18next).init({
  resources,
  lng: window.localStorage.i18nextLng,
  defaultNS: "common",
  fallbackLng: "Uz",
});

export default i18n;
