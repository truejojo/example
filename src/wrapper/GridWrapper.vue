<template>
    <div class="grid-wrapper">
        <slot></slot>
    </div>
</template>

<style scoped>
.grid-wrapper {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    grid-gap: 16px;
}
</style>
