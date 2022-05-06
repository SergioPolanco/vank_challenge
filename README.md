# Vank API

API monolítica para Vank creada con [Nestjs](https://github.com/nestjs/nest).

## Requerimientos

```sh
- Docker
```

## Instalación

```sh
npm install
```

## Variables de entorno

```sh
# App
PORT = <<puerto en que correra el api>>
NODE_ENV = <<ambiente de node js>>
INVOICE_FILE_URL = <<url del archivo csv con las facturas>>
CURRENCY_CONVERTER_URL = <<url de Free currency converter>>
FREE_CURRENCY_API_KEY = <<api key de Free currency converter>>
API_VERSION = <<version del api>>

# Database
DB_HOST = <<host de la base de datos>>
DB_PORT = <<puerto de la base de datos>>
DB_USER = <<usuario de la base de datos>>
DB_PASSWORD = <<contraseña de la base de datos>>
DB_NAME= <<nombre de la base de datos>>
```

## Correr aplicación localmente

```sh
# Construir las imagenes del api y de la base de datos a traves de docker compose
docker-compose -f base.compose.yml -f local.compose.yml up

# Correr las imagenes construidas
docker-compose -f base.compose.yml -f local.compose.yml up
```

## Correr los test

```sh
npm run test
```

## Estructura de carpetas

Para este proyecto la estructura de carpetas está basado en la separación de responsabilidades por dominio, explicado en este
[artículo](https://alexkondov.com/tao-of-node/#structure-in-modules)

```sh
├── Dockerfile
├── README.md
├── base.compose.yml
├── init.sh
├── init_swarm.sh
├── local.compose.yml
├── nest-cli.json
├── package-lock.json
├── package.json
├── prod.compose.yml
├── src
│   ├── app
│   │   ├── constants
│   │   │   └── app.constants.ts
│   │   └── index.ts
│   ├── banks
│   │   ├── controllers
│   │   │   └── bank.controller.ts
│   │   ├── data
│   │   │   └── bank.data.ts
│   │   ├── dtos
│   │   │   ├── bank.dto.ts
│   │   │   └── create-bank.dto.ts
│   │   ├── entities
│   │   │   └── bank.entity.ts
│   │   ├── index.ts
│   │   ├── populators
│   │   │   └── bank.populator.ts
│   │   ├── repositories
│   │   │   └── bank.repository.ts
│   │   └── services
│   │       └── bank.service.ts
│   ├── common
│   │   ├── constants
│   │   │   └── currencies.constants.ts
│   │   ├── database
│   │   │   ├── index.ts
│   │   │   └── migrations
│   │   │       └── 1651456575956-init-tables.ts
│   │   ├── dtos
│   │   │   └── response.dt.ts
│   │   ├── entities
│   │   │   └── abstract.entity.ts
│   │   └── exceptions
│   │       └── exception-filter.exception.ts
│   ├── invoices
│   │   ├── controllers
│   │   │   ├── invoice.controller.spec.ts
│   │   │   └── invoice.controller.ts
│   │   ├── dtos
│   │   │   ├── create-invoice.dto.ts
│   │   │   ├── invoice.dto.ts
│   │   │   └── querystring-invoice.dto.ts
│   │   ├── entities
│   │   │   └── invoice.entity.ts
│   │   ├── index.ts
│   │   ├── populators
│   │   │   └── invoices.populator.ts
│   │   ├── repositories
│   │   │   └── invoice.repository.ts
│   │   ├── services
│   │   │   ├── invoice-external.service.ts
│   │   │   ├── invoice.service.spec.ts
│   │   │   └── invoice.service.ts
│   │   ├── tasks
│   │   │   └── invoice.task.ts
│   │   └── utils
│   │       └── csv-parser.util.ts
│   ├── main.ts
│   ├── ormconfig.ts
│   ├── registration
│   │   ├── controllers
│   │   │   └── registration.controller.ts
│   │   ├── dtos
│   │   │   ├── registration-response.dto.ts
│   │   │   └── registration.dto.ts
│   │   ├── index.ts
│   │   └── services
│   │       └── registration.service.ts
│   └── users
│       ├── controllers
│       │   └── user.controller.ts
│       ├── dtos
│       │   ├── create-user.dto.ts
│       │   ├── update-user-response.dto.ts
│       │   ├── update-user.dto.ts
│       │   └── user.dto.ts
│       ├── entities
│       │   └── user.entity.ts
│       ├── index.ts
│       ├── repositories
│       │   └── user.repository.ts
│       └── services
│           └── user.service.ts
├── test
│   └── jest-e2e.json
├── tree.text
├── tsconfig.build.json
└── tsconfig.json
```

## Endpoints

Para documentar los endpoint se creó un swagger al que se puede acceder corriendo la aplicación en local mediante el siguiente path:

```sh
# Si el api esta corriendo en el puerto 3000
http://localhost:3000/api
```

También se puede acceder por medio de este [Link](https://contabonode1.lalvarez.dev/api/) (este es un servidor limitado y no siempre
está disponible)

## Despliegue

Se está utilizando github actions para hacer el despliegue del proyecto (más detalles en la carpeta .github/workflows),
este paso consiste en la creación de 3 "jobs": build_and_check, build_and_upload_image y deploy_image

##### build_and_check
    Instalación de dependencias, corre los test, verifica la auditoria de las librerías y construye la aplicación
    
##### build_and_upload_image
    Construye la imagen docker y la sube a [docker hub](https://hub.docker.com/)
    podemos hacer "docker pull sergiopolanco/vank-api:latest" para descargar la imagen

##### deploy_image
    El runner se conecta por ssh a un servidor privado para poder conectarse al docker deamon de este servidor y bajar la imagen,
    luego levanta el proyecto con docker swarm

## Observaciones

- Cache en memoria
- build_and_check puede separarse

## Mejoras / TODO

##### Implementar redis
    El cache para propósito de este MVP es manejado en memoria, esto debe usar Redis en un futuro, y de ser posible tener un servicio dedicado
    para esta tarea (almacenamiento de cache en redis) para su escalado independiente

##### Serverless para obtener las facturas
    Actualmente, el proyecto consta de un cron que ejecuta una tarea una vez al día, esta tarea se encarga de obtener las facturas y guardarlas en la base de datos.
    
    Se podría generar una function serverless para obtener las facturas y exponer un enpoint para guardar estas mismas, configurando la function serverless como un cron
    para que se ejecute una vez al día, de esta manera en caso de querer cambiar la frecuencia de ejecución, no se necesita desplegar el API de nuevo.
    
##### Cache para las monedas
    Actualmente, se están convirtiendo las monedas haciendo un llamado al API de Free currency converter, esto añade latencia a la llamada y produce una dependencia a que
    este sistema externo este disponible.
    
    Se podría generar una function serverless que obtenga periódicamente las conversiones de las monedas que se usan en el api y guardar estos valores como tabla de hashes en redis, entonces vank API preguntaría por estos valores a la instancia de redis dedicada bajando considerablemente la latencia.