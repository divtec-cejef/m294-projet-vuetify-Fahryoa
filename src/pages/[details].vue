<template>
  <v-card class="carte">
    <v-img :alt="'Drapeau du pays : ' + pays.name.common" class="img" :src="pays.flags.svg" />
    <v-card-title>{{ pays.name.common }}</v-card-title>
    <v-card-text>Capital : {{ pays.capital[0] }}</v-card-text>
    <v-card-text>Continent : {{ transformerContinentEnFrancais(pays.region) }}</v-card-text>
    <v-card-text>{{ pays.flags.alt }}</v-card-text>
    <v-divider />
    <v-card-text>Supérficie : {{ pays.area }}km²</v-card-text>
    <v-card-text>Population : {{ pays.population }} d'habitants</v-card-text>
    <v-card-text>Langue officielle : {{ transformerLangue(pays.languages) }}</v-card-text>
    <v-card-text>La monnaie officielle : {{ Object.values(pays.currencies)[0].name }} ({{ Object.values(pays.currencies)[0].symbol }})</v-card-text>
    <v-card-actions>
      <v-btn to="/">
        Retour
      </v-btn>
    </v-card-actions>
  </v-card>

</template>
<script setup>
  import { ref } from 'vue'
  import { useRoute } from 'vue-router'
  import { useAppStore } from '@/stores/app.js'

  // -- Initialisations
  const route = useRoute()
  const store = useAppStore()
  const pays = ref(null)
  const lesContinents = [
    { nomAPI: 'Tous', nomAffichage: 'Global' },
    { nomAPI: 'Europe', nomAffichage: 'Europe' },
    { nomAPI: 'Asia', nomAffichage: 'Asie' },
    { nomAPI: 'Americas', nomAffichage: 'Amérique' },
    { nomAPI: 'Oceania', nomAffichage: 'Océanie' },
    { nomAPI: 'Africa', nomAffichage: 'Afrique' },
    { nomAPI: 'Antarctic', nomAffichage: 'Antarctique' },
  ]

  function transformerLangue (langues) {
    return Object.values(langues).join(', ')
  }

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

  // Fonction utilitaire pour convertir un nom de pays en "slug"
  function rendreLisiblePourSlug (texte) {
    return texte
      .normalize('NFD')
      .toLowerCase()
      .replace(/[\u0300-\u036F]/g, '')
      .replace(/\s+/g, '-')
  }

  // Recherche du pays correspondant au paramètre d’URL
  function rechercherPays () {
    const slug = rendreLisiblePourSlug(route.params.details)
    for (const p of store.resources) {
      if (rendreLisiblePourSlug(p.name.common) === slug) {
        pays.value = p
      }
    }
  }

  rechercherPays()
</script>
<style scoped>
  .img {
    max-height: 400px;
    margin-top: 10px;
  }

  .carte {
    max-width: 1100px;
    margin: auto;
  }
</style>
