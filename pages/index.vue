<script setup lang="ts">
import { useInterval } from "@vueuse/core";
import { hrefAirdrop } from "~/composables/links";

definePageMeta({
  layout: 'fullscreen',
})

const { $t } = useNuxtApp();

type Link = {
  label?: string;
  icon: string;
  to: string;
};

const linksSocial: Link[][] = [
  [
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
  [
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
  [
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
  [
    {
      icon: "i-simple-icons-x",
      label: "X",
      to: hrefTwitter,
    },
    {
      icon: "i-simple-icons-youtube",
      label: "Youtube",
      to: hrefYoutube,
    },
    {
      icon: "i-simple-icons-discord",
      label: "Discord",
      to: hrefDiscord,
    },
    {
      label: $t("lastwill"),
      icon: "i-heroicons-light-bulb",
      to: hrefLastWill,
    },
  ],
];

const linksDonations: Link[][] = [
  [
    {
      icon: "i-simple-icons-wise",
      to: hrefWiseTag,
    },
    {
      icon: "i-simple-icons-github",
      to: hrefGithubSponsors,
    },
    {
      icon: "i-simple-icons-patreon",
      to: hrefPatreonMembership,
    },
    {
      icon: "i-simple-icons-buymeacoffee",
      to: hrefBuymeacoffee,
    },
  ],
  [
    {
      icon: "i-simple-icons-bitcoin",
      to: hrefBitcoin,
    },
    {
      icon: "i-simple-icons-ethereum",
      to: hrefEthereum,
    },
    {
      icon: 'i-simple-icons-solana',
      to: '/solana/actions/donate',
      internal: true,
    }
  ],
];
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-8">
    <div class="flex flex-col items-center justify-center gap-4">
      <template v-for="(group, groupIdx) in linksSocial" v-bind:key="groupIdx">
        <div class="flex flex-row justify-center items-center">
          <UButton v-for="(item, idx) in group" v-bind:key="idx + '.' + groupIdx" variant="ghost" :label="item.label"
            :icon="item.icon" :to="item.to" target="_blank"></UButton>
        </div>
      </template>

      <div class="flex flex-row justify-center items-center">
        <UBadge class="me-2" variant="outline" color="orange">{{
          $t("donation")
        }}</UBadge>
        <template v-for="(itemGroup, idxGroup) in linksDonations">
          <UButton color="orange" v-for="(item, idx) in itemGroup" v-bind:key="idx" size="sm" variant="ghost"
            :label="item.label" :icon="item.icon" :to="item.to" :target="item.internal ? '' : '_blank'"></UButton>
        </template>
      </div>

      <div class="flex flex-row items-center justify-center">
        <UBadge color="lime" variant="outline">NFT</UBadge>
        <UButton color="lime" variant="link" :to="hrefAirdrop" :external="true" target="_blank">
          <img src="~/assets/token-icon.svg" class="w-5" />
          <span>Token of Gratitude by Yanke Guo</span>
        </UButton>
      </div>
    </div>
  </div>
</template>
