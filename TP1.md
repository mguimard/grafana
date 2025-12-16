
## 1ere partie : installation et découverte du lab

### Démarrage du lab

Le lab est composé d'une machine virtuelle basée sur debian/bookworm64.

Ouvrir un terminal dans le dossier "lab" et démarrer la vm :

```bash
cd lab
vagrant up
```

Se connecter ensuite en SSH à la machine virtuelle :

```bash
vagrant ssh main
```

### Démarrage de la stack grafana - loki

Dans la machine virtuelle : 

```bash
cd /vagrant
docker compose up -d
```

### Ajout de quelques conteneurs à monitorer

Dans la machine virtuelle, installer quelques conteneurs :

Portainer

```bash
docker volume create portainer_data
docker run -d -p 10000:8000 -p 10001:9443 --name portainer --restart=always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer-ce:lts
```

Redis

```bash
docker run -d --name redis-stack-1 --restart=always -p 10010:6379 -p 10011:8001 redis/redis-stack:latest
docker run -d --name redis-stack-2 --restart=always -p 10012:6379 -p 10013:8001 redis/redis-stack:latest
```

Quelques nginx

```bash
docker run -d --name nginx-1 --restart=always -p 10020:80 nginx:latest
docker run -d --name nginx-2 --restart=always -p 10021:80 nginx:latest
docker run -d --name nginx-3 --restart=always -p 10022:80 nginx:latest
```

Homepage

```bash
docker volume create homepage
docker run -d --name homepage --restart=always -e HOMEPAGE_ALLOWED_HOSTS=192.168.56.10:10030 -p 10030:3000 -v homepage:/app/config ghcr.io/gethomepage/homepage:latest
```

Mealie

```bash
docker volume create mealie
docker run -d --name mealie --restart=always -e BASE_URL=192.168.56.10:10040 -p 10040:9000 -v mealie:/app/config ghcr.io/mealie-recipes/mealie:latest
```

Custom app (node js app avec opentelemetry)

```bash
cd /vagrant/ote-apps/node
docker build -t node-ote-demo -f Dockerfile .   
docker run --name node-ote-demo --restart=always -e OTE_TRACE_ENDPOINT=http://192.168.56.10:4320/v1/traces -e OTE_METRICS_ENDPOINT=http://192.168.56.10:4320/v1/metrics -p 10050:8080 -d node-ote-demo:latest
```

Vérifier que tous les conteneurs sont bien démarrés

```bash
docker ps
docker stats
docker ps --format "table {{.Names}}\t{{.Image}}\t{{.Status}}" | sort
```

Résultat attendu (25 conteneurs):

```txt
homepage                  ghcr.io/gethomepage/homepage:latest         Up 58 seconds (healthy)
mealie                    ghcr.io/mealie-recipes/mealie:latest        Up 37 seconds (healthy)
nginx-1                   nginx:latest                                Up About a minute
nginx-2                   nginx:latest                                Up About a minute
nginx-3                   nginx:latest                                Up About a minute
node-ote-demo             node-ote-demo:latest                        Up 4 seconds
portainer                 portainer/portainer-ce:lts                  Up About a minute
redis-stack-1             redis/redis-stack:latest                    Up About a minute
redis-stack-2             redis/redis-stack:latest                    Up About a minute
vagrant-alloy-1           grafana/alloy:latest                        Up 54 minutes
vagrant-backend-1         grafana/loki:latest                         Up 54 minutes (unhealthy)
vagrant-cadvisor-1        ghcr.io/google/cadvisor:v0.53.0             Up 54 minutes (healthy)
vagrant-flog-1            mingrammer/flog                             Up 54 minutes
vagrant-gateway-1         nginx:latest                                Up 54 minutes (healthy)
vagrant-grafana-1         grafana/grafana:latest                      Up 54 minutes (healthy)
vagrant-k6-tracing-1      ghcr.io/grafana/xk6-client-tracing:latest   Up 14 minutes
vagrant-mailhog-1         mailhog/mailhog                             Up 54 minutes
vagrant-minio-1           minio/minio                                 Up 54 minutes (healthy)
vagrant-nginx-paris-1-1   nginx                                       Up 54 minutes
vagrant-nginx-paris-2-1   nginx                                       Up 54 minutes
vagrant-prometheus-1      prom/prometheus:latest                      Up 54 minutes (healthy)
vagrant-promtail-1        grafana/promtail                            Up 13 minutes
vagrant-read-1            grafana/loki:latest                         Up 54 minutes (unhealthy)
vagrant-tempo-1           grafana/tempo:latest                        Up 54 minutes
vagrant-write-1           grafana/loki:latest                         Up 54 minutes (unhealthy)
```
