## 4eme partie : requêtes LogQL

Lien vers la cheatsheet LogQL/Loki : https://megamorf.gitlab.io/cheat-sheets/loki/

Le dashboard a réaliser est un dashboard complet sur les logs nginx de nginx_paris_1 et nginx_paris_2.

### 4.1 Découverte des métriques

- Lister les logs issus de nginx
- Faire l'état des lieux des différents labels disponibles

### 4.2 Création de variables

Créer une variable qui :

- A pour nom "$host"
- Liste les noms des services (nginx_paris_1 et nginx_paris_2)
- Contient une valeur ALL qui vaut "nginx\_.\*"

Tester cette variable dans un panel de type texte, pour simplement afficher sa valeur.

### 4.3 Création de panels

Créer les différents panels :

Type stats :

- Nombre de visiteurs uniques de la dernière heure
- Nombre de visiteurs uniques de la journée
- Nombre de visiteurs uniques des 2 derniers jours.

Type time series :

- Moyenne des octets envoyés
- Nombre de requêtes 200 et 404

Type table :

- Liste des pages les plus demandées

### 4.5 Utilisation de la variable dans les panels

- Utiliser la variable dans tous les requêtes de tous les panels.
- Vérifier que les panels se mettent bien à jour.
