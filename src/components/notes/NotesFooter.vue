<script setup>
import { storeToRefs } from 'pinia';
import useNoteStore from '../../stores/noteStore.js';

const { getRemainingNotes } = storeToRefs(useNoteStore());
</script>

<template>
    <div class="bg-dark text-light my-3 py-3 px-2 rounded">
        <p class="text-uppercase text-center m-0">
            Noch <span class="badge bg-info text-dark"> {{ getRemainingNotes }}</span> mögliche Notizen!
        </p>
    </div>
</template>