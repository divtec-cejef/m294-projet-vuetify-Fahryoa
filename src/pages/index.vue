<template>
  <h1>Accueil</h1>
  <v-text-field v-model="nom" placeholder="Cherchez un pays" type="text" @input="trierEnFonctionSaisie()" />
  <v-container>
    <v-row>
      <v-col v-for="(pays, index) in lesPays"
             :key="index"
             cols="12"
             md="4"
             sm="6"
      >
        <v-img :alt="'Drapeau du pays : ' + pays.name.common" class="img" :src="pays.flags.svg" />
        <h2>{{ pays.name.common }}</h2>
        <p>{{ pays.capital[0] }}</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  // import { ref } from 'vue'
  import { useAppStore } from '@/stores/app.js'

  const nom = ref('')
  const lesPays = ref([])
  const store = useAppStore()

  function trierEnFonctionSaisie () {
    lesPays.value = []

    for (const pays of store.resources) {
      if (pays.name.common.toLowerCase().includes(nom.value.toLowerCase()) || nom.value === '') {
        lesPays.value.push(pays)
      }
    }
  }
  trierEnFonctionSaisie()
</script>
