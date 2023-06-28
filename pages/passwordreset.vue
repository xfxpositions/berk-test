<template>
  <div v-if="phoneNumber" class="w-full flex flex-wrap justify-center text-white gap-3">
    <div class="w-full flex justify-center">Telefon Numaranızı Girin</div>
    <div class="w-52">
      <div class="field field_v2">
        <input type="text" v-model="number" class="field__input text-white" placeholder="Link" @input="getYoutubeData" autocomplete="off" />
        <span class="field__label-wrap" aria-hidden="true">
          <span class="field__label text-white">Telefon Numarası</span>
        </span>
      </div>
    </div>
    <div class="w-full flex justify-center" v-if="warn">Numaranızı Doğru Girin</div>
    <div class="flex justify-center w-full">
      <button class="bg-blue-500 text-white py-2 px-4 rounded" @click="sendCode">Submit</button>
    </div>
  </div>
  <div v-if="sended" class="flex flex-wrap justify-center w-full text-white gap-3">
    <div class="w-full flex justify-center">Doğrulama Kodunu girin</div>
    <div class="w-52">
      <div class="field field_v2">
        <input
          type="text"
          v-model="code"
          maxlength="6"
          class="field__input text-white"
          placeholder="Link"
          @input="getYoutubeData"
          autocomplete="off" />
        <span class="field__label-wrap" aria-hidden="true">
          <span class="field__label text-white">Doğrulama Kodu</span>
        </span>
      </div>
    </div>
    <div class="flex justify-center w-full">
      <button class="bg-blue-500 text-white py-2 px-4 rounded" @click="submit">Submit</button>
    </div>
  </div>
  <div v-if="password" class="flex flex-wrap justify-center w-full text-white gap-3">
    <div class="w-full flex justify-center">Yeni Şifrenizi Girin</div>
    <div class="w-52">
      <div class="field field_v2">
        <input
          type="text"
          v-model="newPassword"
          maxlength="6"
          class="field__input text-white"
          placeholder="Link"
          @input="getYoutubeData"
          autocomplete="off" />
        <span class="field__label-wrap" aria-hidden="true">
          <span class="field__label text-white">Şifre</span>
        </span>
      </div>
    </div>
    <div class="flex justify-center w-full">
      <button class="bg-blue-500 text-white py-2 px-4 rounded" @click="resetPassword">Submit</button>
    </div>
  </div>
</template>

<script setup>
import '@/assets/css/input.css';
import { ref } from 'vue';

const code = ref(null);
const number = ref(null);

const phoneNumber = ref(true);
const sended = ref(false);
const password = ref(false);
const warn = ref(false);

const newPassword = ref(null);

const account = ref(null);
async function sendCode() {
  account.value = accounts.accounts.find(acc => acc.phone === number.value);
  if (account.value) {
    sended.value = true;
    phoneNumber.value = false;
    warn.value = false;
  } else {
    warn.value = true;
  }
}

async function submit() {
  if (code.value == 123456) {
    password.value = true;
    sended.value = false;
    warn.value = false;
  } else {
    warn.value = true;
  }
}

async function resetPassword() {
  const success = accounts.resetPassword({ phone: number.value, password: newPassword.value });

  if (success) {
    console.log('password reset successful');
    console.log(account.value);
    await navigateTo('/login');
  } else {
    console.log('failed to reset password');
  }
}
</script>

<style scoped></style>
