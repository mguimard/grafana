## 3eme partie : Dashboard et PromQL

Nous devons mettre en place un dashboards sur une nouvelle application déployée. Les métriques de l'application seront scrapées par prometheus.

### 6.1 Déploiement et analyse des métriques

Dans le dossier lab/apps/app-6 lire les instructions de déploiment, puis analyser les métriques remontées par l'application.

### 6.2 Branchement à prometheus

Ajouter une nouvelle cible dans prometheus pour les métriques de notre application, puis vérifier que la donnée est bien remontée.

Note: utiliser 1s de scrape interval, penser à mettre des labels significatifs.

```yaml
# /vagrant/prometheus.yaml
- job_name: my-apps
  scrape_interval: 1s
  static_configs:
    - targets:
        - 192.168.56.10:8484
      labels:
        group: lab
        app-name: app6
        autre-labels: ici
```

Et redémarrer le conteneur prometheus

```bash
cd /vagrant
docker compose restart prometheus
```

### 6.3 Dashboard

Réaliser un dashboard Grafana le plus complet possible sur les métriques remontées.

Contraintes :

- métriques en haut
- graphiques en dessous
- graphiques orgnanisés par groupes
