<template>
  <div
    class="w-full h-full flex flex-wrap justify-center gap-y-2 text-[aliceblue]"
  >
    <div class="text-4xl w-full text-[aliceblue] flex justify-center">
      Giriş Yap
    </div>
    <div class="w-52 flex justify-center gap-y-4 flex-col">
      <!--Numara-->
      <div class="field field_v2">
        <input
          id="last-name"
          v-model="phone.value"
          class="field__input text-white"
          placeholder="Link"
          autocomplete="off"
        />
        <span class="field__label-wrap" aria-hidden="true">
          <span class="field__label text-white">Telefon Numaraniz</span>
        </span>
      </div>
      <div
        v-for="message in phone.errorMessages"
        class="text-red-500"
        :key="message"
      >
        {{ message }}
      </div>
      <div class="flex justify-center">
        <button
          class="bg-blue-500 text-white py-2 px-4 rounded"
          @click="submitForm"
        >
          Submit
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import validator from "validator";
import ValidatorState from "../utils/validatorState.js";
import "../assets/css/input.css";
const phone = new ValidatorState("", [
  {
    name: "required",
    validation: (value) => value !== "",
    errorMessage: "Ad alanı boş bırakılamaz.",
    error: false,
  },
  {
    name: "phoneValidation",
    validation: (value) => validator.isMobilePhone(value),
    errorMessage: "Geçerli bir telefon numarası olmalı",
    error: false,
  },
]);

async function submitForm() {
  await phone.validator();
  console.log(phone.errorMessages, phone.errorMessages.length > 0);
  console.log("submit");
}
</script>
