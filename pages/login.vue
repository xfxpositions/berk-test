<template>
  <div class="w-full h-full flex flex-wrap justify-center gap-y-2">
    <div class="text-4xl w-full text-[aliceblue] flex justify-center">Giriş Yap</div>
    <div class="w-52 flex justify-center gap-y-4 flex-col">
      <!--Ad-->
      <div class="field field_v2">
        <input id="last-name" class="field__input text-white" placeholder="Link" @input="getYoutubeData" autocomplete="off" />
        <span class="field__label-wrap" aria-hidden="true">
          <span class="field__label text-white">Mail Adresiniz</span>
        </span>
      </div>
      <!--Soyad-->
      <div class="field field_v2">
        <input id="last-name" type="text" class="field__input text-white" placeholder="Link" @input="getYoutubeData" autocomplete="off" />
        <span class="field__label-wrap" aria-hidden="true">
          <span class="field__label text-white">Şifreniz</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import '@/assets/css/input.css';
</script>

<style scoped></style>
