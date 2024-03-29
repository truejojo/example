<script setup>
import useNoteStore from '../../stores/notesStore.js';
const noteList = useNoteStore();
</script>

<template>
    <div class="bg-dark text-light my-4 py-3 px-2 rounded">

        <p class="text-uppercase text-center m-0">
            Noch <span class="badge bg-info text-dark"> {{ noteList.maxNotes - noteList.notes.length }}</span> mögliche Notizen!
        </p>
    </div>
</template>