import { AuthStore } from '@/stores/auth.js';

export default defineNuxtRouteMiddleware((to, from, next) => {
  const store = AuthStore();
  console.log(store.token);

  if (store.token == null) {
    return navigateTo('/login');
  } else {
    console.log('pass');
  }
});
