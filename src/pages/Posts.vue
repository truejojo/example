<script setup>
  import { RouterLink } from 'vue-router';
  import { storeToRefs } from 'pinia';
  import { usePostStore } from '../stores/postStore.js';

  import InfoBox from '../components/single/InfoBox.vue';
  import Spinner from '../components/single/Spinner.vue';

  /**
   * Um die Reaktivität bei der Destrukturierung reaktiver 
   * Eigenschaften wie Zustandseigenschaften und Getter 
   * innerhalb eines Pinia-Speichers aufrechtzuerhalten, 
   * haben wir die Funktion „storeToRefs()“ verwendet
   */
  const { posts, loading, error } = storeToRefs(usePostStore());
  
  /**
   * Für Aktionen kann die Destrukturierung hingegen ohne 
   * weitere Überlegungen eingesetzt werden
   */
  const { fetchPosts } = usePostStore();

  fetchPosts();
</script>

<template>
  <InfoBox v-if="loading">
    <Spinner />
  </InfoBox>
  <InfoBox v-if="error">
    {{ error.message }}
  </InfoBox>

  <p v-if="posts" v-for="post in posts" :key="post.id">
    <RouterLink :to="`/post/${post.id}`">{{ post.title }}</RouterLink>
    <p>{{ post.body }}</p>
  </p>
</template>