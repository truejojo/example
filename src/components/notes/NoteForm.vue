<script setup>
import { ref } from 'vue';
import useNoteStore from '../../stores/notesStore.js';
import Label from '../../components/single/Label.vue';
import InputTextField from '../../components/single/InputTextField.vue';
import TextareaField from '../../components/single/TextareaField.vue';
import Button from '../../components/single/Button.vue';
import ErrorMessage from '../../components/single/ErrorMessage.vue';
import FlexJustifyBetween from '../../wrapper/FlexJustifyBetween.vue';

const noteList = useNoteStore();

const title = ref( noteList.currentNote ? noteList.currentNote.title : '');
const text = ref( noteList.currentNote ? noteList.currentNote.text : '');
const titleErrorMessage = ref('');
const textErrorMessage = ref('');


const addNote = () => {
    titleErrorMessage.value = '';
    textErrorMessage.value = '';
    if(title.value === '') return titleErrorMessage.value = "Bitte einen Titel eingeben!";
    if(text.value === '') return textErrorMessage.value = "Bitte einen Text eingeben!";

    noteList.addNote({ title: title.value, text: text.value });
    noteList.setIsOverlay(false);
};

const cancelNewNote = () => {
    noteList.setCurrentNote(null);
    noteList.setIsOverlay(false);
};

const updateNote = () => {
    titleErrorMessage.value = '';
    textErrorMessage.value = '';
    if(title.value === '') return titleErrorMessage.value = "Bitte einen Titel eingeben!";
    if(text.value === '') return textErrorMessage.value = "Bitte einen Text eingeben!";

    noteList.updateNote({ title: title.value, text: text.value });
    noteList.setCurrentNote(null);
    noteList.setIsOverlay(false);
};
</script>

<template>
    <div class="mb-3">
        <Label forProp="title">Title</Label>
        <InputTextField v-model.trim="title" id="title" placeholder="Bitte Titel eingeben..." />
        <ErrorMessage v-if="titleErrorMessage">{{ titleErrorMessage }}</ErrorMessage>
    </div>
    <div class="mb-3">
        <Label forProp="text">Text Feld</Label>
        <TextareaField v-model.trim="text" id="text" placeholder="Bitte Text eingeben" />
        <ErrorMessage v-if="textErrorMessage">{{ textErrorMessage }}</ErrorMessage>
    </div>
    <FlexJustifyBetween>
        <Button :onClick="noteList.currentNote ? updateNote : addNote">
            {{ noteList.currentNote ? 'Notiz ändern' : 'Neue Notiz' }}
        </Button>
        <Button :onClick="cancelNewNote" bgColor="btn-secondary">Abbrechen</Button>
    </FlexJustifyBetween>
</template>