import { defineStore } from 'pinia';
import useDate from '../composables/useDate.js';
import useRandomCharacter from '../composables/useRandomCharacter.js';

const { getTimestampDate, getTimestampFull, getShortDate } = useDate();
const { getNumbersIdent } = useRandomCharacter();

const useNotesStore = defineStore('noteList', {
    state: () => ({
        name: '',
        maxNotes: 0,
        notes: [], 
        isOverlay: false,
        currentNote: null,
    }),

    actions: {
        async seed () {
            const response = await import('../data/notes.json');
            this.$state = response.default;
        },

        addNote ({ title, text }) {
            this.$state.notes.push({
                id: getNumbersIdent(),
                date: getShortDate(),
                dateTS: getTimestampDate(),
                createTS: getTimestampFull(),
                changeTS: null,
                title,
                text,
            });
        },

        deleteNote (noteToDelete) {
            this.$state.notes = this.$state.notes.filter(note => note.id !== noteToDelete.id);
        },

        updateNote ({ title, text }) {
            const newNoteValues = { 
                ...this.$state.currentNote, 
                changeTS: getTimestampFull(),
                title,
                text,
            };
            this.$state.notes = [newNoteValues, ...this.$state.notes.filter(note => note.id !== this.$state.currentNote.id)];
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
            return this.$state.maxNotes - this.$state.notes.length;
        },
    }
    });

export default useNotesStore;