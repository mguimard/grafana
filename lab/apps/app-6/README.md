# Déploiement de l'application pour partie 6 du lab

Build de l'image docker

```bash
docker build -t app6 .
```

Lancement du conteneur

```bash
docker run -d --name app6 -p 8484:8484 app6
```

Vérification de l'installation, depuis un navigateur web :

```bash
curl 192.168.56.10:8484/metrics
```
