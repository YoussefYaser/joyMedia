import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import tranlate_en from '../json files/en.json'
import tranlate_ar from '../json files/ar.json'


i18n.use(LanguageDetector).use(initReactI18next).init({
    lng: 'en',
    resources: {
        en: {
            translation: tranlate_en
        },
        ar : {
            translation : tranlate_ar
        }
    }
})

