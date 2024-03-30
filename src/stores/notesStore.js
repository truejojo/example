import { defineStore } from 'pinia';
import useIndexedDB from '../composables/useIndexedDB.js';
import useDate from '../composables/useDate.js';
import useRandomCharacter from '../composables/useRandomCharacter.js';

const { getTimestampDate, getTimestampFull, getShortDate } = useDate();
const { getNumbersIdent } = useRandomCharacter();
const {
    openDB,
    addRecord,
    updateRecord,
    deleteRecord,
    getRecords,
} = useIndexedDB('notesDataDB', 'notesData');

const useNotesStore = defineStore('noteList', {
    state: () => ({
        data: {
            name: '',
            maxNotes: 0,
            notes: [], 
        },
        isOverlay: false,
        currentNote: null,
    }),

    actions: {
        async seed () {
            await openDB();
            await this.getNotes();
            this.$state.data.name = 'Meine Notizen';
            this.$state.data.maxNotes = 30;
            this.$state.isOverlay = false;
            this.$state.currentNote = null;
        },

        async getNotes() {
            this.$state.data.notes = await getRecords();
        },

        async addNote ({ title, text }) {
            addRecord({
                id: getNumbersIdent(),
                date: getShortDate(),
                dateTS: getTimestampDate(),
                createTS: getTimestampFull(),
                changeTS: null,
                title,
                text,
            });
            await this.getNotes();
        },

        async deleteNote (noteToDelete) {
            deleteRecord(noteToDelete.id);
            await this.getNotes();
        },

        async updateNote ({ title, text }) {
            updateRecord({
                ...this.$state.currentNote, 
                changeTS: getTimestampFull(),
                title,
                text,    
            });
            await this.getNotes();
        },

        setCurrentNote(newNote) {
            this.$state.currentNote = newNote;
        },

        setIsOverlay(value) {
            this.$state.isOverlay = value;
        },
    },
    
    getters: {
        getRemainingNotes() {
            return this.$state.data.maxNotes - this.$state.data.notes.length;
        },
    }
    });

export default useNotesStore;