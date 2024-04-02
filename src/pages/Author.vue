<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useAuthorStore } from '../stores/authorStore';
import { usePostStore } from '../stores/postStore';
import Author from '../components/posts/Author.vue';
import InfoBox from '../components/single/InfoBox.vue';
import Spinner from '../components/single/Spinner.vue';

const route = useRoute();
const { authors, loading, error } = storeToRefs(useAuthorStore());
const { getPostsPerAuthor } = storeToRefs(usePostStore());
const { fetchPosts } = usePostStore();

const getAuthorByUserName = computed(() => {
  return authors.value.find(
    (author) => author.username === route.params.username
  );
});

fetchPosts();
</script>

<template>
  <InfoBox v-if="loading">
    <Spinner />
  </InfoBox>
  <InfoBox v-if="error">
    {{ error.message }}
  </InfoBox>

  <author
    v-if="getAuthorByUserName"
    :author="getAuthorByUserName"
    :posts="getPostsPerAuthor(getAuthorByUserName.id)"
  >
  </author>
</template>
