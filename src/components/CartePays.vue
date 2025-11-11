<template>
  <v-card class="cartePays">
    <v-img :alt="'Drapeau du pays : ' + pays.name.common" class="img" :src="pays.flags.svg" />
    <v-card-title>{{ pays.name.common }}</v-card-title>
    <v-card-text>Capitale : {{ pays.capital[0] }}</v-card-text>
    <v-card-text>Continents : {{ transformerContinentEnFrancais(pays.region) }}</v-card-text>
    <v-card-actions>
      <v-btn v-if="pays.favoris" icon="mdi-heart" @click="store.ajouterEnFavoris(pays); boutonFavCliquer()" />
      <v-btn v-else icon="mdi-heart-outline" @click="store.ajouterEnFavoris(pays); boutonFavCliquer()" />
      <v-btn :to="`/${rendreLisiblePourSlug(pays.name.common)}`">
        Voir plus
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
  import { useAppStore } from '@/stores/app.js'

  // intialisation
  const store = useAppStore()
  // Créer un évenement dès que le bouton des favoris est cliquer
  const favorisCliquer = defineEmits(['favori-clique'])
  const lesContinents = [
    { nomAPI: 'Tous', nomAffichage: 'Global' },
    { nomAPI: 'Europe', nomAffichage: 'Europe' },
    { nomAPI: 'Asia', nomAffichage: 'Asie' },
    { nomAPI: 'Americas', nomAffichage: 'Amérique' },
    { nomAPI: 'Oceania', nomAffichage: 'Océanie' },
    { nomAPI: 'Africa', nomAffichage: 'Afrique' },
    { nomAPI: 'Antarctic', nomAffichage: 'Antarctique' },
  ]

  // Définit les propriétés que le composant reçoit du parent. (un pays)
  defineProps({
    pays: {
      type: Object,
      required: true,
    },
  })

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
      .normalize('NFD') // Décomposer les caractères accentués (é = e´)
      .toLowerCase() // Tout en minuscules
      .replace(/[\u0300-\u036F]/g, '') // Supprimer les accents
      .replace(/\s+/g, '-') // Remplacer les espaces par des tirets
  }

  /**
   * émet l'évenement favorisCliquer
   */
  function boutonFavCliquer () {
    favorisCliquer('favori-clique')
  }
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
