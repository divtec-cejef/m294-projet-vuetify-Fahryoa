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
      <v-btn v-if="pays.favoris" icon="mdi-heart" @click="store.ajouterEnFavoris(pays)" />
      <v-btn v-else icon="mdi-heart-outline" @click="store.ajouterEnFavoris(pays)" />
      <v-btn to="/">
        Retour a l'accueil
      </v-btn>
    </v-card-actions>
  </v-card>

</template>
<script setup>
  import { ref } from 'vue'
  import { useRoute } from 'vue-router'
  import { useAppStore } from '@/stores/app.js'

  // initialisation
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

  /**
   * Permet de transformer le tableau des langues en texte qui s'affiche séparé d'une virgule comme ceci : "langue1, langue2, langue3"
   * @param langues le tableau des langues
   * @returns {string} Le texte avec les langues séparé de virgule
   */
  function transformerLangue (langues) {
    return Object.values(langues).join(', ')
  }

  /**
   * Permet de prendre le nom d'un continent et de le traduire en Français
   * @param continentATransformer Continent a traduire
   * @returns {*|string} le nom du pays en français
   */
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

  /**
   * Transforme du texte pour qu'il soit "lisible" pour un slug (retire les majuscule, les accents, ...)
   * @param texte le texte a transformer
   * @returns {string} le texte "Lisible" pour le slug
   */
  function rendreLisiblePourSlug (texte) {
    return texte
      .normalize('NFD')
      .toLowerCase()
      .replace(/[\u0300-\u036F]/g, '')
      .replace(/\s+/g, '-')
  }

  /**
   * Recherche du pays correspondant au paramètre donnée par l'URL
   */
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
