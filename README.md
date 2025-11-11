[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/EBdR9AYf)
# 🌐 Mon Projet Vue.js & Vuetify

## 1. 🎨 Présentation du projet

### Concept
- API choisie et pourquoi : 
	- API choisie : REST COUNTRIES
	- Pourquoi : Je voulais une API qui me donne les informations sur les pays et c'est celle qui me paraissait le plus adapté  
- Public cible : Tout publique, c'est pratique pour les étudiants (permet d'avoir des informations sur un pays spécifique) tout comme les gens qui veulent juste faire une Bucket Liste de pays 
- Objectifs de l’application : afficher une liste de pays que l'on peut mettre en Favoris et dont l'on peut voir les détails

### Fonctionnalités principales
- Affichage d’une liste d’éléments (carte de pays) (via l'API REST Countries)
- Recherche des pays et filtre par continent
- Vue détaillé : la vue détaillé permet de voir des information supplémentaire comme la/les langue(s) officielle(s), la devise, la superficie,…
- Fonctionnalité interactive : Il est possible de mettre des pays en favoris
- Persistance locale : Les favoris sont enregistré via le Local Storage

TODO : 
### Aperçu visuel
_(Capture d’écran de l’application)_  
`![Screenshot de l’application](img/screenshotAccueil.png)`
`![Screenshot de l’application](img/screenshotFavoris.png)`
`![Screenshot de l’application](img/screenshotDetails.png)`

---

## 2. 📚 Parcours d'apprentissage

### Ressources utilisées
#### Documentation & tutos
- [Vue 3 Docs](https://vuejs.org/guide/introduction.html)
- [Vuetify Docs](https://vuetifyjs.com/en/components/all)
- [Pinia Docs](https://pinia.vuejs.org/)
- [REST Countries doc](https://restcountries.com) 
- Documentation sur le JavaScript par l'enseignent : (https://devjs.ch/js)
- Utilisation de composant déjà créer par se site : (https://vuetifyjs.com/en/components/all/#containment)
- Librairie de pyctogramme : (https://pictogrammers.com/library/mdi/)
- Exercices pokedex

#### Progression
- Semaine 1 : Création du dépôt GitHub, Commencer la mise en place de l'API (ça ne marchais pas)
- Semaine 2 : Vacances
- Semaine 3 : Vacances
- Semaine 4 : Terminer la mise en place de l'API ainsi que l'affichage de tout les pays (Image du drapeau du pays avec le nom du pays et sa capital)
- Semaine 5 : Terminer un moyen de recherche de pays par leur nom et de trier par continent
- Semaine 6 : Ajout des favoris (Possibilité de mettre en favoris ainsi que la page Favoris) et ajout de la page dynamique détails 
- Semaine 7 : Création d'un composant vue pour afficher les carte des pays et faire la documentation
---

## 3. 🛠️ Outils et méthodologie
 
### Environnement de développement
- **IDE** : WebStorm 
- **Versioning** : Git + GitHub
- **Dépendances principales** : Vue 3, Vuetify 3, Pinia, Axios/Fetch
- **Gestion API Keys** : `.env` + `.env.example`

### Installation & Run
- Cloner le repo : Git clone https://github.com/divtec-cejef/m294-projet-vuetify-Fahryoa
- Se déplacer dans le dossier : cd m294-projet-vuetify-Fahryoa
- Installer :npm install 
- Lancer :npm run dev
- Variables d’environnement : copier `.env.example` → `.env`  

### Méthodologie
- Découpage en composants réutilisables
- Props & Emits clairs
- Store avec Pinia
- Commits avec description clair et de manière régulière
- Tests manuels (UI, persistance, erreurs API, récupération en cas d'erreur depuis un fichier JSON)
- Nom des variables / constantes clairs

### Choix techniques
- API sélectionnée : REST countries
- Justification du choix : Il s'agit d'une API assez connue qui ne risque pas de tomber et elle me paraissait être la plus adapté a mon projet
- Endpoints utilisés : https://restcountries.com/v3.1/all 
- Limites/quotas connus : il est possible de sélectionner que 10 fields maximum par requête 

### Architecture (Descriptif + schéma simple)
- `App.vue` : layout principal  
- `pages/` : index.vue (page d'accueil affiche tous les pays avec un flitre et une recherche), Favoris.vue (affiche les favoris), [Details].vue (c'est une page dynamique qui affiche le détails d'un pays)

**Data-flow résumé :**  
- API donne des données → Les données sont enregistrer dans le store → elles sont reprises pour afficher les cartes dans index.vue → les données sont transmises dans le composant CartePays.vue ou depuis index.vue on peut aller dans détails.vue qui récupère les données depuis les store ou dans favoris.vue qui fais comme index.vue, donne les données a CartePays.vue

---

 
## 4. 🧪 Tests et validation

### Tests techniques
- ✅ Communication avec l'API fonctionelle
- ✅ Persistance des favoris (localStorage)  
- ✅ Navigation entre les pages  
- ✅ La page dynamique [Details].vue affiche les bonne informations
- ✅ Le fichier JSON fonctionne

### Tests d’UX
- Navigation intuitive 
- Recherche/filtre facilement compréhensible 
- Feedback utilisateur (si aucune carte afficher un message est affiché)

### Tests d’accessibilité
- Contraste couleurs (Vuetify par défaut)  
- Labels et placeholders cohérent  
- Navigation clavier possible  
 
### Tests d’erreurs & fallback
- API down → Un fichier JSON prend la place  
- Liste vide → Feedback a l'utilisateur pour le prévenir qu'il n'a pas de favoris 
- Recherche sans résultat → affiché qu'aucun pays n'a été trouvé 
- Indication de si les ressources ont bien été chargés via la console

---

## 5. 🤖 Usage d’intelligence artificielle

**⚠️ TRANSPARENCE OBLIGATOIRE** : Si vous utilisez une IA, vous DEVEZ :

### IA utilisée
- **Nom** : ChatGPT
- **Version** : GPT-5  
- **Contexte** : Debugging / Aide de compréhension syntaxique / expliquation de certaine commande 

### Utilisation détaillée
**Domaines d'aide :**
- Aide au code général : 40%
- Génération de snippets Vue/Vuetify : 50%  
- Aide à la structuration du projet : 10%
- Debugging : 80%  
- Recherche d’idées : 10%  

**Compréhension et adaptation**
- Expliquer ce que fait le code généré  
- Dire comment il a été adapté au projet  

### Parties codées manuellement
- Composants principaux : 70% personnel  
- Store & persistance : 60% personnel  
- Routing & navigation : 60% personnel  
- Tests & validation : 100% personnel  

### Apprentissage personnel
- Ce que j’ai appris grâce à l’IA : elle m'a beaucoup appris a utilisé les commandes comme : des commandes simple (v-if, v-for, ...) et des commandes plus complexe comme (@input, @click, ...)
- Comment elle m’a aidé à progresser : grâce a elle ça ma permis d'apprendre a utilisé les commandes et j'ai pu réutilisé cette commande plus tard et de manière juste 

---

## 6. 🎯 Bilan personnel

### Ce que j’ai appris
- Compétences techniques acquises  
- Découvertes surprenantes : le JavaScript est un langage non typé  
- Concepts difficiles maîtrisés : Les pages dynamiques

### Difficultés rencontrées
- Problèmes techniques et solutions trouvées  
- Moments de blocage et dépassement : je n'arrivais pas a crée du contenu dynamique avec la page [detail].vue, après beaucoup de recherche le problème venait juste du faite que j'avais oublié de mettre le mot clé setup a coté de la balise script  
- Aide reçue et sources : le padlet du cours ainsi que le gitBook, Chatgpt et l'exercice pokedex

### Réussites et fiertés
- Aspects du projet dont je suis fier : je suis fier de tout mon projet car il m'a demandé beaucoup d'investissement mais si je devais choisir un seul point je dirais la page dynamique qui permet d'afficher les details
- Progrès constatés depuis le début : je suis capable de crée et d'utilisé des composant vue (au tout début j'utilisait des balises html basique comme <img> puis j'ai remplacé par des composant vue comme <v-img>)  
- Envies de développement futur : Une page qui permet d'avoir un classement des pays par population, superficie, … ainsi que éventuellement l'affichage d'une carte avec des pointeur sur les pays mis en favoris  

### Améliorations possibles
- Ce que j’ajouterais avec plus de temps : Une liste des 10 pays avec le plus de population, superficie, ...  
- Fonctionnalités bonus envisagées : affichage d'une carte avec des pointeur sur les pays mis en favoris 
- Compétences à approfondir : Les classes vue (les classes déjà présente dans vue comme "align-center", ...)

---
 
## 7. 📚 Références & Sources
- Documentation de l’API : [REST Countries](https://restcountries.com/)
- Tutos clés utilisés : Pas besoin de clé  
- Usage de l’IA : voir section ci-dessus  
- Autres ressources utiles : Utilisation de composant déjà créer par se site : (https://vuetifyjs.com/en/components/all/#containment), Librairie de pyctogramme : (https://pictogrammers.com/library/mdi/), Exercices pokedex
