// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/home',
    redirect: '/',
  },
  {
    path: '/posts',
    name: 'posts',
    component: () => import('../pages/Posts.vue'),
  },
  {
    path: '/post/:id',
    name: 'post',
    component: () => import('../pages/Post.vue'),
  },
  {
    path: '/authors',
    name: 'authors',
    component: () => import('../pages/Authors.vue'),
  },
  {
    path: '/author/:username',
    name: 'author',
    component: () => import('../pages/Author.vue'),
  },
  {
    path: '/composables',
    name: 'composables',
    component: () => import('../pages/Composables.vue'),
  },
  {
    path: '/notes',
    name: 'notes',
    component: () => import('../pages/Notes.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
