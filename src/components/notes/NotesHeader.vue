<script setup>
import { storeToRefs } from 'pinia';
import useNoteStore from '../../stores/noteStore.js';

const { setIsOverlay } = useNoteStore();
const { getRemainingNotes } = storeToRefs(useNoteStore());

const handleIsOverlay = () => setIsOverlay(true);
</script>

<template>
  <header class="mb-4 d-flex position-relative">
    <h1 class="display-1 me-3">Meine Notizen</h1>
    <span
      class="text-danger badge bg-dark text-center align-self-baseline fs-5"
    >
      {{ getRemainingNotes }}
    </span>
    <div
      @click="handleIsOverlay"
      class="ms-auto bg-info text-dark text-center fs-1 my-auto d-flex justify-content-center rounded-circle circle"
      role="button"
    >
      +
    </div>
  </header>
</template>

<style scoped>
.circle {
  position: relative;
  width: 65px;
  height: 65px;
}
</style>
