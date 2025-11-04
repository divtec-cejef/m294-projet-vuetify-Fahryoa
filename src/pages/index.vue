<template>
  <h1>Accueil</h1>
  <v-expansion-panels>
    <v-expansion-panel>
      <v-expansion-panel-title>Continents</v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-list v-for="(continent, index) in lesContinents" :key="index">
          <v-list-item @click="continentSaisi=continent.nomAPI; trierEnFonctionSaisie()">{{ continent.nomAffichage }}</v-list-item>
        </v-list>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
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
        <v-card class="cartePays">
          <v-img :alt="'Drapeau du pays : ' + pays.name.common" class="img" :src="pays.flags.svg" />
          <v-card-title>{{ pays.name.common }}</v-card-title>
          <v-card-text>Capitale : {{ pays.capital[0] }}</v-card-text>
          <v-card-text>Continents : {{ transformerContinentEnFrancais(pays.region) }}</v-card-text>
          <v-card-actions>
            <v-btn v-if="pays.favoris" icon="mdi-heart" @click="store.ajouterEnFavoris(pays)" />
            <v-btn v-else icon="mdi-heart-outline" @click="store.ajouterEnFavoris(pays)" />
          </v-card-actions>
        </v-card>
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

  function transformerContinentEnFrancais (continentATransformer) {
    switch (continentATransformer) {
      case lesContinents[1].nomAPI: { return lesContinents[1].nomAffichage }
      case lesContinents[2].nomAPI: { return lesContinents[2].nomAffichage }
      case lesContinents[3].nomAPI: { return lesContinents[3].nomAffichage }
      case lesContinents[4].nomAPI: { return lesContinents[4].nomAffichage }
      case lesContinents[5].nomAPI: { return lesContinents[5].nomAffichage }
      case lesContinents[6].nomAPI: { return lesContinents[6].nomAffichage }
      default: { return 'erreur' }
    }
  }

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
  .img {
    max-height: 45%;
    margin: 10px;
  }

  .cartePays {
    height: 400px;
  }
</style>
