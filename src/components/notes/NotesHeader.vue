<script setup>
import useNoteStore from '../../stores/notesStore.js';
const notesStore = useNoteStore();

const handleIsOverlay = () => notesStore.setIsOverlay(true);
</script>

<template>
    <div class="mb-4 d-flex position-relative">
        <h1 class="display-1  header me-3">
            {{ notesStore.data.name }} 
        </h1>
        <span class="text-danger badge bg-dark text-center align-self-baseline fs-5">
            {{ notesStore.getRemainingNotes }}
        </span>
        <div @click="handleIsOverlay" class="ms-auto bg-info text-dark text-center fs-1 my-auto d-flex justify-content-center rounded-circle circle" role="button">+</div>
    </div>
</template>

<style scoped>
.circle {
    position: relative;
    width: 65px;
    height: 65px;
}
</style>