<template>
  <h1 class="text-center">Accueil</h1>
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
      <v-col v-if="lesPays.length === 0" cols="12" md="12" sm="12">
        <v-card>
          <v-card-title>Aucun pays trouvée</v-card-title>
        </v-card>
      </v-col>
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

  // Les continents avec le nom que leur donne l'API et le nom avec lequel je les affiche
  const lesContinents = [
    { nomAPI: 'Tous', nomAffichage: 'Global' },
    { nomAPI: 'Europe', nomAffichage: 'Europe' },
    { nomAPI: 'Asia', nomAffichage: 'Asie' },
    { nomAPI: 'Americas', nomAffichage: 'Amérique' },
    { nomAPI: 'Oceania', nomAffichage: 'Océanie' },
    { nomAPI: 'Africa', nomAffichage: 'Afrique' },
    { nomAPI: 'Antarctic', nomAffichage: 'Antarctique' },
  ]

  // initialisation
  const saisie = ref('')
  const continentSaisi = ref(lesContinents[0].nomAPI)
  const lesPays = ref([])
  const store = useAppStore()

  /**
   * Trie en fonction des recherches et des filtres
   */
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
