<template>
  <div>logout</div>
</template>

<script setup>
import { AuthStore } from '@/stores/auth';
import nuxtStorage from 'nuxt-storage';

nuxtStorage.localStorage.setData('token', null);
</script>

<style scoped></style>
