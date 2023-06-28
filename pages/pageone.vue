<template>
  <div class="w-full text-4xl text-[aliceblue] flex flex-shrink flex-wrap">
    pageone
    <div class="w-full flex flex-wrap flex-shrink">{{ NuxtStorage.localStorage.getData('token') }}</div>
  </div>
</template>
<script setup>
import NuxtStorage from 'nuxt-storage';

definePageMeta({
  middleware: ['auth']
});
</script>
