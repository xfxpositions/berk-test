<template>
  <div
    class="w-full h-full flex flex-wrap justify-center gap-y-2 text-[aliceblue]"
  >
    <div class="text-4xl w-full text-[aliceblue] flex justify-center">
      Giriş Yap
    </div>
    <div class="flex justify-center gap-4 w-full">
      <div class="cursor-pointer">Email</div>
      <div class="cursor-pointer">Phone</div>
    </div>
    <VeeForm as="div" @submit.prevent="() => {}">
      <form @submit.prevent="submitForm">
        <div class="w-52 flex justify-center gap-y-4 flex-col">
          <!--Ad-->
          <div class="field field_v2">
            <Field
              id="last-name"
              v-model="phone"
              class="field__input text-white"
              placeholder="Phone Number"
              autocomplete="off"
              type="text"
              name="phone"
              :rules="phoneNumberSchema"
            />
            <span class="field__label-wrap" aria-hidden="true">
              <span class="field__label text-white">Telefon Numaranız</span>
            </span>
          </div>
          <ErrorMessage name="phone" class="text-sm block" />

          <div class="flex justify-center">
            <button class="bg-blue-500 text-white py-2 px-4 rounded">
              Submit
            </button>
          </div>
        </div>
      </form>
    </VeeForm>
  </div>
</template>

<script setup>
import { ref } from "vue";
import nuxtStorage from "nuxt-storage";
import "@/assets/css/input.css";
import { AccountsStore } from "@/stores/accounts.js";
import { AuthStore } from "@/stores/auth.js";
import { Form as VeeForm, Field, ErrorMessage } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as zod from "zod";

class ValidatorState {
  constructor(value, validators) {
    this.value = ref(value);
    this.errorMessages = [];
    this.validators = validators;
  }

  validator() {
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

const phoneNumberSchema = toTypedSchema(
  zod
    .string({
      required_error: "Bu Alan Boş Bırakılamaz",
      invalid_type_error: "Bu Alan Boş Bırakılamaz",
    })
    .nonempty("Boş Bırakılamaz")
    .refine((value) => /^\d{10}$/.test(value), {
      message: "Geçerli bir telefon numarası olmalı",
    })
);

const loginType = ref("email");

const auth = AuthStore();
const accounts = AccountsStore();
const email = ref(null);
const password = ref(null);
const phone = ref("");
const failed = ref(false);

async function submitForm() {
  const validation = await phoneNumberSchema.parse(phone);
  if (validation.success) {
    // The validation is true, you can send something here
    console.log("WOOOW");
    const { data } = await useFetch("/api/phoneverification", {
      method: "POST",
      query: {
        phone: phone.value,
      },
    });
    console.log(data);
  } else {
    console.log("FUCK");

    // The validation failed, don't send something
  }
}
</script>

<style scoped></style>
