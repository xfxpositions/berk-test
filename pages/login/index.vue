<template>
  <div @keyup.enter="submitForm" class="w-full h-full flex flex-wrap justify-center gap-y-2 text-[aliceblue]">
    <div class="text-4xl w-full text-[aliceblue] flex justify-center">Giriş Yap</div>

    <div class="w-52 flex justify-center gap-y-4 flex-col">
      <!--Ad-->
      <div class="field field_v2">
        <input v-model="email.value" class="field__input text-white" placeholder="Link" autocomplete="off" />
        <span class="field__label-wrap" aria-hidden="true">
          <span class="field__label text-white">Mail Adresiniz</span>
        </span>
      </div>
      <ValidatorStateErrorHandler :validator-object="email" />
      <!--Password-->
      <div class="field field_v2">
        <input
          type="password"
          v-model="password.value"
          class="field__input text-white"
          placeholder="Link"
          @input="getYoutubeData"
          autocomplete="off" />
        <span class="field__label-wrap" aria-hidden="true">
          <span class="field__label text-white">Şifreniz</span>
        </span>
      </div>
      <ValidatorStateErrorHandler :validator-object="password" />

      <div v-if="failed" class="text-red-500">Kullanıcı Adı veya şifre hatalı</div>
      <NuxtLink to="/passwordreset" class="w-full flex justify-end">Şifremi unuttum</NuxtLink>

      <div class="flex justify-center">
        <button class="bg-blue-500 text-white py-2 px-4 rounded" @click="submitForm">Submit</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import nuxtStorage from 'nuxt-storage';
import '@/assets/css/input.css';
import { AccountsStore } from '@/stores/accounts.js';
import { AuthStore } from '@/stores/auth.js';
import ValidatorState from '@/utils/validatorState';

const loginType = ref('email');

const email = new ValidatorState('', [
  {
    name: 'emailFormat',
    validation: email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
    errorMessage: 'Geçersiz e-posta formatı.',
    error: false
  }
]);

const password = new ValidatorState('', [
  {
    name: 'required',
    validation: value => value !== '',
    errorMessage: 'Şifre alanı boş bırakılamaz.',
    error: false
  }
]);

const failed = ref(false);

async function submitForm() {
  password.validator();
  email.validator();
  if (email.errorMessages.length == 0 && password.errorMessages.length == 0) {
    const { data } = await useFetch('/api/login', {
      method: 'POST',
      query: {
        email: email.value,
        password: password.value
      }
    });
    if (toRaw(data.value)) {
      nuxtStorage.localStorage.setData('token', data.value, 15);
      await navigateTo('/pageone');
    } else {
      failed.value = true;
      console.log('failed to login');
    }
  }
}
</script>

<style scoped></style>
