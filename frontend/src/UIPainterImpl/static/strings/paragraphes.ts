const strings = {
  en: {
    overview: "GlobalStore is a free open-source application for online shopping, whose only purpose is to connect between customers and vendors / freelancers / service providers.",
  },
  ar: {
    overview: "فارغ",
  }
}

export const getParagraphes = (lang: string): typeof strings.en => strings[lang] ? strings[lang] : strings.en;
