<script setup>
const { id, placeholder, modelValue } = defineProps({
  id: {
    type: String,
    required: true
  },
  placeholder: {
    type: String,
    required: true
  },
  modelValue: {
    type: String,
    required: true
  }
});

const emit = defineEmits(['update:modelValue']);
</script>

<template>
    <textarea 
        :value="modelValue" 
        @input="emit('update:modelValue', $event.target.value)" 
        :id="id" 
        :placeholder="placeholder" 
        class="form-control" 
        rows="3"
    ></textarea>
</template>