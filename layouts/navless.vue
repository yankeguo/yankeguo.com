<template>
  <div class="container mx-auto pt-2 md:pt-4 pb-3">
    <Html :lang="$lang">
      <Body>
        <slot></slot>
        <Footer></Footer>
      </Body>
    </Html>
  </div>
</template>
