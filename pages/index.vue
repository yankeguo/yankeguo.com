<script setup lang="ts">
import { useInterval, useScroll, useWindowScroll } from "@vueuse/core";

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

const linksSocial: Link[] = [
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
];

const baseURLPhoto = "https://imagedelivery.net/z27-nfL54f0eHFxCGFIatg/";

const linksPhotos: {
  id: string;
  title: string;
}[] = [
  {
    id: "89e29364-a880-4a56-3271-210523e71800",
    title: "2025-05-22: Floating Chair Coffee",
  },
  {
    id: "961edf63-fc7d-4ba0-42d7-5299ec941400",
    title: "2025-05-22: Cloudy Day",
  },
  {
    id: "2c2d65e3-6b00-4bde-d962-7c03398a6700",
    title: "2025-05-21: Cloudy Day",
  },
];

const { y: scrollY } = useWindowScroll();
const isScrolled = computed(() => scrollY.value > 100);
</script>

<template>
  <Html :lang="$lang">
    <Head>
      <Title>Yan-Ke Guo</Title>
    </Head>
  </Html>

  <UContainer class="flex flex-col">
    <!-- Spacer with reduced height -->
    <div
      :class="[
        'transition-[height] duration-200',
        isScrolled ? 'h-[calc(25vh)]' : 'h-[calc(75vh)]',
      ]"
    ></div>

    <!-- Header -->
    <div
      :class="[
        'transition-all duration-300 w-full',
        isScrolled
          ? 'fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 shadow-md py-4 px-8'
          : 'absolute top-0 left-0 right-0 h-[calc(75vh)] flex items-center justify-center',
      ]"
    >
      <div
        :class="[
          'flex w-full',
          isScrolled
            ? 'flex-row items-center justify-between'
            : 'flex-col items-center justify-center gap-8',
        ]"
      >
        <div
          :class="[
            'flex',
            isScrolled
              ? 'flex-row items-center gap-4'
              : 'flex-col items-center justify-center gap-4',
          ]"
        >
          <!-- Avatar -->
          <img
            :class="[
              'rounded-full transition-all duration-300',
              isScrolled ? 'w-12' : 'w-32',
            ]"
            src="~/assets/avatar-redraw.jpg"
            alt="photo of me"
          />

          <!-- Name and Location -->
          <div
            :class="[
              'flex',
              isScrolled ? 'flex-col items-start' : 'flex-col items-center',
            ]"
          >
            <!-- Name -->
            <div class="flex flex-row justify-center items-baseline">
              <span class="font-bold text-3xl">Yan-Ke Guo</span>
              <span class="ms-2 text-sm text-slate-600 dark:text-slate-400"
                >({{ $t("pronouns") }})</span
              >
            </div>

            <!-- Location -->
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
        </div>

        <!-- Social Links -->
        <div
          :class="[
            'flex',
            isScrolled
              ? 'flex-row items-center'
              : 'flex-col items-center justify-center gap-8',
          ]"
        >
          <div class="flex flex-row items-center gap-2">
            <UButton
              v-for="(item, idx) in linksSocial"
              v-bind:key="'link-social-' + idx"
              variant="ghost"
              :icon="item.icon"
              color="neutral"
              :to="item.to"
              target="_blank"
            ></UButton>
          </div>
        </div>
      </div>
    </div>

    <!-- Photos -->
    <div
      class="grid grid-cols-2 lg:grid-cols-4 py-8 gap-4 transition-all duration-500 min-h-[calc(100vh+12rem)]"
    >
      <div
        v-for="(item, idx) in linksPhotos"
        v-bind:key="'link-photo-' + idx"
        class="aspect-square"
      >
        <UTooltip :text="item.title">
          <a :href="baseURLPhoto + item.id + '/standard'" target="_blank">
            <img
              class="rounded-sm w-full h-full object-cover"
              :src="baseURLPhoto + item.id + '/thumb'"
              :alt="item.title"
            />
          </a>
        </UTooltip>
      </div>
    </div>

    <div class="flex flex-col items-center justify-center py-8">
      <Footer></Footer>
    </div>
  </UContainer>
</template>
