<template>
  <v-app>
    <!--
    Menu principal
      * Affiche la barre de navigation principale (header)
      * Inclut le composant personnalisé MenuPrincipal créer dans le fichier `src/components/AppHeader.vue`
    -->
    <menu-principal />

    <!--
    Section principale de l'application
      * <v-main> définit le conteneur principal pour afficher le contenu de l'application
      * <router-view> est une zone de rendu dynamique utilisée par Vue Router
        pour afficher les composants des routes actuelles
    -->
    <v-main>
      <router-view />
    </v-main>
    <v-btn @click="logData()">Charger les ressources</v-btn>
  </v-app>
</template>

<script setup>
// Initialisation du store et appel de l'API
  import { onMounted } from 'vue'
  import MenuPrincipal from '@/components/AppHeader.vue'
  import { useAppStore } from '@/stores/app'

  const store = useAppStore()

  onMounted(() => {
    store.init() // premier chargement
    console.log('App mounted, store initialized')
  })
  // onclick du bouton pour logData
  function logData () {
    console.log(store.resources)
  }
</script>
