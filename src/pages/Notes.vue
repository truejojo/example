<script setup>
import { ref, provide } from 'vue';
import useNoteStore from '../stores/notesStore.js';
import NotesHeader from '../components/notes/NotesHeader.vue';
import NotesMain from '../components/notes/NotesMain.vue';
import NotesFooter from '../components/notes/NotesFooter.vue';
import NoteForm from '../components/notes/NoteForm.vue';
import Overlay from '../components/utils/Overlay.vue';
import useToggler from '../composables/useToggler.js';

const noteList = useNoteStore();
noteList.seed();

const [ getIsOverlay, , setIsOverlayTrue, setIsOverlayFalse ] = useToggler();

const noteUpdateValues = ref(null);

const addNote = (note) => {
    noteList.addNote(note);
    setIsOverlayFalse();
};

const deleteNote = (noteToDelete) => noteList.deleteNote(noteToDelete);

const updateNote = (noteToUpdate) => {
    noteList.updateNote(noteToUpdate, noteUpdateValues);
    noteUpdateValues.value = null;
    setIsOverlayFalse();
};

const cancelNewNote = () => {
    setIsOverlayFalse();
    noteUpdateValues.value = null;
};

const handleUpdateNote = (note) => {
    noteUpdateValues.value = note;
    setIsOverlayTrue();
};

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
            :noteUpdateValues="noteUpdateValues"
        />
    </Overlay>

    <NotesHeader @openOverlay="openOverlay"/>

    <NotesMain />

    <NotesFooter />

</template>
