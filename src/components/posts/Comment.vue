<script setup>
  defineProps(['comments'])
</script>

<template>
    <div 
      v-for="comment in comments" 
      :key="comment.id"
      class="bg-dark text-white px-5 py-3 mb-3"
    >
      <h3 class="text-warning">{{ comment.name }}</h3>
      <p class="fs-4">{{ comment.body }}</p>
    </div>
</template>