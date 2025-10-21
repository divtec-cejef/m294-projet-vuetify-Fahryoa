<template>
  <h1>Accueil</h1>
  <div v-for="(pays, index) in store.resources" :key="index">
    <img :alt="'Drapeau du pays : ' + pays.name.common" :src="pays.flags.svg">
    <h2>{{ pays.name.common }}</h2>
    <p>{{ pays.capital[0] }}</p>
  </div>
</template>

<script setup>
  import { useAppStore } from '@/stores/app.js'

  const store = useAppStore()
</script>

<style>
  img {
    width: 200px;
    height: auto;
  }
</style>
