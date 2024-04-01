import { defineStore } from 'pinia';
import { usePostStore } from './postStore.js';

const URL = 'https://jsonplaceholder.typicode.com';

export const useAuthorStore = defineStore({
  id: 'author',

  state: () => ({
    authors: [],
    loading: false,
    error: null,
  }),

  getters: {
    getPostAuthor: (state) => {
      const postStore = usePostStore();
      return state.authors.find((author) => author.id === postStore.post.userId);
    }
  },

  actions: {
    async fetchAuthors() {
      this.authors = [];
      this.loading = true;

      try {
        const response = await fetch(`${URL}/users`);
        this.authors = await response.json();
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    }
  }
});
