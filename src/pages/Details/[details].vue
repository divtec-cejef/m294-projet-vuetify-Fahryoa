<template>
  <v-card class="mx-auto">
    <v-card-title>Nom du pays</v-card-title>
    <v-img :alt="'Drapeau du pays : ' + pays.name.common" class="img" :src="pays.flags.svg" />
    <v-card-text>Capital</v-card-text>
    <v-card-text>Continent</v-card-text>
    <v-card-text>Supérficie</v-card-text>
    <v-card-text>Population</v-card-text>
    <v-card-text>Langue officielle</v-card-text>
  </v-card>

</template>
<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
const paysName = route.params.details // ou route.params.name selon le nom du fichier

import { useAppStore } from '@/stores/app.js'
const store = useAppStore()


</script>
