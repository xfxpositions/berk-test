<template>
  <div @keyup.enter="submitForm" class="w-full h-full flex flex-wrap justify-center gap-y-2 text-[aliceblue]">
    <div class="text-4xl w-full text-[aliceblue] flex justify-center">Giriş Yap</div>

    <div class="w-52 flex justify-center gap-y-4 flex-col">
      <!--Ad-->
      <div class="field field_v2">
        <input v-model="phone.value" class="field__input text-white" placeholder="Link" autocomplete="off" />
        <span class="field__label-wrap" aria-hidden="true">
          <span class="field__label text-white">Telefon Numaranız</span>
        </span>
      </div>
      <ValidatorStateErrorHandler :validator-object="phone" />
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
import validator from 'validator';

const phone = new ValidatorState('', [
  {
    name: 'required',
    validation: value => value !== '',
    errorMessage: 'Numara alanı boş bırakılamaz.',
    error: false
  },
  {
    name: 'phoneValidation',
    validation: value => validator.isMobilePhone(value),
    errorMessage: 'Geçerli bir telefon numarası olmalı',
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
  phone.validator();
  if (phone.errorMessages.length == 0 && password.errorMessages.length == 0) {
    const { data } = await useFetch('/api/phone_login', {
      method: 'POST',
      query: {
        phone: phone.value,
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
