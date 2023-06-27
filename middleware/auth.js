import { AuthStore } from '@/stores/auth.js';
import nuxtStorage from 'nuxt-storage';

export default defineNuxtRouteMiddleware((to, from, next) => {
  const store = AuthStore();
  const token = nuxtStorage.localStorage.getData('token');
  console.log(store.token);

  if (token == null) {
    return navigateTo('/login');
  } else {
    console.log('pass');
  }
});
