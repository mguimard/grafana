## 2eme partie : découverte des écrans

Vérifier que les interfaces sont accessibles depuis un navigateur web. Ouvrir les pages suivantes :

- Grafana: http://192.168.56.10:3000 (admin/admin)
- Alloy: http://192.168.56.10:12345
- Prometheus: http://192.168.56.10:9090
- Mailhog: http://192.168.56.10:8025

### 2.1 Découverte des métriques

Liste des aplications déployées :

- Portainer (https://192.168.56.10:10001) - nécessite un restart (docker restart portainer)
- homepage (http://192.168.56.10:10030)
- mealie (http://192.168.56.10:10040)
- nginx 1->3 (http://http://192.168.56.10:10020, http://http://192.168.56.10:10021, http://http://192.168.56.10:10022)
- note-ote-demo (http://192.168.56.10:10050/)
- redis-stack-1 (http://192.168.56.10:10011)
- redis-stack-2 (http://192.168.56.10:10013)
- cadvisor (collecte des métriques des conteneurs, pas d'interface graphique)
- nginx-paris-1, nginx-paris-2 (http://192.168.56.10:10101, http://192.168.56.10:10102) collectés par promtail

Serveurs de collecte :

- Prometheus (redis-stack-1, redis-stack-2)
- Loki (cadvisor : métriques de tous les conteneurs)
- Tempo (note-ote-demo)

Accéder à Grafana > Explore :

- Choisir la source Prometheus, utiliser la complétion pour découvrir les différentes métriques commençant par `redis_`, exemple : `redis_memory_used_dataset_bytes`
- Choisir la source Loki, utiliser la complétion pour découvrir quelques métriques/logs, exemple : `{job="nginx-paris-1"}`, `{job="nginx_paris_2"}`, `{filename="/var/log/nginx/json_access.log"}`

Accéder à Grafana > drilldown > metrics

- Repérer les différentes métriques intéressantes pour la partie suivante

### 2.2 Création d'un dashboard basique

Créer un dashboard qui affiche les métriques suivantes :

- Nombre de redis up
- Nombre de containers up
- Utilisation CPU des différents conteneurs
- Nombre de requêtes HTTP sur nginx-paris-1 et nginx-paris-2

Vous pourrez vous aider des drilldowns pour ajouter ces panels.

### 2.3 Utilisation de thresholds

- Colorier en rouge la métrique "nombre de redis up" si elle est en dessous de 2, en vert si supérieur ou égale à 2
- Colorier en rouge le nombre de requetes HTTP si supérieur à 10

### 2.4 Overrides de paramètres

- Sur le graphique du nombre de requêtes, colorier en rouge si supérieur à 10 et instance = nginx-paris-1, colorier en jaune si supérieur à 10 et instance = nginx-paris-2
