<script setup lang="ts">
const animatedName = ref("YKC");
const animatedDone = ref(false);

onMounted(async () => {
  for (const name of [
    "YKC",
    "YaKC",
    "YanKC",
    "YanKeC",
    "YanKeCo",
    "YanKeCoi",
    "YanKeCoin",
  ]) {
    await wait(75);
    animatedName.value = name;
  }
  animatedDone.value = true;
});
</script>

<template>
  <Html :lang="$lang">
    <Head>
      <Title>{{ animatedName }}</Title>
    </Head>
  </Html>

  <div class="h-screen flex flex-col items-center justify-center">
    <div class="flex flex-col items-center justify-center">
      <div class="mt-10 flex flex-row justify-center items-center">
        <img class="w-11 h-11" src="~/assets/coin-icon.svg" />
        <h1 class="ms-4 font-bold text-4xl text-orange-600">
          {{ animatedName }}
        </h1>
      </div>
      <div
        v-if="animatedDone"
        class="mt-12 flex flex-row justify-center items-baseline"
      >
        <UButton
          color="gray"
          to="https://github.com/yankeguo/YanKeCoin"
          target="_blank"
          icon="i-simple-icons-github"
          label="Sources"
          external="true"
          variant="link"
        ></UButton>

        <UButton
          class="ms-4"
          color="gray"
          to="https://arbiscan.io/token/0x1B1fA7583090F474536B2E2fECfc33822a2eC733"
          target="_blank"
          external="true"
          icon="i-heroicons-magnifying-glass"
          label="Arbiscan"
          variant="link"
        ></UButton>
      </div>
    </div>
  </div>
</template>
