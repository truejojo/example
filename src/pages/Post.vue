<script setup>
  import { useRoute } from 'vue-router'
  import { storeToRefs } from 'pinia'
  import { useAuthorStore } from '../stores/authorStore'
  import { usePostStore } from '../stores/postStore'
  import Post from '../components/posts/Post.vue'
  import InfoBox from '../components/single/InfoBox.vue';
  import Spinner from '../components/single/Spinner.vue';

  const route = useRoute() 
  const { getPostAuthor } = storeToRefs(useAuthorStore())
  const { fetchAuthors} = useAuthorStore()
  const { post, loading, error } = storeToRefs(usePostStore())
  const { fetchPost } = usePostStore()

  fetchAuthors()
  fetchPost(route.params.id)
</script>

<template>
  <InfoBox v-if="loading">
    <Spinner />
  </InfoBox>
  <InfoBox v-if="error">
    {{ error.message }}
  </InfoBox>

    <template v-if="post">
      <Post :post="post" :author="getPostAuthor"></Post>
    </template>
</template>