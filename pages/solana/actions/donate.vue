<script setup lang="ts">
const { $t } = useNuxtApp();
definePageMeta({
    layout: 'fullscreen',
})
</script>

<template>

    <Head>
        <Title>Yanke Guo / Solana Donation</Title>
    </Head>

    <div class="flex flex-col items-center justify-center gap-8">
        <p>
            {{ $t('donateSolana') }}
        </p>
        <p class="font-mono font-semibold text-lg">
            {{ addressSolana }}
        </p>
        <UButton variant="link" to="/" icon="i-heroicons-chevron-double-left" :label="$t('back')"></UButton>
    </div>
</template>