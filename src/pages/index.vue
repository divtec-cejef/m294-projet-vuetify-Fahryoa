<template>
  <h1>Accueil</h1>
  <v-select
    v-model="continentSaisi"
    item-title="nomAffichage"
    item-value="nomAPI"
    :items="lesContinents"
    label="Continents"
    @update:model-value="trierEnFonctionSaisie()"
  />
  <v-text-field v-model="saisie" placeholder="Rechercher un pays" @input="trierEnFonctionSaisie()" />
  <v-container>
    <v-row>
      <v-col
        v-for="(pays, index) in lesPays"
        :key="index"
        cols="12"
        md="4"
        sm="6"
      >
        <carte-pays :pays="pays" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  import { ref } from 'vue'
  import { useAppStore } from '@/stores/app.js'

  const lesContinents = [
    { nomAPI: 'Tous', nomAffichage: 'Global' },
    { nomAPI: 'Europe', nomAffichage: 'Europe' },
    { nomAPI: 'Asia', nomAffichage: 'Asie' },
    { nomAPI: 'Americas', nomAffichage: 'Amérique' },
    { nomAPI: 'Oceania', nomAffichage: 'Océanie' },
    { nomAPI: 'Africa', nomAffichage: 'Afrique' },
    { nomAPI: 'Antarctic', nomAffichage: 'Antarctique' },
  ]
  const saisie = ref('')
  const continentSaisi = ref(lesContinents[0].nomAPI)
  const lesPays = ref([])
  const store = useAppStore()

  function trierEnFonctionSaisie () {
    lesPays.value = []

    for (const pays of store.resources) {
      if ((pays.name.common.toLowerCase().includes(saisie.value.toLowerCase()) || saisie.value === '') && (pays.region === continentSaisi.value || continentSaisi.value === 'Tous')) {
        lesPays.value.push(pays)
      }
    }
  }

  trierEnFonctionSaisie()
</script>

<style scoped>

</style>
