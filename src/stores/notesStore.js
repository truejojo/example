import { defineStore } from 'pinia';

const useNotesStore = defineStore('noteList', {
    state() {
        return {
            name: '',
            maxNotes: 0,
            notes: []
        }
    },

    actions: {
        seed() {
            import('../data/notes.json').then(r => {
                console.log(r);
            })
        }
    }
});

export default useNotesStore;