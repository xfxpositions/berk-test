<template>
  <button class="text-4xl text-white" @click="deneme">index</button>
</template>
<script setup>
import { AuthStore } from '@/stores/auth.js';

const store = AuthStore();

function deneme() {
  store.login({ email: 'johndoe@gmail.com', password: '123456' });
}
</script>
