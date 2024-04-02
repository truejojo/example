<script setup>
import TheHeader from './components/site/TheHeader.vue';
import TheFooter from './components/site/TheFooter.vue';
import Container from './wrapper/Container.vue';
</script>

<template>
  <TheHeader />
  <main class="bg-dark-subtle">
    <Container class="py-4">
      <RouterView />
    </Container>
  </main>
  <TheFooter />
</template>

<style>
#app {
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;
}
</style>
