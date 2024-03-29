<script setup>
import useNoteStore from '../../stores/notesStore.js';
const noteList = useNoteStore();

const emit = defineEmits(['openOverlay'])
const emitOpenOverlay = () => emit('openOverlay'); 
</script>

<template>
    <div class="mb-4 d-flex position-relative">
        <h1 class="display-1  header me-3">
            {{ noteList.name }} 
        </h1>
        <span class="text-danger badge bg-dark text-center align-self-baseline fs-5">{{ noteList.maxNotes - noteList.notes.length }}</span>
        <div @click="emitOpenOverlay" class="ms-auto bg-info text-dark text-center fs-1 my-auto d-flex justify-content-center rounded-circle circle" role="button">+</div>
    </div>
</template>

<style scoped>
.circle {
    position: relative;
    width: 65px;
    height: 65px;
}
</style>