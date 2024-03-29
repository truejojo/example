<script setup>
const { bgColor, onClick } = defineProps({
    bgColor: {
        type: String
    },
    onClick: {
        type: Function,
        required: true,
    }
});
</script>

<template>
    <button 
        @click="onClick"      
        class="btn text-uppercase"
        :class="[bgColor ? bgColor : 'btn-info']" 
    >
        <slot></slot>
    </button>
</template>