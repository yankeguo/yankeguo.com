import { useRequestHeaders } from "#app";
import { extractCookie } from "~/utils/cookie";
import resolveAcceptLanguage from "resolve-accept-language";

const en = {
  loading: "Loading...",
  simpleIndex: {
    lastwill: "Alive?",
    pronouns: "him",
    donation: "donation",
    vault: "vault",
  },
  intro: {
    location: "Shenzhen, China",
    membership: "Membership",
    membershipDesc: "Sign in to access exclusive contents",
  },
  nav: {
    external: "external",
  },
  title: {
    posts: "Posts",
    claude: "Claude",
    about: "About",
    donation: "Donation",
    utilities: "Utilities",
    nft: "NFT",
    vault: "Vault",
  },
  tier: {
    mo: "mo",
    no: "No Tier",
    bronze: "Bronze Tier",
    silver: "Silver Tier",
    gold: "Gold Tier",
    admin: "ADMIN",
  },
  button: {
    signIn: "Sign in",
    signOut: "Sign out",
    close: "Close",
  },
  authCallback: {
    waiting: "Please wait while we are signing you in...",
  },
  claude: {
    title: {
      conversation: "conversation",
      new_conversation: "new conversation",
    },
    conversation: "Conversation",
    new_conversation: "New Conversation",
    intro_1:
      "Claude is an AI assistant created by Anthropic, an AI safety startup based in San Francisco.",
    intro_2:
      "This website wraps the Claude Slack API, allowing users to use it directly.",
    warning: "WARNING",
    warningContent: "Please do not enter any private or sensitive information",
    typeHere: "Type here...",
    you: "You",
    submit: "Submit",
    reset: "Reset",
    not_available: "Claude is not available due to official restrictions",
  },
  roleGuard: {
    noPaidRequired: "No paid membership required, ",
    orAbove: "or above",
    requires: "Requires",
    hereToSignIn: "click here to sign in",
    toContinue: "and continue",
  },
  post: {
    attachments: "Attachments",
  },
  posts: {
    title: {
      posts: "posts",
    },
    posts: "Posts",
    noPosts: "No post entries found",
  },
  about: {
    title: {
      about: "about",
    },
    contact: "Contact",
    gpg: "GPG",
    links: "Links",
    lastWill: "Still alive?",
  },
  donation: {
    title: {
      donation: "donation",
    },
    donation: "Donation",
    crypto: "Cryptocurrency",
  },
  signIn: {
    title: "sign in",
    signIn: "Sign In",
    membershipDesc: "Sign in to access members-only contents",
    ethereumDesc: "Sign in to access NFT benifits",
    checkEthereum: "Checking Browser Ethereum Wallet Extension...",
    toContinue: "Sign in to continue to",
    github: "Sign in with GitHub",
    patreon: "Sign in with Patreon",
    ethereum: "Sign in with Ethereum",
    noEthereumWallet: "No browser wallet extension detected",
  },
  signOut: {
    title: "sign out",
    signOut: "Sign out",
    confirm: "Are you sure you want to sign out?",
  },
  privacy: {
    title: "privacy policy",
    privacyPolicy: "Privacy policy",
    wip: "Working in Progress",
    row_1_t: "Ownership",
    row_1: "This website is owned by Yanke Guo personally",
    row_2_t: "Personal data collected directly by this website",
    row_2:
      "While logging in, this website collects GitHub user ID, Patreon user ID or Ethereum address to confirm whether the user is entitled to Sponsorship benefits. In addition, this website does not directly collect any other user information.",
    row_3_t: "Personal data collected by 3rd party services",
    row_3:
      "This website uses Google Analytics to analyze user browsing behavior and Google AdSense to serve advertisements.",
    row_3_r: "You can opt out of personalized advertising by visiting:",
  },
  copyright: "all rights reserved",
  nft: {
    title: {
      nft: "NFT",
    },
    noItems: "No NFT items found",
    notice: {
      signin: "Please sign in with Ethereum",
      delay: "NFT data update has 5 minutes delay",
      buy: "Buy NFT on OpenSea",
    },
    unlockableTitle: "Bonus Content",
    showUnlockable: "Show Bonus Content",
  },
};

const zh: typeof en = {
  loading: "正在加载...",
  simpleIndex: {
    lastwill: "存活?",
    pronouns: "他",
    donation: "赞助",
    vault: "保管箱",
  },
  nav: {
    external: "外部",
  },
  intro: {
    location: "深圳，中国",
    membership: "会员",
    membershipDesc: "登录后可以访问专享内容",
  },
  title: {
    posts: "博客",
    claude: "Claude",
    about: "关于",
    donation: "捐赠",
    utilities: "工具箱",
    nft: "NFT",
    vault: "保管箱",
  },
  tier: {
    mo: "月",
    no: "没有等级",
    bronze: "铜牌会员",
    silver: "银牌会员",
    gold: "金牌会员",
    admin: "管理员",
  },
  button: {
    signIn: "登录",
    signOut: "退出登录",
    close: "关闭",
  },
  authCallback: {
    waiting: "稍等，正在登录...",
  },
  claude: {
    title: {
      conversation: "会话",
      new_conversation: "新会话",
    },
    conversation: "会话",
    new_conversation: "新会话",
    intro_1:
      "Claude 是 Anthropic 创建的 AI 助手，Anthropic 是一家位于旧金山的 AI 安全初创公司。",
    intro_2: "本网站封装了 Slack API，让用户可以直接和 Claude 对话。",
    warning: "警告",
    warningContent: "请勿输入隐私或敏感信息",
    typeHere: "在此输入...",
    you: "用户",
    submit: "提交",
    reset: "重置",
    not_available: "由于官方限制，Claude 无法继续使用",
  },
  roleGuard: {
    noPaidRequired: "无需付费会员，",
    orAbove: "或更高等级",
    requires: "需要",
    hereToSignIn: "点击此处登录",
    toContinue: "后继续",
  },
  post: {
    attachments: "附件",
  },
  posts: {
    title: {
      posts: "博客",
    },
    posts: "博客",
    noPosts: "没有找到条目",
  },
  about: {
    title: {
      about: "关于",
    },
    contact: "联系我",
    gpg: "GPG",
    links: "链接",
    lastWill: "存活?",
  },
  donation: {
    title: {
      donation: "捐赠",
    },
    donation: "捐赠",
    crypto: "加密货币",
  },
  signIn: {
    title: "登录",
    signIn: "登录",
    membershipDesc: "登录后可以访问会员专享内容",
    ethereumDesc: "登录后可以访问 NFT 特权",
    toContinue: "登录后继续访问",
    github: "使用 Github 登录",
    patreon: "使用 Patreon 登录",
    ethereum: "使用 以太坊 登录",
    noEthereumWallet: "没有检测到浏览器钱包扩展",
    checkEthereum: "正在检查以太坊浏览器钱包扩展...",
  },
  signOut: {
    title: "退出登录",
    signOut: "退出登录",
    confirm: "确定要退出登录么?",
  },
  privacy: {
    title: "隐私策略",
    privacyPolicy: "隐私策略",
    wip: "修订中",
    row_1_t: "所有权",
    row_1: "本网站由 Yanke Guo 个人所有",
    row_2_t: "本网站直接收集的个人信息",
    row_2:
      "登录会员时，本网站会读取 GitHub 用户 ID, Patreon 用户 ID 或者 以太坊地址，确认用户是否享有会员权利。除此之外，本网站不会直接收集其他个人信息。",
    row_3_t: "本网站接入的第三方服务收集的个人信息",
    row_3:
      "本网站使用 Google Analytics 分析用户行为，并使用 Google AdSense 广告服务",
    row_3_r: "你可以在此页面关闭个性化广告服务:",
  },
  copyright: "保留所有权利",
  nft: {
    title: {
      nft: "NFT",
    },
    noItems: "没有找到持有的 NFT",
    notice: {
      signin: "请使用 以太坊 登录后查看本页面",
      delay: "NFT 数据更新会有 5 分钟延时",
      buy: "前往 OpenSea 购买",
    },
    unlockableTitle: "奖励内容",
    showUnlockable: "显示奖励内容",
  },
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
