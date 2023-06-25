<template>
  <div class="text-4xl text-[aliceblue]">pageone</div>
</template>
<script setup>
import { useAuthStore } from "@/stores/auth.js";

const store = useAuthStore();
console.log(store.token);

definePageMeta({
  middleware: ["auth"],
});
</script>
