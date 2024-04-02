<script setup>
import { RouterLink } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useCommentStore } from '../../stores/commentStore.js';
import Comment from './Comment.vue';

defineProps(['post', 'author']);

const { getPostComments } = storeToRefs(useCommentStore());
const { fetchComments } = useCommentStore();

fetchComments();
</script>

<template>
  <header class="mb-4 bg-dark text-white px-5 py-3">
    <h1 class="display-4 me-3 text-danger">
      {{ post.title }}
    </h1>
    <p
      v-if="author"
      class=""
    >
      Written by:
      <RouterLink
        :to="`/author/${author.username}`"
        class="text-decoration-none text-info"
      >
        {{ author.name }}
      </RouterLink>
      | Comments:
      <span class="badge bg-warning text-dark">{{
        getPostComments.length
      }}</span>
    </p>
    <p class="fs-4">{{ post.body }}</p>
  </header>
  <div class="comments">
    <header class="mb-3 bg-dark text-white px-5 py-3">
      <h2>Comments:</h2>
    </header>
    <comment :comments="getPostComments"></comment>
  </div>
</template>
