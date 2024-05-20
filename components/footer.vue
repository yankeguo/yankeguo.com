<script setup lang="ts">
const year = new Date().getFullYear();

const colorMode = useColorMode();

const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set() {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
    location.reload()
  },
});

function setLanguage(lang: string) {
  document.cookie = `lang=${lang};path=/;max-age=31536000`;
  location.reload();
}
</script>

<template>
  <div>
    <div class="mb-2 flex flex-row justify-center items-center">
      <ClientOnly>
        <!-- i18n -->
        <template v-for="(item, idx) in $langs">
          <a @click.prevent="setLanguage(item)" :class="{
            'text-sm': true,
            underline: $lang === item,
          }" href="#">
            <span>{{ $langNames[item] }}</span>
          </a>
          <i class="i-bi-dot text-slate-400" />
        </template>

        <UButton :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'
          " size="2xs" color="black" variant="ghost" aria-label="Theme" :padded="false" @click="isDark = !isDark" />

        <template #fallback>
          <div class="w-8 h-8" />
        </template>
      </ClientOnly>
    </div>

    <div class="flex flex-row justify-center items-center text-slate-400 text-sm mt-3">
      copyright &copy; {{ year }} {{ $t("copyright") }}
    </div>
  </div>
</template>
