<template>
  <div class="w-full text-4xl text-[aliceblue] flex flex-shrink flex-wrap">
    pageone
    <div class="w-full flex flex-wrap flex-shrink">{{ NuxtStorage.localStorage.getData('token') }}</div>
  </div>
</template>
<script setup>
import { AuthStore } from '@/stores/auth.js';
import NuxtStorage from 'nuxt-storage';

const store = AuthStore();

definePageMeta({
  middleware: ['auth']
});
</script>
