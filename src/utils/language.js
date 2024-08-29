function changeLang(lang) {
    if (lang === 'KR') {
        return 'ko'
    } else if (lang === 'EN') {
        return 'en'
    } else if (lang === 'CN') {
        return 'zh'
    } else if (lang === 'JP') {
        return 'ja'
    } else if (lang === 'VN') {
        return 'vi'
    }
}

export { changeLang };