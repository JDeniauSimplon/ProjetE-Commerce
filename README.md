# E-Commerce

- Lien vers la maquette : https://www.figma.com/file/FZ834s3MiiDdeFSlYAdIoC/Recipe-Web-Design-(Community)-(Copy)?type=design&node-id=0%3A1&mode=design&t=zvhjACgc81jOGJfd-1

- Lien vers le cahier des charges : https://docs.google.com/document/d/1cR-nDuURq55cb6RsSEJEavLpoa4rMFLA0b_z1BkZ8FQ/edit

- Démarrer le projet : 
1. Frontend : 
```shell
npm install
```

```shell
npm install fade
```

```shell
npm run dev
```

2. Backend : 
```shell
mv .env.example .env #Pensez à renseigner votre base de données dans le fichier
```

```shell
composer install
```

```shell
php bin/console d:d:c
```

```shell
php bin/console d:m:m
```

```shell
php bin/console doctrine:fixtures:load
```

```shell
symfony server:start
```


## Contexte du projet 

- L’idée est la suivante : réaliser le site d’une épicerie en ligne, avec un service de pick-up.

- Vous devrez satisfaire les contraintes techniques et fonctionnelles fournies par l’agence dans le cahier des charges.

- Pour la réalisation du projet vous utiliserez l’API de API Platform.


## Critères de performance
- Le site respecte le cahier des charges.
- Les fonctionnalités attendues ne produisent pas d’erreurs.
- Le site est responsive est s’adapte à un maximum d’écran.
- Les fichiers sont découpés de manière pertinentes et les assets sont organisés.
- Les pages sont fonctionnelles.
- Respect des bonnes pratiques de nommages / indentation / sémantique.