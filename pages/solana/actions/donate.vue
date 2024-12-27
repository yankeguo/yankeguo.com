<script setup lang="ts">
const { $t } = useNuxtApp();
definePageMeta({
    layout: 'fullscreen',
})
</script>

<template>

    <Head>
        <Title>Yanke Guo / Solana Donation</Title>

        <meta property="og:title" content="Yanke Guo / Solana Donation" />
        <meta property="og:description" content="Donate Solana to Yanke Guo" />
        <meta property="og:image" :content="hrefAvatarAbsoluteURL" />
    </Head>

    <div class="flex flex-col items-center justify-center gap-8">
        <UButton size="lg" variant="link" to="/" icon="i-heroicons-chevron-double-left" :label="$t('back')"></UButton>
        <div class="flex flex-row items-center">
            <UBadge class="me-2" variant="outline" color="orange">{{ $t("donation") }}</UBadge>
            <span class="text-orange-400">{{ $t('donateSolana') }}</span>
        </div>
        <p class="font-mono font-semibold text-lg">
            {{ addressSolana }}
        </p>
    </div>
</template>