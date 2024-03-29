<script setup>
const { noteList } = defineProps({
    noteList: {
        type: Object,
        required: true
    }
})
</script>

<template>
    <div class="bg-dark text-light my-4 py-3 px-2 rounded">

        <p class="text-uppercase text-center m-0">
            Noch mögliche <span class="badge bg-info text-dark"> {{ noteList.maxNotes - noteList.notes.length }}</span> Notizen!
        </p>
    </div>
</template>