// https://medium.com/@bklik/handing-loading-flags-in-pinia-stores-bfdcee5b9fb

import { defineStore } from 'pinia';
import useIndexedDB from '../composables/useIndexedDB.js';
import useDate from '../composables/useDate.js';
import useRandomCharacter from '../composables/useRandomCharacter.js';

const { getTimestampDate, getTimestampFull, getShortDate } = useDate();
const { getNumbersIdent } = useRandomCharacter();

const DB_NAME = 'notesDataDB';
const DB_STORE_NAME = 'notesData';
const DB_VERSION = 3;
const DB_INDEXES = ['title', 'date', 'changeTS'];
const {
    openDB,
    addRecord,
    updateRecord,
    deleteRecord,
    getRecords,
    getRecord,
    closeDB,
} = useIndexedDB(DB_NAME, DB_STORE_NAME);

const useNotesStore = defineStore('noteList', {
    state: () => ({
        data: {
            name: '',
            maxNotes: 0,
            notes: [], 
        },
        currentNote: null,
        isOverlay: false,
        loadTasks: [],
    }),

    actions: {
        async seed () {
            this.$state.loadTasks.push('seed');

            await openDB(DB_VERSION, DB_INDEXES);
            await this.setNotes();

            this.$state.data.name = 'Meine Notizen';
            this.$state.data.maxNotes = 30;
            this.$state.isOverlay = false;
            this.$state.currentNote = null;

            setTimeout(() => {
                this.$state.loadTasks = this.$state.loadTasks.filter(task => task !== 'seed');
            }, 100);
        },
            
        async setNotes() {
            const records = await getRecords();
            this.$state.data.notes = records ? records : [];
        },

        async getNote(id) {
            const record = await getRecord(id);
            return record ? record : null;
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
            await this.setNotes();
        },

        async deleteNote (noteToDelete) {
            deleteRecord(noteToDelete.id);
            await this.setNotes();
        },

        async updateNote ({ title, text }) {
            updateRecord({
                ...this.$state.currentNote, 
                changeTS: getTimestampFull(),
                title,
                text,    
            });
            await this.setNotes();
        },

        closingDB() {
            closeDB();
        },

        setCurrentNote(newNote) {
            this.$state.currentNote = newNote;
        },

        setIsOverlay(value) {
            this.$state.isOverlay = value;
        },
    },
    
    getters: {
        loading: state => state.loadTasks.length > 0,

        getRemainingNotes: state => state.data.maxNotes - state.data.notes.length,
    }
});

export default useNotesStore;