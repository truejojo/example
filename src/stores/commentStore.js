import { defineStore } from 'pinia';
import { usePostStore } from './postStore.js';

export const useCommentStore = defineStore({
  id: 'comment',

  state: () => ({
    comments: []
  }),

  getters: {
    getPostComments: (state) => {
      const postStore = usePostStore()
      return state.comments.filter((comment) => comment.postId === postStore.post.id)
    }
  },

  actions: {
    async fetchComments() {
      const response = await fetch('https://jsonplaceholder.typicode.com/comments');
      this.comments = await response.json();
    }
  }
});