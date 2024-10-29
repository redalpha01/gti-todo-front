# TODO test app pour GTI

## Fonctionalités requises
- [ ] Création de nouveau TODO 
- [ ] Suppression de TODO
- [ ] Édition du titre du TODO
- [ ] Déplacer les TODO dans la liste
- [ ] Marquer un item comme complété
- Pas besoin d'authentication
- Pas besoin de routing (front)
- Pas besoin de l10n
- 

## Dépendences
### Axios
- Client HTTP pratique pour les requêtes d'API - permet un code plus clean que fetch
### Pinia 
- Deux fonctionalités principales :
  - Permet de sortir le business logic du component (Donc CRUD dans le store de l'entité)
  - Permet d'avoir des données accessibles dans plusieurs components sans avoir a passer par la méthode waterfall
    - Un peu comme Zustand pour react
    - Permet par example de modifier une liste quand on modifie un élément de la liste sans avoir à passer une fonctione du parent à l'enfant
### VueUse 
- Est une libraire de fonctions utilitaires spécifiquement pour l'API composition de Vue
- A beaucoup d'outils, mais sera ici utilisé pour l'intégration de Sortable
- Évidemment est une librarie plus grosse que nécessaire
  - Vu qu'on est en module - seulement ce qui est utilisé sera bundled dans ce qui est servi à l'utilisateur
### Sortable 
- Une librairie très populaire pourt le sort avec animation et événements
- Raison d'être dans le projet :
  - Versus autre librairie
    - Degré de comfort avec cette librairie
    - À une intégration avec Vue déjà existante et populaire
      - contrairement à interactJS ou autre librairie que j'ai utilisé dans le passé
- Versus fait à la main
  - Permet d'avoir une rétroaction visuelle via animation sans avoir à dépenser grand temp sur cette section spécifique. 
### Vuetify 
- Libraire de style et components UI à la saveur Material Design
  - Purement pour randre le test plus attreillant
### Vercel
- Pour pouvoir pousser le front sur vercel
### Browserslist-to-esbuild
- Permet de supporter les navigateurs selon un browserslist 
  - 2 dernières version des navigateurs vivants qui ont plus de 0.5% du marché
### vite-plugin-vue-devtools 
- Pour le debugging local


## Décisions structurelles
### Typescript 
- Permet une plus grande sécurité du code
- Grace à une librairie de Laravel, générer les types se fait promptement

## Étapes
1. Définir les besoin de l'entité TODO
2. Construire l'API TODO en Laravel à partir des besoins
   1. Retirer la partie front du start point de laravel pour alléger l'APP
3. Générer le type TODO
4. Construire le TODO store pour les actions CRUD
5. Structurer le layout de l'APP
6. Construire le component de liste
7. Construire le component de TODO
8. Ajouter l'ajout
9. Ajouter la suppression
10. Ajouter le renommage
11. Ajouter le sort

## Questionnements
- Est-ce qu'on permet un TODO vide? (Sur ajout, édition)
  - Création: Non
  - Édition: Oui
- Création de todo dans modale formulaire ou dans un TODO qui est aussi un champs
- Similairement pour l'edit (Modale ou directement dans le component)
- Si pas de modale, est-ce qu'on veut bouton pour confirmer et annuler
  - On assume que le TODO est une information de peu d'importance et on priorise la rapidité d'usage donc 
    - Pas de modale
    - Pas de confirmation / annulation