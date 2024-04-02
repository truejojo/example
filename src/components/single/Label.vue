<script setup>
import { defineProps } from 'vue';

const { forProp } = defineProps({
  forProp: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <label
    :for="forProp"
    class="form-label text-light"
  >
    <slot></slot>
  </label>
</template>
