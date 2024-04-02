<script setup>
import { onMounted, onBeforeUnmount } from 'vue';
import { storeToRefs } from 'pinia';
import useNoteStore from '../stores/noteStore.js';
import NotesHeader from '../components/notes/NotesHeader.vue';
import NotesMain from '../components/notes/NotesMain.vue';
import NotesFooter from '../components/notes/NotesFooter.vue';
import NoteForm from '../components/notes/NoteForm.vue';
import Overlay from '../components/utils/Overlay.vue';
import InfoBox from '../components/single/InfoBox.vue';
import Spinner from '../components/single/Spinner.vue';

const { seed, closingDB } = useNoteStore();
const { loading, error, isOverlay, notes } = storeToRefs(useNoteStore());

onMounted(async () => {
  await seed();
});

onBeforeUnmount(() => {
  closingDB();
});
</script>

<template>
  <InfoBox v-if="loading">
    <Spinner />
  </InfoBox>
  <InfoBox v-if="error">
    {{ error.message }}
  </InfoBox>

  <template v-if="notes">
    <Overlay v-if="isOverlay">
      <NoteForm />
    </Overlay>

    <NotesHeader />

    <NotesMain v-if="notes.length > 0" />
    <InfoBox v-else>
      <p class="text-center m-0">
        Zur Zeit sind keine Notizen hinterlegt!<br />
        <small>Fang am Besten gleich an...</small>
      </p>
    </InfoBox>

    <NotesFooter />
  </template>
</template>
