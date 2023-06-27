<template>
  <div class="w-full flex flex-wrap justify-center text-white">
    <div class="flex gap-3">
      <NuxtLink to="/login">E-mail ile Giriş</NuxtLink>
      <NuxtLink to="/login/phone_login">Telefon Numarası ile Giriş</NuxtLink>
    </div>
    <div class="w-full">
      <NuxtPage />
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.router-link-exact-active {
  color: rgb(37, 233, 86);
}
</style>
