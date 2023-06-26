<template>
  <div class="w-full h-full flex flex-wrap justify-center gap-y-2">
    <div class="text-4xl w-full text-[aliceblue] flex justify-center">Kayıt Ol</div>
    <div class="w-52 flex justify-center gap-y-4 flex-col">
      <!-- Ad -->
      <div class="field field_v2">
        <input
          class="field__input text-white"
          placeholder="Adınız"
          autocomplete="off"
          v-model="firstName.value.value"
          @input="validateFirstName" />
        <span class="field__label-wrap" aria-hidden="true">
          <span class="field__label text-white">Adınız</span>
        </span>
      </div>
      <div v-if="firstName.errorMessages.length > 0" class="text-red-500">
        <span v-for="message in firstName.errorMessages" :key="message">{{ message }}</span>
      </div>

      <!-- Soyad -->
      <div class="field field_v2">
        <input
          class="field__input text-white"
          placeholder="Soyadınız"
          autocomplete="off"
          v-model="lastName.value.value"
          @input="validateLastName" />
        <span class="field__label-wrap" aria-hidden="true">
          <span class="field__label text-white">Soyadınız</span>
        </span>
      </div>
      <div v-if="lastName.errorMessages.length > 0" class="text-red-500">
        <span v-for="message in lastName.errorMessages" :key="message">{{ message }}</span>
      </div>

      <!-- Email -->
      <div class="field field_v2">
        <input
          class="field__input text-white"
          placeholder="Mail Adresiniz"
          autocomplete="off"
          v-model="email.value.value"
          @input="validateEmail" />
        <span class="field__label-wrap" aria-hidden="true">
          <span class="field__label text-white">Mail Adresiniz</span>
        </span>
      </div>
      <div v-if="email.errorMessages.length > 0" class="text-red-500">
        <span v-for="message in email.errorMessages" :key="message">{{ message }}</span>
      </div>

      <!-- Phone Number -->
      <div class="field field_v2">
        <input
          type="tel"
          class="field__input text-white"
          placeholder="Tel No"
          autocomplete="off"
          v-model="phone.value.value"
          @input="validatePhone" />
        <span class="field__label-wrap" aria-hidden="true">
          <span class="field__label text-white">Tel No</span>
        </span>
      </div>
      <div v-if="phone.errorMessages.length > 0" class="text-red-500">
        <span v-for="message in phone.errorMessages" :key="message">{{ message }}</span>
      </div>

      <!-- Birth Date -->
      <div class="w-full">
        <input type="date" class="w-full" v-model="birthday.value" />
      </div>

      <!-- Gender -->
      <div class="w-full">
        <div class="w-full text-white mb-1">Cinsiyet</div>
        <select v-model="gender.value.value" class="w-full">
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
          v-model="password.value.value"
          @input="validatePassword" />
        <span class="field__label-wrap" aria-hidden="true">
          <span class="field__label text-white">Password</span>
        </span>
      </div>
      <div v-if="password.errorMessages.length > 0" class="text-red-500">
        <span v-for="message in password.errorMessages" :key="message">{{ message }}</span>
      </div>

      <!-- Confirm Password -->
      <div class="field field_v2">
        <input
          class="field__input text-white"
          placeholder="Confirm Password"
          autocomplete="off"
          type="password"
          v-model="confirmPassword.value.value"
          @input="confirmPassword.validator" />
        <span class="field__label-wrap" aria-hidden="true">
          <span class="field__label text-white">Confirm Password</span>
        </span>
      </div>
      <div v-if="confirmPassword.errorMessages.length > 0" class="text-red-500">
        <span v-for="message in confirmPassword.errorMessages" :key="message">{{ message }}</span>
      </div>

      <!-- Submit Button -->
      <div class="flex justify-center">
        <button class="bg-blue-500 text-white py-2 px-4 rounded" @click="submitForm">Submit</button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import '@/assets/css/input.css';

class ValidatorState {
  constructor(value, validators) {
    this.value = ref(value);
    this.errorMessages = [];
    this.validators = validators;
  }

  validator() {
    this.validators.forEach(validator => {
      const isValid = validator.validation(this.value.value);

      if (!isValid && !validator.error) {
        this.errorMessages.push(validator.errorMessage);
        validator.error = true;
      } else if (isValid && validator.error) {
        const index = this.errorMessages.indexOf(validator.errorMessage);
        if (index !== -1) {
          this.errorMessages.splice(index, 1);
        }
        validator.error = false;
      }
    });
  }
}

// Fields
const firstName = new ValidatorState('', [
  {
    name: 'required',
    validation: value => value !== '',
    errorMessage: 'Ad alanı boş bırakılamaz.',
    error: false
  }
]);

const lastName = new ValidatorState('', [
  {
    name: 'required',
    validation: value => value !== '',
    errorMessage: 'Soyad alanı boş bırakılamaz.',
    error: false
  }
]);

const email = new ValidatorState('', [
  {
    name: 'emailFormat',
    validation: email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
    errorMessage: 'Geçersiz e-posta formatı.',
    error: false
  }
]);

const phone = new ValidatorState('', [
  {
    name: 'required',
    validation: value => value !== '',
    errorMessage: 'Telefon numarası boş bırakılamaz.',
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

const confirmPassword = new ValidatorState('', [
  {
    name: 'passwordMatch',
    validation: value => value === password.value,
    errorMessage: 'Şifreler uyuşmuyor.',
    error: false
  }
]);

const birthday = new ValidatorState('', []);
const gender = new ValidatorState('', []);

// Validations
function validateFirstName() {
  firstName.validator();
}

function validateLastName() {
  lastName.validator();
}

function validateEmail() {
  email.validator();
}

function validatePhone() {
  phone.validator();
}

function validatePassword() {
  password.validator();
}

function validateConfirmPassword() {
  confirmPassword.validator();
}

async function submitForm() {
  if (
    firstName.errorMessages.length === 0 &&
    lastName.errorMessages.length === 0 &&
    email.errorMessages.length === 0 &&
    phone.errorMessages.length === 0 &&
    password.errorMessages.length === 0 &&
    confirmPassword.errorMessages.length === 0
  ) {
    // Perform form submission or further actions here
    console.log('Form submitted successfully');
    deneme();
  } else {
    console.log('Form validation failed');
  }
}

async function deneme() {
  const { data } = await useFetch('/api/register', {
    method: 'POST',
    query: {
      firstName: firstName.value.value,
      lastName: lastName.value.value,
      email: email.value.value,
      phone: phone.value.value,
      birthday: birthday.value.value,
      gender: gender.value.value,
      password: password.value.value
    }
  });
  console.log(data);
}
</script>
