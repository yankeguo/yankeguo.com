import { useRequestHeaders } from "#app";
import { extractCookie } from "~/utils/cookie";
import { resolveAcceptLanguage } from "~/utils/resolve-accept-language/resolve-accept-language";

const en = {
  lastwill: "Alive?",
  pronouns: "him",
  donation: "Donation",
  nft: "NFT",
  copyright: "All Rights Reserved",
  location: "Shenzhen, China",
};

const zh: typeof en = {
  lastwill: "存活?",
  pronouns: "他",
  location: "深圳，中国",
  donation: "赞助",
  nft: "NFT",
  copyright: "保留所有权利",
};

const i18nData: {
  langs: Array<string>;
  langNames: Record<string, string>;
  messages: any;
} = {
  langs: ["en-US", "zh-CN"],
  langNames: {
    "en-US": "English",
    "zh-CN": "简体中文",
  },
  messages: { "en-US": en, "zh-CN": zh },
};

const i18nDetectors: Array<() => string | undefined> = [
  function (): string | undefined {
    // server cookie
    const cookie = useRequestHeaders(["cookie"])["cookie"] || "";
    if (cookie) {
      return extractCookie(cookie, "lang");
    }
    return;
  },
  function (): string | undefined {
    // client cookie
    if (typeof window !== "undefined") {
      return extractCookie(window.document.cookie, "lang");
    }
    return;
  },
  function (): string | undefined {
    // server accept-language
    let accept =
      useRequestHeaders(["accept-language"])["accept-language"] || "";
    if (accept) {
      return resolveAcceptLanguage(accept, i18nData.langs, i18nData.langs[0]);
    }
    return;
  },
  function (): string | undefined {
    // client language
    if (typeof window !== "undefined") {
      let accept = window.navigator.languages.join(", ");
      if (accept) {
        return resolveAcceptLanguage(accept, i18nData.langs, i18nData.langs[0]);
      }
    }
    return;
  },
];
export default defineNuxtPlugin((nuxtApp) => {
  let lang = "";

  for (const detector of i18nDetectors) {
    lang = detector() || "";
    if (lang) {
      break;
    }
  }

  if (!lang) {
    lang = i18nData.langs[0];
  }

  let langName = i18nData.langNames[lang];

  return {
    provide: {
      lang,
      langName,
      langs: i18nData.langs,
      langNames: i18nData.langNames,
      t: (key: string): string => {
        const splits = key.split(".");
        // @ts-ignore
        let v = i18nData.messages[lang];
        for (const item of splits) {
          v = v[item];
          if (!v) {
            return "<MISSING: " + key + ">";
          }
        }
        return v;
      },
    },
  };
});
