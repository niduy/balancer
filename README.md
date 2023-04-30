# Balancer

![Preview](/preview.png)

A dead simple web3 app to get the balance of your ethereum wallet for multiple assets

## Prerequisite

Users on Linux and Mac need to install the following tools to run the project:

- Node.js (16.x)
- Docker
- Docker Compose
- pnpm

While it might be enough on Windows as well, it is safer to run the project within WSL

## Installation

Go to the root of the project and install dependencies

```sh
pnpm install
```

Go to server and generate schema

```sh
cd apps/server
npx prisma generate
cd ../..
```

Start redis and mongodb containers

```sh
docker-compose -f docker-compose.yaml up -d
```

Start the project

```sh
turbo run dev
```

## Usage

The web app is available at `http://localhost:3000` and the backend is available at `http://localhost:4000`.

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