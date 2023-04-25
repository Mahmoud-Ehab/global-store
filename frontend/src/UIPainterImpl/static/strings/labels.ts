const strings = {
  en: {
    buttons: {
      login: "login",
      explore: "explore"
    }
  },
  ar: {
    buttons: {
      login: "تسجيل الدخول",
      explore: "تصفح"
    }
  }
}

export const getLabels = (lang: string): typeof strings.en => strings[lang] ? strings[lang] : strings.en;
