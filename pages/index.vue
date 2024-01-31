<script setup lang="ts">
import { useInterval } from "@vueuse/core";
import { hrefWiseTag } from "~/composables/links";
import type { Container } from "tsparticles-engine";

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
      label: $t("lastwill"),
      icon: "i-heroicons-light-bulb",
      to: hrefLastWill,
    },
  ]
];


const linksDonations: Link[] = [
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
    icon: "i-simple-icons-bitcoin",
    to: hrefBitcoin,
  },
  {
    icon: "i-simple-icons-ethereum",
    to: hrefEthereum,
  },
]

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

const optionsParticles: any = computed(() => {

  const colorMode = useColorMode()

  const isDark = colorMode.value === 'dark'

  return {
    particles: {
      number: { value: 80, density: { enable: true, value_area: 800 } },
      color: { value: isDark ? "#ffffff" : '#333333' },
      shape: {
        type: "circle",
        stroke: { width: 0, color: isDark ? "#333333" : '#ffffff' },
        polygon: { nb_sides: 5 },
      },
      opacity: {
        value: 0.5,
        random: false,
        anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false }
      },
      size: {
        value: 4,
        random: true,
        anim: { enable: false, speed: 40, size_min: 0.1, sync: false }
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: isDark ? "#ffffff" : '#333333',
        opacity: 0.4,
        width: 1
      },
      move: {
        enable: true,
        speed: 2,
        direction: "none",
        random: false,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: { enable: false, rotateX: 600, rotateY: 1200 }
      }
    },
    interactivity: {
      detect_on: "window",
      events: {
        onhover: { enable: true, mode: "grab" },
        onclick: { enable: true, mode: "push" },
        resize: true
      },
      modes: {
        grab: { distance: 200, line_linked: { opacity: 1 } },
        bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
        repulse: { distance: 200, duration: 0.4 },
        push: { particles_nb: 4 },
        remove: { particles_nb: 2 }
      }
    },
    retina_detect: true
  }
})

const onParticlesLoad = (container: Container) => {
};
</script>

<template>
  <Html :lang="$lang">

  <Head>
    <Title>Yanke Guo</Title>
  </Head>


  <Body>

    <div>
      <NuxtParticles id="tsparticles" :options="optionsParticles" @load="onParticlesLoad"></NuxtParticles>
    </div>

    <div class="mt-16 flex flex-col items-center justify-center">
      <img class="rounded-full w-32" src="~/assets/avatar-cartoon.jpg" alt="photo of me" />

      <div class="mt-12 flex flex-row justify-center items-baseline">
        <span class="font-bold text-3xl">Yanke Guo</span>
        <span class="ms-2 text-sm text-slate-600 dark:text-slate-400">({{ $t("pronouns") }})</span>
      </div>

      <div class="mt-4 mb-12 flex flex-row justify-center items-center text-sm text-slate-600 dark:text-slate-400">
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

      <template v-for="(group, groupIdx) in linksSocial" v-bind:key="groupIdx">
        <div class="mb-4 flex flex-row justify-center items-center">
          <UButton v-for="(item, idx) in group" v-bind:key="idx + '.' + groupIdx" variant="ghost" :label="item.label"
            :icon="item.icon" :to="item.to" target="_blank"></UButton>
        </div>
      </template>

      <UCard class="w-80 max-w-full mt-8"
        :ui="{ background: 'bg-white dark:bg-gray-900', divide: 'divide-y divide-orange-200 dark:divide-orange-600', ring: 'ring-1 ring-orange-200 dark:ring-orange-600', header: { padding: 'p-1 sm:p-2', base: 'flex flex-row justify-center items-center text-orange-600 dark:text-orange-400' }, body: { padding: 'p-1 sm:p-2' } }">
        <template #header>
          <UIcon name="i-heroicons-wallet" class="me-1"></UIcon>
          <span>{{ $t('donation') }}</span>
        </template>
        <div class="flex flex-row justify-center items-center">
          <UButton color="orange" v-for="(item, idx) in linksDonations" v-bind:key="idx" variant="ghost"
            :label="item.label" :icon="item.icon" :to="item.to" target="_blank"></UButton>
        </div>
      </UCard>

      <Footer class="mt-12 mb-16"></Footer>
    </div>

  </Body>

  </Html>
</template>
