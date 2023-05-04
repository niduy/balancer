# Balancer

![Preview](/preview.png)

A dead simple web3 app to get the balance of your ethereum wallet for multiple assets

## Prerequisite

Users on Linux and Mac need to install the following tools to run the project:

- Node.js (18.x)
- Docker
- Docker Compose
- pnpm

While it might be enough on Windows as well, it is safer to run the project within WSL

## Installation

Go to the root of the project and install dependencies

```sh
pnpm install
```

Go to the server, generate schema, and create env file from `.env.example`

```sh
cd apps/server
cp .env.example .env
npx prisma generate
```

Inside the server folder, generate mongodb-keyfile

```sh
openssl rand -base64 756 > configs/mongodb-keyfile
sudo chmod 400 configs/mongodb-keyfile
```

Got back to the root folder and start redis and mongodb containers

```sh
cd ../..
docker-compose -f docker-compose.yaml up -d
```

Get inside the primary mongodb container

```sh
docker container exec -it balancer_mongo_1 mongosh -u root -p password --authenticationDatabase admin
```

Initialize the primary replica set

```mongosh
rs.initiate()
exit
```

Start the project

```sh
turbo run dev
```

## Usage

The web app is available at `http://localhost:3000` and the server is available at `http://localhost:4000`.

### API

Get assets for a given address:

```sh
curl 'http://localhost:4000/api/assets/all?address=0x082A2027DC16F42d6e69bE8FA13C94C17c910EbE'
```

Get a list of assets with their value against USD:

```sh
curl 'http://localhost:4000/api/marketCap'
```

## License

MIT
