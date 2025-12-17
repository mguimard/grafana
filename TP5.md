## 5eme partie - mise en place d'alertes

Le but de ce TP est de configurer des alertes dans grafana.

Utilisation de l'application "app-6" vue dans la partie 3.

Suggestion : importer le dashboard fourni (TP3.json)

### 5.1 Création du contact point

Dans Grafana, menu Alerting > contact points

- Créer un contact point de type email
- Tester l'envoi et la réception
- Les emails seront disponibles dans mailhog.

### 5.2 Création d'alertes

Mettre en place les règles d'alertes suivantes :

- Alerte lors d'une température > à 60°C sur un des sensors
- Alerte lors d'un nombre de user connectés > à 20
- Alerte lors d'une perte de 5 users

Lier ces alertes aux panneaux concernés.

### 5.3 Silence d'alertes

Les données devraient lever une alerte au bout de 5/10 minutes, aléatoirement.

Lors d'une alerte de température, mettre la règle sous silence pendant 15 minutes. S'assurer qu'aucun email n'est envoyé pendant ce temps.
