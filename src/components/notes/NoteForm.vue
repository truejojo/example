<script setup>
import { ref } from 'vue';
import Label from '../../components/single/Label.vue';
import InputTextField from '../../components/single/InputTextField.vue';
import TextareaField from '../../components/single/TextareaField.vue';
import Button from '../../components/single/Button.vue';
import ErrorMessage from '../../components/single/ErrorMessage.vue';
import FlexJustifyBetween from '../../wrapper/FlexJustifyBetween.vue';

const { noteUpdateValues } = defineProps({
    noteUpdateValues: {
        type: Object,
        default: null,
    }
})

const title = ref( noteUpdateValues ? noteUpdateValues.title : '');
const text = ref( noteUpdateValues ? noteUpdateValues.text : '');
const titleErrorMessage = ref('');
const textErrorMessage = ref('');

const emit = defineEmits(['addNote', 'cancelNewNote', 'updateNote']);

const emitAddNote = () => {
    titleErrorMessage.value = '';
    textErrorMessage.value = '';
    if(title.value === '') return titleErrorMessage.value = "Bitte einen Titel eingeben!";
    if(text.value === '') return textErrorMessage.value = "Bitte einen Text eingeben!";
   
    emit('addNote', { title: title.value, text: text.value });
};

const emitCancelNewNote = () => {
    title.value = '';
    text.value = '';

    emit('cancelNewNote');
};

const emitUpdateNote = () => {
    titleErrorMessage.value = '';
    textErrorMessage.value = '';
    if(title.value === '') return titleErrorMessage.value = "Bitte einen Titel eingeben!";
    if(text.value === '') return textErrorMessage.value = "Bitte einen Text eingeben!";

    emit('updateNote', { title: title.value, text: text.value })
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
        <Button :onClick="noteUpdateValues ? emitUpdateNote : emitAddNote">
            {{ noteUpdateValues ? 'Notiz ändern' : 'Neue Notiz' }}
        </Button>
        <Button :onClick="emitCancelNewNote" bgColor="btn-secondary">Abbrechen</Button>
    </FlexJustifyBetween>
</template>