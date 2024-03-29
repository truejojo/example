import { defineStore } from 'pinia';

const useNotesStore = defineStore('notes', {
    state() {
        return {
            name: '',
            spots: 30,
            notes: []
        }
    },
});

export default useNotesStore;