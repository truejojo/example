<script setup>
import useNoteStore from '../stores/notesStore.js';
import NotesHeader from '../components/notes/NotesHeader.vue';
import NotesMain from '../components/notes/NotesMain.vue';
import NotesFooter from '../components/notes/NotesFooter.vue';
import NoteForm from '../components/notes/NoteForm.vue';
import Overlay from '../components/utils/Overlay.vue';

const notesStore = useNoteStore();
notesStore.seed();
</script>

<template>
    <Overlay v-if="notesStore.isOverlay">
        <NoteForm />
    </Overlay>

    <NotesHeader/>

    <NotesMain v-if="notesStore.data.notes.length > 0" />
        <div v-else class="text-center">
            <p>
                Zur Zeit sind keine Notizen hinterlegt!<br />
                <small>Fang am Besten gleich an...</small>
            </p>
        </div>

    <NotesFooter />

</template>
