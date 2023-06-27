<template>
  <div class="w-full h-full flex flex-wrap justify-center gap-y-2">
    <div class="text-4xl w-full text-[aliceblue] flex justify-center">
      Kayıt Ol
    </div>
    <div class="w-52 flex justify-center gap-y-4 flex-col">
      <!-- Ad -->
      <div class="field field_v2">
        <input
          class="field__input text-white"
          placeholder="Adınız"
          autocomplete="off"
          v-model="firstName.value"
          @input="firstName.validator"
        />
        <span class="field__label-wrap" aria-hidden="true">
          <span class="field__label text-white">Adınız</span>
        </span>
      </div>

      <ValidatorStateErrorHandler :validator-object="firstName" />

      <!-- Soyad -->
      <div class="field field_v2">
        <input
          class="field__input text-white"
          placeholder="Soyadınız"
          autocomplete="off"
          v-model="lastName.value"
          @input="lastName.validator"
        />
        <span class="field__label-wrap" aria-hidden="true">
          <span class="field__label text-white">Soyadınız</span>
        </span>
      </div>
      <ValidatorStateErrorHandler :validator-object="lastName" />

      <!-- Email -->
      <div class="field field_v2">
        <input
          class="field__input text-white"
          placeholder="Mail Adresiniz"
          autocomplete="off"
          v-model="email.value"
          @input="email.validator"
        />
        <span class="field__label-wrap" aria-hidden="true">
          <span class="field__label text-white">Mail Adresiniz</span>
        </span>
      </div>

      <ValidatorStateErrorHandler :validator-object="email" />

      <!-- Phone Number -->
      <div class="field field_v2">
        <input
          type="tel"
          class="field__input text-white"
          placeholder="Tel No"
          autocomplete="off"
          v-model="phone.value"
          @input="phone.validator"
        />
        <span class="field__label-wrap" aria-hidden="true">
          <span class="field__label text-white">Tel No</span>
        </span>
      </div>

      <ValidatorStateErrorHandler :validator-object="phone" />

      <!-- Birth Date -->
      <div class="w-full">
        <input type="date" class="w-full" v-model="birthday.value" />
      </div>

      <!-- Gender -->
      <div class="w-full">
        <div class="w-full text-white mb-1">Cinsiyet</div>
        <select v-model="gender.value" class="w-full">
          <option value="male">Erkek</option>
          <option value="female">Kadın</option>
          <option value="?">Sanane</option>
        </select>
      </div>

      <!-- Password -->
      <div class="field field_v2">
        <input
          class="field__input text-white"
          placeholder="Password"
          autocomplete="off"
          type="password"
          v-model="password.value"
          @input="password.validator"
        />
        <span class="field__label-wrap" aria-hidden="true">
          <span class="field__label text-white">Password</span>
        </span>
      </div>
      <ValidatorStateErrorHandler :validator-object="password" />
      <!-- Confirm Password -->
      <div class="field field_v2">
        <input
          class="field__input text-white"
          placeholder="Confirm Password"
          autocomplete="off"
          type="password"
          v-model="confirmPassword.value"
          @input="confirmPassword.validator"
        />
        <span class="field__label-wrap" aria-hidden="true">
          <span class="field__label text-white">Confirm Password</span>
        </span>
      </div>

      <ValidatorStateErrorHandler :validator-object="confirmPassword" />

      <!-- Submit Button -->
      <div class="flex justify-center">
        <button
          class="bg-blue-500 text-white py-2 px-4 rounded"
          @click="submitForm"
        >
          Submit
        </button>
      </div>
      <modal :is-open.sync="isModalOpen" @on-code="onOtpCode" />
      <button class="text-white" @click="openModal">Deneme</button>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import "@/assets/css/input.css";
import ValidatorState from "../utils/validatorState.js";
import validator from "validator";
import ValidatorStateErrorHandler from "../components/ValidatorStateErrorHandler.vue";
import modal from "../components/modal.vue";

const isModalOpen = ref(false);

function onOtpCode(code) {
  deneme();
  isModalOpen.value = false;
  console.log(code);
}
// Fields
const firstName = new ValidatorState("", [
  {
    name: "required",
    validation: (value) => value !== "",
    errorMessage: "Ad alanı boş bırakılamaz.",
    error: false,
  },
]);

const lastName = new ValidatorState("", [
  {
    name: "required",
    validation: (value) => value !== "",
    errorMessage: "Soyad alanı boş bırakılamaz.",
    error: false,
  },
]);

const email = new ValidatorState("", [
  {
    name: "emailFormat",
    validation: (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
    errorMessage: "Geçersiz e-posta formatı.",
    error: false,
  },
]);

const phone = new ValidatorState("", [
  {
    name: "required",
    validation: (value) => value !== "",
    errorMessage: "Telefon numarası boş bırakılamaz.",
    error: false,
  },
  {
    name: "phoneValidation",
    validation: (value) => validator.isMobilePhone(value),
    errorMessage: "Geçerli bir telefon numarası olmalı",
    error: false,
  },
]);

const password = new ValidatorState("", [
  {
    name: "required",
    validation: (value) => value !== "",
    errorMessage: "Şifre alanı boş bırakılamaz.",
    error: false,
  },
  {
    name: "length",
    validation: (value) => value.length >= 7 && value.length <= 256,
    errorMessage: "Şifre uzunluğu 7-256 karakter arasında olmalıdır.",
    error: false,
  },
  {
    name: "specialChar",
    validation: (value) => /[!@#$%^&*(),.?":{}|<>]/.test(value),
    errorMessage: "Şifre en az bir özel karakter içermelidir.",
    error: false,
  },
  {
    name: "uppercase",
    validation: (value) => /[A-Z]/.test(value),
    errorMessage: "Şifre en az bir büyük harf içermelidir.",
    error: false,
  },
  {
    name: "number",
    validation: (value) => /[0-9]/.test(value),
    errorMessage: "Şifre en az bir rakam içermelidir.",
    error: false,
  },
]);

const confirmPassword = new ValidatorState("", [
  {
    name: "passwordMatch",
    validation: (value) => value === password.value,
    errorMessage: "Şifreler uyuşmuyor.",
    error: false,
  },
]);

const birthday = new ValidatorState("", []);
const gender = new ValidatorState("", []);

function openModal() {
  isModalOpen.value = true;
  console.log("NAN");
}

async function submitForm() {
  firstName.validator();
  lastName.validator();
  password.validator();
  email.validator();
  confirmPassword.validator();
  if (
    firstName.errorMessages.length === 0 &&
    lastName.errorMessages.length === 0 &&
    email.errorMessages.length === 0 &&
    phone.errorMessages.length === 0 &&
    password.errorMessages.length === 0 &&
    confirmPassword.errorMessages.length === 0
  ) {
    // Perform form submission or further actions here
    console.log("Form submitted successfully");
  } else {
    console.log("Form validation failed");
  }
}

import { AccountsStore } from "@/stores/accounts";

const accounts = AccountsStore();

async function deneme() {
  const { data } = await useFetch("/api/register", {
    method: "POST",
    query: {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      phone: phone.value,
      birthday: birthday.value,
      gender: gender.value,
      password: password.value,
    },
  });
  accounts.addAccount(data.value);
}
</script>
