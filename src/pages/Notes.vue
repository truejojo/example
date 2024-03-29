<script setup>
import { ref, provide } from 'vue';
// Components
import NotesHeader from '../components/notes/NotesHeader.vue';
import NotesMain from '../components/notes/NotesMain.vue';
import NotesFooter from '../components/notes/NotesFooter.vue';
import NoteForm from '../components/notes/NoteForm.vue';
// Wrapper

import Overlay from '../components/utils/Overlay.vue';
// Composables
import useToggler from '../composables/useToggler.js';
import useDate from '../composables/useDate.js';
import useRandomCharacter from '../composables/useRandomCharacter.js';
import jsonNotes from '../data/notes.json';

const [ getIsOverlay, , setIsOverlayTrue, setIsOverlayFalse ] = useToggler();
const { getTimestampDate, getTimestampFull, getShortDate } = useDate();
const { getNumbersIdent } = useRandomCharacter();

const noteList = ref(jsonNotes);
const noteToChange = ref(null);

const addNote = ({ title, text }) => {
    noteList.value.notes.push({
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
    noteList.value.notes = [updateNote, ...noteList.value.notes.filter(note => note.id !== noteToChange.value.id)];
    
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
    noteList.value.notes = noteList.value.notes.filter(note => note.id !== noteToDelete.id);

const openOverlay = () => setIsOverlayTrue();

provide('handleUpdateNote', handleUpdateNote);
provide('deleteNote', deleteNote);
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

    <NotesHeader :noteList="noteList" @openOverlay="openOverlay"/>

    <NotesMain :noteList="noteList" />

    <NotesFooter :noteList="noteList" />

</template>
