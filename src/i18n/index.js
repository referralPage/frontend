import { createI18n } from 'vue-i18n'
import ko from './locales/ko.json'
import en from './locales/en.json'
const i18n = createI18n({
    fallbackLocale: "en", 
    locale: localStorage.getItem("localeLang") ?? "en",
    allowComposition: true,
    legacy: false,
    messages:{
        "en": en,
        "ko": ko,
    }
})

export default i18n;