<template>
  <div @keyup.enter="submitForm" class="w-full h-full flex flex-wrap justify-center gap-y-2 text-[aliceblue]">
    <div class="text-4xl w-full text-[aliceblue] flex justify-center">Giriş Yap</div>
    <div class="w-52 flex justify-center gap-y-4 flex-col">
      <!--Numara-->
      <div v-if="phoneOpen" class="w-full flex justify-center gap-y-4 flex-col">
        <div class="field field_v2">
          <input id="last-name" v-model="phone.value" class="field__input text-white" placeholder=" " autocomplete="off" />
          <span class="field__label-wrap" aria-hidden="true">
            <span class="field__label text-white">Telefon Numaraniz</span>
          </span>
        </div>
        <div v-for="message in phone.errorMessages" class="text-red-500" :key="message">
          {{ message }}
        </div>
        <div class="flex flex-wrap justify-center">
          <div class="text-red-400 block" v-if="phoneNotFound">Numara bulunamadı</div>
          <button class="bg-blue-500 text-white py-2 px-4 rounded" @click="submitForm">Submit</button>
        </div>
      </div>
      <div v-if="otpSent" class="flex justify-center flex-wrap gap-3 w-full">
        <div class="field field_v2">
          <input id="last-name" v-model="otpCode" class="field__input text-white" placeholder="123123" autocomplete="off" />
          <span class="field__label-wrap" aria-hidden="true">
            <span class="field__label text-white">Doğrulama kodunu giriniz</span>
          </span>
        </div>
        <button class="bg-blue-500 text-white py-2 px-4 rounded" @click="verifyOtp">Doğrula</button>
        <div v-if="otpFailed" class="text-red-400 block">Kod yanlış</div>
      </div>
      <div v-if="passwordOpen" class="flex justify-center flex-wrap gap-3 w-full">
        <div class="field field_v2">
          <input id="last-name" v-model="password" class="field__input text-white" placeholder=" " autocomplete="off" />
          <span class="field__label-wrap" aria-hidden="true">
            <span class="field__label text-white">Şifrenizi Girin</span>
          </span>
        </div>
        <button class="bg-blue-500 text-white py-2 px-4 rounded" @click="sendLogin">Giriş Yap</button>
        <div v-if="passwordFailed" class="text-red-400 block">Şifre yanlış</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import validator from 'validator';
import ValidatorState from '@/utils/validatorState.js';
import { AccountsStore } from '@/stores/accounts.js';
import '@/assets/css/input.css';
import nuxtStorage from 'nuxt-storage';

const accounts = AccountsStore();

const phoneOpen = ref(true);
const phoneNotFound = ref(false);
const otpSent = ref(false);
const otpCode = ref('');
const otpFailed = ref(false);
const passwordOpen = ref(false);
const passwordFailed = ref(false);
const password = ref(null);

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

async function verifyOtp() {
  if (otpCode.value == '123123') {
    otpFailed.value = false;
    otpSent.value = false;
    passwordOpen.value = true;
  } else {
    otpFailed.value = true;
  }
}

const account = ref(null);

async function submitForm() {
  await phone.validator();
  account.value = accounts.accounts.find(acc => acc.phone === phone.value);
  if (phone.errorMessages.length == 0 && account) {
    otpSent.value = true;
    phoneOpen.value = false;
    console.log('submit');
  } else {
    phoneNotFound.value = true;
  }
}

async function sendLogin() {
  const { data } = await useFetch('/api/phone_login', {
    method: 'POST',
    query: {
      phone: account.value.phone,
      password: password.value
    }
  });
  if (toRaw(data.value)) {
    nuxtStorage.localStorage.setData('token', data.value, 15);
    await navigateTo('/pageone');
  } else {
    passwordFailed.value = true;
    console.log('failed to login');
  }
}
</script>
