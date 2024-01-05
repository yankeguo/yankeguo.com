<script setup lang="ts">
import { useInterval } from "@vueuse/core";

definePageMeta({
  layout: "navless",
});

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
  <div class="flex flex-col items-center justify-center w-full pt-24">
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
      class="mt-4 flex flex-row justify-center items-center text-sm text-slate-600 dark:text-slate-400"
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

    <div class="mt-12 flex flex-row justify-center items-center">
      <UButton
        variant="ghost"
        label="Telegram"
        icon="i-simple-icons-telegram"
        :to="hrefTelegram"
      ></UButton>

      <UButton
        variant="ghost"
        label="Email"
        icon="i-heroicons-envelope"
        :to="hrefMail"
      ></UButton>

      <UButton
        variant="ghost"
        label="GPG"
        icon="i-heroicons-lock-closed"
        :to="hrefGPG"
        target="_blank"
      ></UButton>
    </div>

    <div class="mt-4 flex flex-row justify-center items-center">
      <UButton
        variant="ghost"
        label="LinkedIn"
        icon="i-simple-icons-linkedin"
        :to="hrefLinkedIn"
        target="_blank"
      ></UButton>

      <UButton
        variant="ghost"
        label="Upwork"
        icon="i-simple-icons-upwork"
        :to="hrefUpwork"
        target="_blank"
      ></UButton>
    </div>

    <div class="mt-4 flex flex-row justify-center items-center">
      <UButton
        variant="ghost"
        label="GitHub"
        icon="i-simple-icons-github"
        :to="hrefGithub"
        target="_blank"
      ></UButton>

      <UButton
        variant="ghost"
        label="HuggingFace"
        icon="i-noto-v1-hugging-face"
        :to="hrefHuggingFace"
        target="_blank"
      ></UButton>

      <UButton
        variant="ghost"
        label="Patreon"
        icon="i-simple-icons-patreon"
        :to="hrefPatreon"
        target="_blank"
      ></UButton>
    </div>

    <div class="mt-4 flex flex-row justify-center items-center">
      <UButton
        variant="ghost"
        icon="i-simple-icons-discord"
        :to="hrefDiscord"
        target="_blank"
      ></UButton>

      <UButton
        variant="ghost"
        icon="i-simple-icons-x"
        :to="hrefTwitter"
        target="_blank"
      ></UButton>

      <UButton
        variant="ghost"
        icon="i-simple-icons-youtube"
        :to="hrefYoutube"
        target="_blank"
      ></UButton>

      <UButton
        variant="ghost"
        icon="i-simple-icons-threads"
        :to="hrefThreads"
        target="_blank"
      ></UButton>

      <UButton
        variant="ghost"
        icon="i-simple-icons-instagram"
        :to="hrefInstagram"
        target="_blank"
      ></UButton>
    </div>

    <IndexSeperator :title="$t('simpleIndex.donation')"></IndexSeperator>

    <div class="mt-4 flex flex-row justify-center items-center">
      <UButton
        variant="ghost"
        icon="i-simple-icons-github"
        :to="hrefGithubSponsors"
        target="_blank"
      ></UButton>

      <UButton
        variant="ghost"
        icon="i-simple-icons-patreon"
        :to="hrefPatreonMembership"
        target="_blank"
      ></UButton>

      <UButton
        variant="ghost"
        icon="i-simple-icons-bitcoin"
        :to="hrefBitcoin"
        target="_blank"
      ></UButton>

      <UButton
        variant="ghost"
        icon="i-simple-icons-ethereum"
        :to="hrefEthereum"
        target="_blank"
      ></UButton>

      <UButton
        variant="ghost"
        icon="i-simple-icons-opensea"
        :to="hrefOpenSea"
        target="_blank"
      ></UButton>
    </div>

    <IndexSeperator :title="$t('simpleIndex.vault')"></IndexSeperator>

    <div class="mt-4 flex flex-row justify-center items-center">
      <UButton
        variant="ghost"
        :label="$t('simpleIndex.lastwill')"
        icon="i-heroicons-light-bulb"
        :to="hrefLastWill"
        target="_blank"
      ></UButton>
    </div>
  </div>
</template>
