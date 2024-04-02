<script setup>
import { RouterLink } from 'vue-router';
import { storeToRefs } from 'pinia';
import { usePostStore } from '../stores/postStore.js';
import InfoBox from '../components/single/InfoBox.vue';
import Spinner from '../components/single/Spinner.vue';
import FlexJustifyBetween from '../wrapper/FlexJustifyBetween.vue';

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

  <template v-if="posts">
    <header class="mb-4">
      <FlexJustifyBetween>
        <h1 class="display-1 me-3">Posts</h1>
        <span
          class="text-danger badge bg-dark text-center align-self-baseline fs-5"
        >
          Anzahl der Posts: {{ posts.length }}
        </span>
      </FlexJustifyBetween>
    </header>

    <div class="posts">
      <article
        v-for="post in posts"
        :key="post.id"
        class="bg-dark text-white px-5 py-3 mb-3"
      >
        <RouterLink
          :to="`/post/${post.id}`"
          class="text-decoration-none text-danger fs-2"
        >
          {{ post.title }}
        </RouterLink>
        <p class="fs-4">{{ post.body }}</p>
      </article>
    </div>
  </template>
</template>
