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
	id: 'note',

	state: () => ({
		notes: [],
		note: null,
		maxNotes: 0,
		noteToUpdate: null,
		isOverlay: false,
		loading: false,
		error: null,
	}),

	getters: {
		getRemainingNotes: state => state.maxNotes - state.notes.length,
	},

	actions: {
		async seed() {
			await openDB(DB_VERSION, DB_INDEXES);
			await this.fetchNotes();

			this.maxNotes = 30;
			this.isOverlay = false;
			this.noteToUpdate = null;
		},

		async fetchNotes() {
			this.notes = [];
			this.loading = true;

			try {
				const records = await getRecords();
				this.notes = records ? records : [];
			} catch (error) {
				this.error = error;
			} finally {
				this.loading = false;
			}
		},

		async fetchNote(id) {
			this.note = null;
			this.loading = true;

			try {
				const record = await getRecord(id);
				this.note = record ? record : null;
			} catch (error) {
				this.error = error;
			} finally {
				this.loading = false;
			}
		},

		async addNote({ title, text }) {
			addRecord({
				id: getNumbersIdent(),
				date: getShortDate(),
				dateTS: getTimestampDate(),
				createTS: getTimestampFull(),
				changeTS: null,
				title,
				text,
			});
			await this.fetchNotes();
		},

		async deleteNote(noteToDelete) {
			deleteRecord(noteToDelete.id);
			await this.fetchNotes();
		},

		async updateNote({ title, text }) {
			updateRecord({
				...this.noteToUpdate,
				changeTS: getTimestampFull(),
				title,
				text,
			});
			this.noteToUpdate = null;
			await this.fetchNotes();
		},

		closingDB() {
			closeDB();
		},

		setNoteToUpdate(updateValues) {
			this.noteToUpdate = updateValues;
		},

		setIsOverlay(value) {
			this.isOverlay = value;
		},
	},
});

export default useNotesStore;
