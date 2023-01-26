import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import {
  FAQ,
  ContactUs,
  PrivacyPolicy,
  RegisterEmail,
  RegisterAnonymous,
  Welcome,
  UserProfile,
  UserDetails,
  Login,
  RegisterPreview,
  RegisterAboutYou,
  RegisterSupport,
  SelectProvider,
  ProviderOverview,
  PlatformRating,
} from "./src/blocks/locales.js";
import {
  FAQ as FAQPage,
  SelectProvider as SelectProviderScreen,
  ProviderOverview as ProviderOverviewScreen,
  PlatformRating as PlatformRatingScreen,
} from "./src/screens/locales.js";

const resources = {
  en: {
    // Blocks
    "contact-us-block": ContactUs.en,
    login: Login.en,
    "privacy-policy": PrivacyPolicy.en,
    welcome: Welcome.en,
    "user-profile": UserProfile.en,
    "user-details": UserDetails.en,
    faq: FAQ.en,
    "register-email": RegisterEmail.en,
    "register-anonymous": RegisterAnonymous.en,
    "register-preview": RegisterPreview.en,
    "register-about-you": RegisterAboutYou.en,
    "register-support": RegisterSupport.en,
    "select-provider": SelectProvider.en,
    "provider-overview": ProviderOverview.en,
    "platform-rating": PlatformRating.en,

    // Screens
    "faq-page": FAQPage.en,
    "select-provider-screen": SelectProviderScreen.en,
    "provider-overview-scren": ProviderOverviewScreen.en,
    "platfrom-rating-screen": PlatformRatingScreen.en,
  },
};

i18n.use(initReactI18next).init({
  compatibilityJSON: "v3",
  resources,
  fallbackLng: "en",
  lng: "en",
});

export default i18n;
