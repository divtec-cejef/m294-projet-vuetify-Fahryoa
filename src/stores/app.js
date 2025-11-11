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

    // Fonction pour récupéré les pays par un json
    async fetchPaysFromJSON () {
      try {
        const response = await fetch('src/data/pays.json')
        const data = await response.json()
        // Si le JSON a la même structure que l'API (data.results), on descend dans "results"
        // sinon on prend directement le tableau retourné
        let paysArray = []
        if (Array.isArray(data)) {
          // Le JSON est directement un tableau
          paysArray = data
        } else if (data && Array.isArray(data.results)) {
          // Le JSON contient un bojet avec une propriété 'results' qui est le tableau
          paysArray = data.results
        } else {
          // Cas par défault : on affecte la valeur telle quelle
          paysArray = data
        }
        const reponseAvecFavoris = []
        for (const pays of paysArray) {
          pays.favoris = localStorage.getItem(pays.name.common + '_favoris')
          reponseAvecFavoris.push(pays)
        }
        this.resources = reponseAvecFavoris
        console.log('Les pays ont été chargé depuis le JSON :', this.resources)
      } catch (error) {
        this.error = error
        console.log('Erreur fetchPaysFromJSON() :', error)
      }

      return []
    },

    async init () {
      // Initialisation simple : récupère les données de l'API et les stocke dans this.resources
      this.resources = await this.fetchRoster()
      // this.fetchPaysFromJSON()
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
