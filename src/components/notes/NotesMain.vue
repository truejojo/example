<script setup>
import GridWrapper from '../../wrapper/GridWrapper.vue';
import Note from './Note.vue';
import useDate from '../../composables/useDate';

const { getTimestampFull } = useDate();

const { noteList } = defineProps({
    noteList: {
        type: Object,
        required: true
    }
});
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