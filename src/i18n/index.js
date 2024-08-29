import { createI18n } from 'vue-i18n'
import ko from './locales/ko.json'
import en from './locales/en.json'
import zh from './locales/zh.json'
import vi from './locales/vi.json'
import ja from './locales/ja.json'
const i18n = createI18n({
    fallbackLocale: "en", 
    locale: localStorage.getItem("localeLang") ?? "en",
    allowComposition: true,
    legacy: false,
    messages:{
        "en": en,
        "ko": ko,
        "zh": zh,
        "vi": vi,
        "ja": ja,
    }
})

export default i18n;