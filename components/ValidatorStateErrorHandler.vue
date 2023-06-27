<template>
  <div v-if="validatorObject.errorMessages.length > 0" class="text-red-500">
    <p v-for="message in validatorObject.errorMessages" :key="message">
      {{ message }}
    </p>
  </div>
</template>
<script setup>
const { validatorObject } = defineProps(["validatorObject"]);
</script>
