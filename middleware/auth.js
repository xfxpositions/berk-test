import { AuthStore } from '@/stores/auth.js';

export default defineNuxtRouteMiddleware((to, from) => {
  const store = AuthStore();
  //check if store contains token
  console.log(to, from);
});
