<script setup lang="ts">
import { useInterval } from "@vueuse/core";
import { hrefAirdrop } from "~/composables/links";

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
</script>

<template>
  <Html :lang="$lang">

  <Head>
    <Title>Yanke Guo</Title>
  </Head>

  </Html>

  <UContainer class="h-screen flex flex-col items-center justify-evenly">
    <div class="flex flex-col items-center justify-center gap-4">
      <img class="rounded-full w-32" src="~/assets/avatar-redraw.jpg" alt="photo of me" />

      <div class="flex flex-row justify-center items-baseline">
        <span class="font-bold text-3xl">Yanke Guo</span>
        <span class="ms-2 text-sm text-slate-600 dark:text-slate-400">({{ $t("pronouns") }})</span>
      </div>

      <div class="flex flex-row justify-center items-center text-sm text-slate-600 dark:text-slate-400">
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
    <UDivider></UDivider>

    <slot></slot>

    <UDivider></UDivider>
    <Footer></Footer>
  </UContainer>
</template>
