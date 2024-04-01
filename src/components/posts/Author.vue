<script setup>
  import { RouterLink } from 'vue-router'

  defineProps(['author', 'posts'])
</script>

<template>
  <div class="author">
    <header class="mb-4 bg-dark text-white px-5 py-3">
      <h1 class="display-4 me-3 text-info">{{author.name}}</h1>
      <p>Has written <span class="badge bg-danger text-dark">{{posts.length}}</span> posts.</p>
    </header>
    <p 
      v-for="post in posts" 
      :key="post.id"
      class="mb-3 bg-dark px-5 py-3"
    >
      <RouterLink 
        :to="`/post/${post.id}`"
        class="text-decoration-none text-danger fs-2"
      >
        {{ post.title }}
      </RouterLink>
    </p>
  </div>
</template>