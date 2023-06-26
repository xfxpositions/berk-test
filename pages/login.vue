<template>
  <div class="w-full h-full flex flex-wrap justify-center gap-y-2">
    <div class="text-4xl w-full text-[aliceblue] flex justify-center">Giriş Yap</div>
    <div class="w-52 flex justify-center gap-y-4 flex-col">
      <!--Ad-->
      <div class="field field_v2">
        <input
          id="last-name"
          v-model="email"
          class="field__input text-white"
          placeholder="Link"
          @input="getYoutubeData"
          autocomplete="off" />
        <span class="field__label-wrap" aria-hidden="true">
          <span class="field__label text-white">Mail Adresiniz</span>
        </span>
      </div>
      <!--Soyad-->
      <div class="field field_v2">
        <input
          id="last-name"
          type="text"
          v-model="password"
          class="field__input text-white"
          placeholder="Link"
          @input="getYoutubeData"
          autocomplete="off" />
        <span class="field__label-wrap" aria-hidden="true">
          <span class="field__label text-white">Şifreniz</span>
        </span>
      </div>
      <div v-if="failed" class="text-red-500">Kullanıcı Adı veya şifre hatalı</div>
      <div class="flex justify-center">
        <button class="bg-blue-500 text-white py-2 px-4 rounded" @click="submitForm">Submit</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import '@/assets/css/input.css';
import { AccountsStore } from '@/stores/accounts.js';
import { AuthStore } from '@/stores/auth.js';

const auth = AuthStore();
const accounts = AccountsStore();
const email = ref(null);
const password = ref(null);

const failed = ref(false);

async function submitForm() {
  const { data } = await useFetch('/api/login', {
    method: 'POST',
    query: {
      email: email.value,
      password: password.value
    }
  });
  if (toRaw(data.value)) {
    auth.login(data.value);
  } else {
    console.log('failed to login');
  }
}
</script>

<style scoped></style>
