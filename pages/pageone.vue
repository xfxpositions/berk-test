<template>
  <div class="text-4xl text-[aliceblue]">pageone {{ store.email }}</div>
</template>
<script setup>
import { AuthStore } from '@/stores/auth.js';

const store = AuthStore();

definePageMeta({
  middleware: ['auth']
});
</script>
