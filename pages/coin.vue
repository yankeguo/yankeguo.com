<script setup lang="ts">
const animatedName = ref("YKC");

onMounted(async () => {
  for (const name of ["YKC", "YaKeCo", "YanKeCoi", "YanKeCoin"]) {
    await wait(100);
    animatedName.value = name;
  }
});
</script>

<template>
  <Html :lang="$lang">
    <Head>
      <Title>YanKeCoin</Title>
    </Head>
  </Html>

  <div class="h-screen flex flex-col items-center justify-center">
    <div class="flex flex-col items-center justify-center">
      <div class="mt-10 flex flex-row justify-center items-center">
        <img class="w-11 h-11" src="~/assets/coin-icon.svg" />
        <h1 class="ms-5 font-bold text-4xl text-orange-600">
          {{ animatedName }}
        </h1>
      </div>
    </div>
  </div>
</template>
