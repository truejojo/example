import { defineStore } from 'pinia';

const URL = 'https://jsonplaceholder.typicode.com/posts';

export const usePostStore = defineStore({
  id: 'post',

  state: () => ({
    posts: [],
    post: null,
    loading: false,
    error: null
  }),

  getters: {
    getPostsPerAuthor: (state) => {
      return (authorId) => state.posts.filter((post) => post.userId === authorId)
    }
  }, 

  actions: {
    async fetchPosts() {
      this.posts = []
      this.loading = true

      try {
        const response = await fetch(`${URL}`);
        this.posts = await response.json();
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },

    async fetchPost(id) {
      this.post = null
      this.loading = true

      try {
        const response = await fetch(`${URL}/${id}`)
        this.post = await response.json();        
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    }
  }
});