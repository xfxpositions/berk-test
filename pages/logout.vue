<template>
  <div>logout</div>
</template>

<script setup>
import { AuthStore } from '@/stores/auth';

const auth = AuthStore();

auth.logout();
</script>

<style scoped></style>
