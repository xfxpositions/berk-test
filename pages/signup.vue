<template>
  <div class="w-full h-full flex flex-wrap justify-center gap-y-2">
    <div class="text-4xl w-full text-[aliceblue] flex justify-center">
      Kayıt Ol
    </div>
    <div class="w-52 flex justify-center gap-y-4 flex-col">
      <!--Ad-->
      <div class="field field_v2">
        <input
          class="field__input text-white"
          placeholder="Link"
          autocomplete="off"
          v-model="firstName.value"
        />
        <span class="field__label-wrap" aria-hidden="true">
          <span class="field__label text-white">Adınız</span>
        </span>
      </div>

      <!--Soyad-->
      <div class="field field_v2">
        <input
          class="field__input text-white"
          placeholder="Link"
          autocomplete="off"
          v-model="lastName.value"
        />
        <span class="field__label-wrap" aria-hidden="true">
          <span class="field__label text-white">Soyadınız</span>
        </span>
      </div>
      <!--email-->
      <div class="field field_v2">
        <input
          class="field__input text-white"
          placeholder="Link"
          autocomplete="off"
          v-model="email2.value.value"
          @input="email2.validator()"
        />
        <span class="field__label-wrap" aria-hidden="true">
          <span class="field__label text-white">Mail Adresiniz</span>
        </span>
      </div>
      <div v-if="email2.errorMessages.length > 0" class="text-red-500">
        <span v-for="message in email2.errorMessages" :key="message">{{
          message
        }}</span>
      </div>
      <!--Phone Number-->
      <div class="field field_v2">
        <input
          type="number"
          class="field__input text-white"
          placeholder="Link"
          autocomplete="off"
          v-model="phone.value.raw"
        />
        <span class="field__label-wrap" aria-hidden="true">
          <span class="field__label text-white">Tel No</span>
        </span>
      </div>
      <!--birth Date-->
      <div class="w-full">
        <input type="date" class="w-full" />
      </div>
      <!--Gender-->
      <div class="w-full">
        <select v-model="gender.value" class="w-full">
          <option value="male" class="w-full">Erkek</option>
          <option value="female" class="w-full">Kadın</option>
          <option value="?" class="w-full">Sanane</option>
        </select>
      </div>
      <!-- Password -->
      <div class="field field_v2">
        <input
          class="field__input text-white"
          placeholder="Enter your password"
          autocomplete="off"
          type="password"
          v-model="password.value"
        />
        <span class="field__label-wrap" aria-hidden="true">
          <span class="field__label text-white">Password</span>
        </span>
      </div>
      <!-- Confirm Password -->
      <div class="field field_v2">
        <input
          class="field__input text-white"
          placeholder="Confirm your password"
          autocomplete="off"
          type="password"
          v-model="confirmPassword.value"
        />
        <span class="field__label-wrap" aria-hidden="true">
          <span class="field__label text-white">Confirm Password</span>
        </span>
      </div>

      <!-- isWhatsapp -->
      <label class="w-full text-center text-white" for="whatsapp"
        >Whatsapp?</label
      >
      <input
        class="text-white"
        id="whatsapp"
        type="checkbox"
        placeholder="Whatsapp?"
      />

      <button
        class="w-full text-white border border-white rounded-md p-3"
        @click="sendRegister"
      >
        Send
      </button>
    </div>
  </div>
</template>

<script setup>
import "@/assets/css/input.css";
import { ref } from "vue";

class ValidatorState {
  constructor(value, validators) {
    this.value = ref(value);
    this.errorMessages = [];
    this.validators = validators;
  }
  validator() {
    console.log("validator");
    this.validators.forEach((validator) => {
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

const firstName = ref({ value: "", errorMessages: [] });
const lastName = ref({ value: "", errorMessages: [] });
const email2 = new ValidatorState("", [
  {
    name: "emailFormat",
    validation: (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
    errorMessage: "Invalid email format.",
    error: false,
  },
]);

const email = ref({
  value: "",
  errorMessages: [],
  validator: () => {
    console.log("validator");
    email.value.validators.forEach((validator) => {
      const isValid = validator.validation(email.value.value);

      if (!isValid && !validator.error) {
        email.value.errorMessages.push(validator.errorMessage);
        validator.error = true;
      } else if (isValid && validator.error) {
        const index = email.value.errorMessages.indexOf(validator.errorMessage);
        if (index !== -1) {
          email.value.errorMessages.splice(index, 1);
        }
        validator.error = false;
      }
    });
  },
  validators: [
    {
      name: "emailFormat",
      validation: (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
      errorMessage: "Invalid email format.",
      error: false,
    },
  ],
});
const phone = ref({
  value: { formatted: 0, raw: 0, countryCode: 0, callingCode: 0 },
  errorMessages: [],
});
const password = ref({ value: "", errorMessage: "" });
const confirmPassword = ref({ value: "", errorMessages: [] });
const birthday = ref({ value: "", errorMessage: "" });
const gender = ref({ value: "", errorMessages: [] });
const isWhatsapp = ref({ value: false, errorMessages: [] });

// validations

watch(email, (newEmail, oldEmail) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  console.log(newEmail, oldEmail);
  if (!emailRegex.test(newEmail.value)) {
    newEmail.errorMessages.push("Invalid email format");
  } else {
    newEmail.errorMessages = [];
  }
});

// const validations = reactive([
//   {
//     name: "email",
//     validation: (username) => /^[a-zA-Z0-9\-_.]+$/.test(username),
//     errorMessage:
//       "Username just can contain latin letters, special characters and numbers.",
//   },

//   {
//     name: "passwordLength",
//     validation: ({ username, password, passwordAgain }) => password.length >= 7,
//     errorMessage: "Password must be between 7 - 256 characters long.",
//   },
//   {
//     name: "passwordSpecialCharacters",
//     validation: ({ username, password, passwordAgain }) =>
//       /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password),
//     errorMessage: "Password must be contain at least one special character.",
//   },

//   {
//     name: "passwordNumericalCharacters",
//     validation: ({ username, password, passwordAgain }) =>
//       /[0-9]/.test(password),
//     errorMessage: "Password must be contain at least one numerical character.",
//   },
//   {
//     name: "passwordsMatch",
//     validation: ({ username, password, passwordAgain }) =>
//       password === passwordAgain,
//     errorMessage: "Passwords do not match.",
//   },
// ]);

function sendRegister
</script>

<style scoped></style>
isAutoAccessorPropertactivated() { },
