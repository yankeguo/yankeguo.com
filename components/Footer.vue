<script setup lang="ts">
const year = new Date().getFullYear();

const colorMode = useColorMode();

const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set() {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
  },
});

function setLanguage(lang: string) {
  document.cookie = `lang=${lang};path=/;max-age=31536000`;
  location.reload();
}
</script>

<template>
  <div class="mb-2 flex flex-row justify-center items-center">
    <ClientOnly>
      <!-- i18n -->
      <template v-for="(item, idx) in $langs">
        <a
          @click.prevent="setLanguage(item)"
          :class="{
            'text-sm': true,
            underline: $lang === item,
          }"
          href="#"
        >
          <i class="i-bi-translate me-2"></i>
          <span>{{ $langNames[item] }}</span>
        </a>
        <i class="i-bi-dot text-slate-400" />
      </template>

      <UButton
        :icon="
          isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'
        "
        size="2xs"
        color="black"
        variant="ghost"
        aria-label="Theme"
        :padded="false"
        @click="isDark = !isDark"
      />

      <template #fallback>
        <div class="w-8 h-8" />
      </template>
    </ClientOnly>
  </div>

  <div
    class="flex flex-col justify-center items-center lg:flex-row lg:justify-center lg:items-center text-slate-400 text-sm pb-8"
  >
    <div class="mt-2 md:me-1">copyright &copy; {{ year }}</div>
    <div class="mt-2 md:me-1">{{ $t("copyright") }}</div>
  </div>
</template>
