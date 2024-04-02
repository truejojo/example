<script setup>
import { storeToRefs } from 'pinia';
import useNoteStore from '../../stores/noteStore.js';
import Note from './Note.vue';
import GridWrapper from '../../wrapper/GridWrapper.vue';
import useDate from '../../composables/useDate.js';

const { getTimestampFull } = useDate();

const { notes } = storeToRefs(useNoteStore());
</script>

<template>
    <GridWrapper>
        <Note
            v-for="note in notes"
            :key="note.id + getTimestampFull()"
            :note="note"
            />        
    </GridWrapper>
</template>