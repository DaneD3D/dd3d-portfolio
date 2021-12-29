import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('../pages/HomePage.vue'),
  },
  {
    path: '/login',
    component: () => import('/@/pages/LoginPage.vue'),
  },
  {
    path: '/todo',
    component: () => import('/@/pages/TodoPage.vue'),
  },
  {
    path: '/test',
    component: () => import('/@/pages/TestPage.vue'),
  },
];

export const Router = createRouter({
  scrollBehavior: () => ({ left: 0, top: 0 }),
  history: createWebHistory(),
  routes,
});
