<script setup lang="ts">
const year = new Date().getFullYear();

const colorMode = useColorMode();

const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set() {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
    location.reload();
  },
});

function setLanguage(lang: string) {
  document.cookie = `lang=${lang};path=/;max-age=31536000`;
  location.reload();
}
</script>

<template>
  <div class="flex flex-col gap-3">
    <div class="flex flex-row justify-center items-center">
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
            <span>{{ $langNames[item] }}</span>
          </a>
          <UIcon name="i-bi-dot" class="text-slate-400"></UIcon>
        </template>

        <UButton
          :icon="
            isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'
          "
          color="neutral"
          variant="ghost"
          aria-label="Theme"
          :padded="false"
          @click="isDark = !isDark"
        />

        <template #fallback>
          <div class="w-8 h-8"></div>
        </template>
      </ClientOnly>
    </div>

    <div
      class="flex flex-row justify-center items-center text-slate-400 text-sm"
    >
      Copyright &copy; {{ year }} {{ $t("copyright") }}
    </div>
  </div>
</template>
