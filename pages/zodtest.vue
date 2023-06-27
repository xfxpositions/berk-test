<template>
  <Form>
    <Field name="phone" class="field field_v2" :rules="fieldSchema">
      <input
        class="field__input text-white"
        placeholder="Phone Number"
        autocomplete="off"
        type="text"
      />
      <span class="field__label-wrap" aria-hidden="true">
        <span class="field__label text-white">Telefon Numaranız</span>
      </span>
    </Field>
    <ErrorMessage class="text-white" name="phone" />
  </Form>
</template>
<script setup>
import "@/assets/css/input.css";
import { Form, Field, ErrorMessage } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as zod from "zod";
const fieldSchema = toTypedSchema(
  zod.string().nonempty("Field is required").email("Must be a valid email")
);
</script>
