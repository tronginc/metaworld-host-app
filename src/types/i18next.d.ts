// import the original type declarations
import 'i18next';
// import all namespaces (for the default language, only)
import en from '../i18n/locales/en';

declare module 'i18next' {
  // Extend CustomTypeOptions
  interface CustomTypeOptions {
    // custom resources type
    resources: typeof en;
  }
}
