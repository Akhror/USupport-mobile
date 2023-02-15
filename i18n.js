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
  SharePlatform,
  NotificationPreferences,
  SOSCenter,
  InformationalPortal,
  GiveSuggestion,
  Articles,
  ArticlesDashboard,
  Consultations,
  ConsultationsDashboard,
  Passcode,
  SafetyFeedback,
  ActivityHistory,
  ForgotPassword,
} from "./src/blocks/locales.js";

import {
  FAQ as FAQPage,
  SelectProvider as SelectProviderScreen,
  ProviderOverview as ProviderOverviewScreen,
  PlatformRating as PlatformRatingScreen,
  SharePlatform as SharePlatformScreen,
  NotificationPreferences as NotificationPreferencesScreen,
  SOSCenter as SOSCenterScreen,
  InformationalPortal as InformationalPortalScreen,
  Articles as ArticlesScreen,
  ArticleInformation,
  Consultations as ConsultationsScreen,
  Dashboard,
  Passcode as PasscodeScreen,
  SafetyFeedback as SafetyFeedbackScreen,
  ForgotPassword as ForgotPasswordScreen,
  Checkout as CheckoutPage,
  Consultation as ConsultationScreen,
} from "./src/screens/locales.js";

import {
  FilterProviders,
  ConfirmConsultation,
  SelectConsultation,
  EditConsultation,
  CancelConsultation,
  JoinConsultation,
  DeleteAccount,
  ChangePassword,
  SelectAvatar,
} from "./src/backdrops/locales.js";

import {
  RequireRegistration,
  RequireDataAgreemant,
} from "./src/modals/locales.js";

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
    "share-platform": SharePlatform.en,
    "notification-preferences": NotificationPreferences.en,
    "sos-center": SOSCenter.en,
    consultations: Consultations.en,
    "consultations-dashboard": ConsultationsDashboard.en,
    passcode: Passcode.en,
    "safety-feedback": SafetyFeedback.en,
    "forgot-password": ForgotPassword.en,
    // "change-passcode": ChangePasscode.en,

    // Screens
    "information-portal": InformationalPortal.en,
    "give-suggestion": GiveSuggestion.en,
    articles: Articles.en,
    "article-information": ArticleInformation.en,
    "articles-dashboard": ArticlesDashboard.en,
    "informational-portal-screen": InformationalPortalScreen.en,
    "articles-screen": ArticlesScreen.en,
    "faq-page": FAQPage.en,
    "select-provider-screen": SelectProviderScreen.en,
    "provider-overview-scren": ProviderOverviewScreen.en,
    "platfrom-rating-screen": PlatformRatingScreen.en,
    "share-platform-screen": SharePlatformScreen.en,
    "notification-preferences-screen": NotificationPreferencesScreen.en,
    "sos-center-screen": SOSCenterScreen.en,
    "consultations-screen": ConsultationsScreen.en,
    dashboard: Dashboard.en,
    "passcode-screen": PasscodeScreen.en,
    "safety-feedback-screen": SafetyFeedbackScreen.en,
    "activity-history": ActivityHistory.en,
    "forgot-password-screen": ForgotPasswordScreen.en,
    // "change-passcode-screen": ChangePasscodeScreen.en,
    "checkout-page": CheckoutPage.en,
    "consultation-page": ConsultationScreen.en,

    // Backdrops
    "filter-providers": FilterProviders.en,
    "confirm-consultation": ConfirmConsultation.en,
    "select-consultation": SelectConsultation.en,
    "edit-consultation": EditConsultation.en,
    "cancel-consultation": CancelConsultation.en,
    "join-consultation": JoinConsultation.en,
    "change-password": ChangePassword.en,
    "delete-account": DeleteAccount.en,
    "select-avatar": SelectAvatar.en,

    // Modals
    "require-registration": RequireRegistration.en,
    "require-data-agreement": RequireDataAgreemant.en,
  },
};

i18n.use(initReactI18next).init({
  compatibilityJSON: "v3",
  resources,
  fallbackLng: "en",
  lng: "en",
});

export default i18n;
