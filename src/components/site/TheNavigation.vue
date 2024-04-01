<script setup>
import Container from '../../wrapper/Container.vue';
</script>

<template>
    <nav class="navbar navbar-expand-lg text-light">
        <Container>
            <RouterLink class="navbar-brand text-light" :to="{name: 'home'}">Navbar</RouterLink>
            <button 
                class="navbar-toggler text-bg-light" 
                type="button" 
                data-bs-toggle="collapse" 
                data-bs-target="#navbarNav" 
                aria-controls="navbarNav" 
                aria-expanded="false" 
                aria-label="Toggle navigation"
            >
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">
                <li class="nav-item">
                    <RouterLink class="nav-link text-light text-uppercase" :to="{name: 'posts'}">Posts</RouterLink>
                </li>
                <li class="nav-item">
                    <RouterLink class="nav-link text-light text-uppercase" :to="{name: 'authors'}">Authors</RouterLink>
                </li>
                <li class="nav-item">
                    <RouterLink class="nav-link text-light text-uppercase" :to="{name: 'composables'}">Composables</RouterLink>
                </li>
                <li class="nav-item">
                    <RouterLink class="nav-link text-light text-uppercase" :to="{name: 'notes'}">Notes</RouterLink>
                </li>
            </ul>
            </div>
        </Container>
    </nav>
</template>