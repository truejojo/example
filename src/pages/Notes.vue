<script setup>
import { onMounted, onBeforeUnmount } from 'vue';
import useNoteStore from '../stores/notesStore.js';
import NotesHeader from '../components/notes/NotesHeader.vue';
import NotesMain from '../components/notes/NotesMain.vue';
import NotesFooter from '../components/notes/NotesFooter.vue';
import NoteForm from '../components/notes/NoteForm.vue';
import Overlay from '../components/utils/Overlay.vue';
import InfoBox from '../components/single/InfoBox.vue';
import Spinner from '../components/single/Spinner.vue';

const notesStore = useNoteStore();

onMounted(async () => {
    await notesStore.seed();
});

onBeforeUnmount(() => {
    notesStore.closingDB();
});
</script>

<template>    
    <InfoBox v-if="notesStore.loading">
        <Spinner />
    </InfoBox>
    
    <template v-if="!notesStore.loading">
        <Overlay v-if="notesStore.isOverlay">
            <NoteForm />
        </Overlay>
        
        <NotesHeader/>

        <NotesMain v-if="notesStore.data.notes.length > 0" />
        <InfoBox v-else>
            <p class="text-center m-0">
                Zur Zeit sind keine Notizen hinterlegt!<br />
                <small>Fang am Besten gleich an...</small>
            </p>
        </InfoBox>
        
        <NotesFooter />
    </template>

</template>
