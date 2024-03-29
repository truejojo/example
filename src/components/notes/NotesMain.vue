<script setup>
import useNoteStore from '../../stores/notesStore.js';
import Note from './Note.vue';
import GridWrapper from '../../wrapper/GridWrapper.vue';
import useDate from '../../composables/useDate.js';

const { getTimestampFull } = useDate();

const noteList = useNoteStore();
</script>

<template>
    <GridWrapper>
        <Note 
            v-for="note in noteList.notes" 
            :key="note.id + getTimestampFull()" 
            :note="note"
        />        
    </GridWrapper>
</template>