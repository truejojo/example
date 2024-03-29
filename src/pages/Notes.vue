<script setup>
import useNoteStore from '../stores/notesStore.js';
import NotesHeader from '../components/notes/NotesHeader.vue';
import NotesMain from '../components/notes/NotesMain.vue';
import NotesFooter from '../components/notes/NotesFooter.vue';
import NoteForm from '../components/notes/NoteForm.vue';
import Overlay from '../components/utils/Overlay.vue';

const noteList = useNoteStore();
noteList.seed();
</script>

<template>
    <Overlay v-if="noteList.isOverlay">
        <NoteForm />
    </Overlay>

    <NotesHeader/>

    <NotesMain />

    <NotesFooter />

</template>
