const strings = {
  en: {
    buttons: {
      login: "Login",
      explore: "Explore",
      favorites: "Favorites",
      dashboard: "Dashboard",
      polls: "Polls",
      settings: "Settings",
    }
  },
  ar: {
    buttons: {
      login: "تسجيل الدخول",
      explore: "تصفح",
      favorite: "المفضلة"
    }
  }
}

export const getLabels = (lang: string): typeof strings.en => strings[lang] ? strings[lang] : strings.en;
