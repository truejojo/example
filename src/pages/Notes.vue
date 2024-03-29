<script setup>
import { ref } from 'vue';
// Components
import Note from '../components/composed/Note.vue';
import NoteForm from '../components/composed/NoteForm.vue';
// Wrapper
import GridWrapper from '../wrapper/GridWrapper.vue';
import FlexJustifyBetween from '../wrapper/FlexJustifyBetween.vue';
import Overlay from '../components/utils/Overlay.vue';
// Composables
import useToggler from '../composables/useToggler.js';
import useDate from '../composables/useDate.js';
import useRandomCharacter from '../composables/useRandomCharacter.js';
import jsonNotes from '../data/notes.json';

const [ getIsOverlay, , setIsOverlayTrue, setIsOverlayFalse ] = useToggler();
const { getTimestampDate, getTimestampFull, getShortDate } = useDate();
const { getNumbersIdent } = useRandomCharacter();

const notes = ref(jsonNotes.length > 0 ? jsonNotes : []);
const noteToChange = ref(null);

const addNote = ({ title, text }) => {
    notes.value.push({
        id: getNumbersIdent(),
        date: getShortDate(),
        dateTS: getTimestampDate(),
        createTS: getTimestampFull(),
        changeTS: null,
        title,
        text,
    });
    setIsOverlayFalse();
};

const updateNote = ({ title, text }) => {
    const updateNote = { 
        ...noteToChange.value, 
        changeTS: getTimestampFull(),
        title,
        text,
    };
    notes.value = [updateNote, ...notes.value.filter(note => note.id !== noteToChange.value.id)];
    
    noteToChange.value = null;
    setIsOverlayFalse();
};

const cancelNewNote = () => {
    setIsOverlayFalse();
    noteToChange.value = null;
};

const handleUpdateNote = (note) => {
    noteToChange.value = note;
    setIsOverlayTrue();
};

const deleteNote = (noteToDelete) =>
    notes.value = notes.value.filter(note => note.id !== noteToDelete.id);

const openOverlay = () => setIsOverlayTrue();
</script>

<template>
    <Overlay v-if="getIsOverlay()">
        <NoteForm 
            @addNote="addNote"
            @cancelNewNote="cancelNewNote"
            @updateNote="updateNote"
            :noteToChange="noteToChange"
        />
    </Overlay>

    <FlexJustifyBetween class="mb-4">
        <h1 class="display-1">Meine Notizen </h1>
        <span @click="openOverlay()" class="bg-info text-dark text-center fs-1 my-auto d-flex justify-content-center rounded-circle circle" role="button">+</span>
    </FlexJustifyBetween>

    <GridWrapper>
        <Note 
            v-for="note in notes" 
            :key="note.id + getTimestampFull()" 
            :note="note"
            @handleUpdateNote="handleUpdateNote"
            @deleteNote="deleteNote"
        />        
    </GridWrapper>
</template>

<style scoped>
.circle {
    width: 65px;
    height: 65px;
}
</style>
