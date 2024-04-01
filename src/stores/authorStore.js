import { defineStore } from 'pinia';
import { usePostStore } from './postStore.js';

export const useAuthorStore = defineStore({
  id: 'author',

  state: () => ({
    authors: [],
  }),

  getters: {
    getPostAuthor: (state) => {
      const postStore = usePostStore();
      return state.authors.find((author) => author.id === postStore.post.userId);
    }
  },

  actions: {
    async fetchAuthors() {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      this.authors = await response.json();
    }
  }
});
