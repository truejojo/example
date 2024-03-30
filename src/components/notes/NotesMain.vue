<script setup>
import useNoteStore from '../../stores/notesStore.js';
import Note from './Note.vue';
import GridWrapper from '../../wrapper/GridWrapper.vue';
import useDate from '../../composables/useDate.js';

const { getTimestampFull } = useDate();

const notesStore = useNoteStore();
</script>

<template>
    <GridWrapper>
        <Note
            v-for="note in notesStore.data.notes"
            :key="note.id + getTimestampFull()"
            :note="note"
            />        
    </GridWrapper>
</template>