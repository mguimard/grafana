## 6eme partie : Installation de dashboards de la communauté

Le but de ce TP est d'importer des dashboards de la communaté à des fin d'études des requêtes, d'organisation, de mise en page.

### 6.1 Organisation des dashboards

Créer la structure de folder suivante afin de classer le travail déjà effectué :

```
├── Imports
│   ├── docker
│   ├── redis
│   └── nginx
└── TPS
```

Déplacer les dashboards réalisés dans les précédents TP dans le dossier TPS.

Les dashboards importés dans la partie suivante devront être déplacés aussi.

### Dashboards importés

Importer les dashboard suivants :

- https://grafana.com/grafana/dashboards/18345-redis-overview/
- https://grafana.com/grafana/dashboards/13865-fgc-nginx01-web-analytics/
- https://grafana.com/grafana/dashboards/19724-y0nei-s-cadvisor-exporter/

Inspecter chaque panel.

### Modifications et améliorations

Modifier le dashboard "Analytics - NGINX / LOKI v2+ Data Source / Promtail v2"

- Modifier la variable "host" pour y ajouter une valeur "ALL" avec comme valeur ".+"
- Ajouter une row dynamique pour les panels de type stat
- Répéter cette row pour chaque host.
