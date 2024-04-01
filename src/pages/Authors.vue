<script setup>
  import { RouterLink } from 'vue-router'
  import { storeToRefs } from 'pinia'
  import { useAuthorStore } from '../stores/authorStore'
  import InfoBox from '../components/single/InfoBox.vue';
  import Spinner from '../components/single/Spinner.vue';
  import FlexJustifyBetween from '../wrapper/FlexJustifyBetween.vue';

  const { authors, loading, error } = storeToRefs(useAuthorStore())
  const { fetchAuthors } = useAuthorStore()

  fetchAuthors()
</script>

<template>
    <InfoBox v-if="loading">
      <Spinner />
    </InfoBox>
    <InfoBox v-if="error">
      {{ error.message }}
    </InfoBox>

    <template  v-if="authors">
      <header class="mb-4">
        <FlexJustifyBetween>
          <h1 class="display-1 me-3">Autoren</h1>
          <span class="text-info badge bg-dark text-center align-self-baseline fs-5">
            Anzahl der Autoren: {{ authors.length }}
          </span>
        </FlexJustifyBetween>
      </header>
      <div class="authors">
        <p v-for="author in authors" :key="author.id" class="bg-dark text-white px-5 py-3 mb-3">
          <RouterLink 
            :to="`/author/${author.username}`"
            class="text-decoration-none text-info fs-2"
          >
            {{ author.name }}
          </RouterLink>
        </p>
      </div>
    </template>
</template>