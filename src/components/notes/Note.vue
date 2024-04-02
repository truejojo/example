<script setup>
import useNoteStore from '../../stores/noteStore.js';
import Button from '../single/Button.vue';

const { note } = defineProps({
  note: {
    type: Object,
    required: true,
  },
});
const { title, text, date } = note;
const { setNoteToUpdate, setIsOverlay, deleteNote } =
  useNoteStore();

const handleUpdateNote = () => {
  setNoteToUpdate(note);
  setIsOverlay(true);
};

const handleDeleteNote = () => deleteNote(note);
</script>

<template>
  <div
    class="p-4 border border-info card rounded bg-dark text-light"
  >
    <div class="card-body">
      <h2 class="card-title text-info">{{ title }}</h2>
      <p class="card-text">{{ text }}</p>
    </div>
    <div class="card-footer d-flex align-items-end">
      <Button
        :onClick="handleUpdateNote"
        class="btn-sm me-2"
        >Ändern</Button
      >
      <Button
        :onClick="handleDeleteNote"
        bgColor="btn-danger"
        class="btn-sm"
        >Löschen</Button
      >
      <span class="ms-auto badge bg-info text-dark">{{
        date
      }}</span>
    </div>
  </div>
</template>
