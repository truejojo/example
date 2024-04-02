<script setup>
const { id, placeholder, modelValue } = defineProps({
  id: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    required: true,
  },
  modelValue: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['update:modelValue']);
</script>

<template>
  <input
    :value="modelValue"
    @input="emit('update:modelValue', $event.target.value)"
    :id="id"
    :placeholder="placeholder"
    type="text"
    class="form-control"
  />
</template>
