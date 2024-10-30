# TODO test app pour GTI

## Note

- Le fait qu'il n'y a pas de session et que tout visiteur partage la même liste, il est possible qu'un utilisateur n'ait
  plus la bonne version de la liste. Je ne penses pas nécessaire ici d'ajouter un rafraichissement de la list à chaque
  requête juste pour prouver que j'en suis conscient.
- La page n'a aussi pas de H1 - ceci n'aide pas le référencement, mais n'est pas nécessaire dans un contexte d'outil
  pur.
    - Considération à prendre selon le besoin du client.
- Pour le reordering, on aurait pu prendre plusieurs approche
    1. Faire une action reorder qui retourne la liste mis-à-jour ou une section de la liste (Moins restful, mais plus
       performant)
    2. Faire un patch sur l'entité et ensuite faire un nouvel appel à l'index (L'approche que je vais prendre ici)
    3. Faire un patch; mettre a jour l'entité; demander au component de liste de presenter les items dans le bon ordre
       avec un getter dans le store
- Similairement au update, le delete peut changer l'ordre. Je vais rester consistant et aussi demander un
  rafraichissement de l'index après la suppression
- Pour l'instant, l'app ajoute les nouveau TODO à la fin, une considération aurait pu être fait pour mettre en premier (
  pousser le reste ou inverser l'ordre de présentation)

## Fonctionalités requises

- [ ] Création de nouveau TODO
- [ ] Suppression de TODO
- [ ] Édition du titre du TODO
- [ ] Déplacer les TODO dans la liste
- [ ] Marquer un item comme complété
- Pas besoin d'authentication
- Pas besoin de routing (front)
- Pas besoin de l10n

## Possibles ajouts

- Cache
- Session par utilisateur (et donc soit oauth, soit token de session)
- Rétroaction positives / négatives du serveur.

## Dépendences

### Axios

- Client HTTP pratique pour les requêtes d'API - permet un code plus clean que fetch

### Pinia

- Deux fonctionalités principales :
    - Permet de sortir le business logic du component (Donc CRUD dans le store de l'entité)
    - Permet d'avoir des données accessibles dans plusieurs components sans avoir a passer par la méthode waterfall
        - Un peu comme Zustand pour react
        - Permet par example de modifier une liste quand on modifie un élément de la liste sans avoir à passer une
          fonctione du parent à l'enfant

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
    - Permet d'avoir une rétroaction visuelle via animation sans avoir à dépenser grand temp sur cette section
      spécifique.

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
- Est-ce qu'on veut ajouter des rétroactions positives/négatives
    - J'ai déjà un setup dans un projet que je pourrais importer
    - Pas demandé par le client
    - Pas pour l'instant