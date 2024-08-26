<script setup lang="ts">
const { $t } = useNuxtApp();
</script>

<template>
    <Html :lang="$lang">

    <Head>
        <Title>Yanke Guo / Solana Donation</Title>
    </Head>

    </Html>


    <UContainer class="h-screen flex flex-col items-center justify-evenly">
        <div class="flex flex-col items-center justify-center gap-4">
            <p>
                Send some SOL to the following address
            </p>
            <p class="font-mono font-semibold text-lg">
                {{ addressSolana }}
            </p>
        </div>
    </UContainer>
</template>