<script setup lang="ts">
const { $t } = useNuxtApp();
import { useInterval } from "@vueuse/core";

definePageMeta({
  layout: "navless",
});

const links: {
  title?: string;
  items: {
    label?: string;
    icon: string;
    to: string;
  }[];
}[] = [
  {
    items: [
      {
        label: "Telegram",
        icon: "i-simple-icons-telegram",
        to: hrefTelegram,
      },
      {
        label: "Email",
        icon: "i-heroicons-envelope",
        to: hrefMail,
      },
      {
        label: "GPG",
        icon: "i-heroicons-lock-closed",
        to: hrefGPG,
      },
    ],
  },
  {
    items: [
      {
        label: "LinkedIn",
        icon: "i-simple-icons-linkedin",
        to: hrefLinkedIn,
      },
      {
        label: "Upwork",
        icon: "i-simple-icons-upwork",
        to: hrefUpwork,
      },
    ],
  },
  {
    items: [
      {
        label: "GitHub",
        icon: "i-simple-icons-github",
        to: hrefGithub,
      },
      {
        label: "Huggingface",
        icon: "i-noto-v1-hugging-face",
        to: hrefHuggingFace,
      },
      {
        label: "Patreon",
        icon: "i-simple-icons-patreon",
        to: hrefPatreon,
      },
    ],
  },
  {
    items: [
      {
        icon: "i-simple-icons-twitter",
        to: hrefTwitter,
      },
      {
        icon: "i-simple-icons-youtube",
        to: hrefYoutube,
      },
      {
        icon: "i-simple-icons-discord",
        to: hrefDiscord,
      },
      {
        icon: "i-simple-icons-instagram",
        to: hrefInstagram,
      },
      {
        icon: "i-simple-icons-threads",
        to: hrefThreads,
      },
      {
        label: $t("simpleIndex.lastwill"),
        icon: "i-heroicons-light-bulb",
        to: hrefLastWill,
      },
    ],
  },
  {
    title: $t("simpleIndex.donation"),
    items: [
      {
        icon: "i-simple-icons-github",
        to: hrefGithubSponsors,
      },
      {
        icon: "i-simple-icons-patreon",
        to: hrefPatreonMembership,
      },
      {
        icon: "i-simple-icons-bitcoin",
        to: hrefBitcoin,
      },
      {
        icon: "i-simple-icons-ethereum",
        to: hrefEthereum,
      },
      {
        icon: "i-simple-icons-opensea",
        to: hrefOpenSea,
      },
    ],
  },
];

const localTimeUpdater = useInterval(1000);
const localTime = ref("");

function updateLocalTime() {
  localTime.value = new Date().toLocaleTimeString("en-US", {
    timeZone: "Asia/Shanghai",
    hour12: true,
    timeStyle: "short",
  });
}

updateLocalTime();

watch(localTimeUpdater, updateLocalTime);
</script>

<template>
  <Head>
    <Title>Yanke Guo</Title>
  </Head>
  <div class="flex flex-col items-center justify-center w-full py-16">
    <img
      class="rounded-full w-32"
      src="~/assets/avatar-pro.jpg"
      alt="photo of me"
    />

    <div class="mt-8 flex flex-row justify-center items-baseline">
      <span class="font-bold text-3xl">Yanke Guo</span>
      <span class="ms-2 text-sm text-slate-600 dark:text-slate-400"
        >({{ $t("simpleIndex.pronouns") }})</span
      >
    </div>

    <div
      class="mb-16 flex flex-row justify-center items-center text-sm text-slate-600 dark:text-slate-400"
    >
      <div class="flex flex-row items-center ms-2">
        <UIcon name="i-heroicons-map-pin"></UIcon>
        <span class="ms-1">{{ $t("intro.location") }}</span>
      </div>

      <div class="flex flex-row items-center ms-2">
        <UIcon name="i-heroicons-clock"></UIcon>
        <span class="ms-1">{{ localTime }}</span>
      </div>
    </div>

    <template v-for="(itemGroup, idx) in links" v-bind:key="idx">
      <div
        v-if="itemGroup.title"
        class="mb-4 flex flex-row justify-center items-center text-orange-500"
      >
        <div class="w-24 border-t border-orange-500"></div>
        <div class="mx-4">{{ itemGroup.title }}</div>
        <div class="w-24 border-t border-orange-500"></div>
      </div>

      <div class="mb-4 flex flex-row justify-center items-center">
        <UButton
          v-for="(item, idx) in itemGroup.items"
          v-bind:key="idx"
          variant="ghost"
          :label="item.label"
          :icon="item.icon"
          :to="item.to"
          target="_blank"
        ></UButton>
      </div>
    </template>
  </div>
</template>
