<script setup lang="ts">
import { useInterval } from "@vueuse/core";

const { $t } = useNuxtApp();

const localTimeUpdater = useInterval(1000);

const localTime = ref("");

function updateLocalTime() {
  localTime.value = new Date().toLocaleTimeString("en-US", {
    timeZone: "Asia/Shanghai",
    hour12: true,
    timeStyle: "medium",
  });
}

watch(localTimeUpdater, updateLocalTime, { immediate: true });

type Link = {
  label?: string;
  icon: string;
  to: string;
};

const linksSocial: Link[][] = [
  [
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
    {
      icon: "i-simple-icons-x",
      label: "X",
      to: hrefTwitter,
    },
    {
      label: "GitHub",
      icon: "i-simple-icons-github",
      to: hrefGithub,
    },
    {
      label: $t("lastwill"),
      icon: "i-heroicons-light-bulb",
      to: hrefLastWill,
    },
  ],
];
</script>

<template>
  <Html :lang="$lang">
    <Head>
      <Title>Yan-Ke Guo</Title>
    </Head>
  </Html>
  <UContainer class="h-screen flex flex-col items-center justify-center gap-8">
    <div class="flex flex-col items-center justify-center gap-4">
      <img
        class="rounded-full w-32"
        src="~/assets/avatar-redraw.jpg"
        alt="photo of me"
      />

      <div class="flex flex-row justify-center items-baseline">
        <span class="font-bold text-3xl">Yan-Ke Guo</span>
        <span class="ms-2 text-sm text-slate-600 dark:text-slate-400"
          >({{ $t("pronouns") }})</span
        >
      </div>

      <div
        class="flex flex-row justify-center items-center text-sm text-slate-600 dark:text-slate-400"
      >
        <div class="flex flex-row items-center">
          <UIcon name="i-heroicons-map-pin"></UIcon>
          <span class="ms-1">{{ $t("location") }}</span>
        </div>

        <div class="flex flex-row items-center ms-4">
          <UIcon name="i-heroicons-clock"></UIcon>
          <ClientOnly>
            <span class="ms-1">{{ localTime }}</span>
          </ClientOnly>
        </div>
      </div>
    </div>

    <div class="flex flex-col items-center justify-center gap-8">
      <div class="flex flex-col items-center justify-center gap-4">
        <template
          v-for="(group, groupIdx) in linksSocial"
          v-bind:key="groupIdx"
        >
          <div class="flex flex-row justify-center items-center">
            <UButton
              v-for="(item, idx) in group"
              v-bind:key="idx + '.' + groupIdx"
              variant="ghost"
              :icon="item.icon"
              color="neutral"
              :to="item.to"
              target="_blank"
            ></UButton>
          </div>
        </template>
      </div>
    </div>
    <Footer></Footer>
  </UContainer>
</template>
