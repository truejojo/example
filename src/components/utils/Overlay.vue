<template>
     <div class="overlay d-flex justify-content-center align-items-center">
        <div class="bg-black border border-info mx-4 my-2 overlay-inside">
            <slot></slot>
        </div>
    </div>
</template>

<style scoped>
.overlay {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgb(0, 0, 0, .85);
    z-index: 9999;
}
.overlay-inside {
    padding: 3em 7.5em;
    width: 100%;
    max-width: 800px;
}
</style>