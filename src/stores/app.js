// Utilities
import { defineStore } from 'pinia'
// Importer l'API
import api from '@/plugins/axios'

export const useAppStore = defineStore('app', {
  state: () => ({
    // Déclaration des propriétés de l'état ici
    isLoading: false, // Indique si une opération de chargement est en cours
    error: null, // Stocke les messages d'erreur
    // Nos ressources nécessaires (que l'on va récupérer via API)
    resources: [], // Tableau pour stocker les ressources récupérées
  }),

  getters: {
    // Déclaration des getters ici
    hasResources: state => state.resources.length > 0, // Vérifie si des ressources sont disponibles
    totalResources: state => state.resources.length, // Retourne le nombre total de ressources
  },

  actions: {
    // Déclaration des actions ici
    async fetchRoster () { // Exemple d'action pour récupérer des données depuis une API
      try {
        const response = await api.get('/all', {
          params: {
            fields: 'name,flags,population,area,region,languages,capital,currencies,timezones',
          },
        })

        const reponseAvecFavoris = []
        for (const pays of response.data) {
          pays.favoris = localStorage.getItem(pays.name.common + '_favoris')
          reponseAvecFavoris.push(pays)
        }
        return reponseAvecFavoris
      } catch (error) {
        return error
      }
    },

    async init () {
      // Initialisation simple : récupère les données de l'API et les stocke dans this.resources
      this.resources = await this.fetchRoster()
      console.log('Ressources initialisées')
    },

    ajouterEnFavoris (pays) {
      if (pays.favoris) {
        localStorage.removeItem(pays.name.common + '_favoris')
      } else {
        localStorage.setItem(pays.name.common + '_favoris', true)
      }
      pays.favoris = !pays.favoris
    },
  },
})
