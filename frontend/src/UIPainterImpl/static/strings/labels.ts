const strings = {
  en: {
    buttons: {
      login: "login"
    }
  },
  ar: {
    buttons: {
      login: "تسجيل الدخول"
    }
  }
}

export const getLabels = (lang: string) => strings[lang] ? strings[lang] : strings.en;
