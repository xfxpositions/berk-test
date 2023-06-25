import { useAuthStore } from "@/stores/auth.js";

export default defineNuxtRouteMiddleware((to, from) => {
  const store = useAuthStore();
  //check if store contains token
  console.log(to, from);
});
