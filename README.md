# DEV5: Portfolio Finn Janssens

_De Lijn Delayed App_

## Introduction

This projects was developped to showcase the terrible accuracy of busses bij De Lijn in Flanders. It used De Lijn's very own [Open Data Services API](https://data.delijn.be/docs/services) to gather real-time data. This is all done by a NodeJS Express backend that uses a MongoDB database to cache the cities and busstops to limit API-calls.

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Git
- [NodeJS v18 or up](https://nodejs.org/en/)
- Make
  - Installed by default on most Linux distro's or can be installed by running: `sudo apt install make`
  - Install on windows using [chocolatey](https://chocolatey.org/install): `choco install make`
- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/)

### Build steps

1. Clone this repository

```bash
git clone https://github.com/EHB-MCT/portfolio-FinnJanssensEHB.git
```

2. Change to the repository directory

```bash
cd portfolio-FinnJanssensEHB/
```

3. Make a .env file and add your "De Lijn" API-key (obtain one via [data.delijn.be](https://data.delijn.be/))

```bash
touch .env && echo "DELIJN_API_KEY=\"<YOUR_KEY_HERE>\"" > .env
```

4. Build the Docker image (might have to run with admin rights)

```bash
make build
```

5. Spin up the docker containers (might have to run with admin rights)

```bash
make run
```

## Sources

- Convert MS to time string: https://bobbyhadz.com/blog/javascript-convert-milliseconds-to-hours-minutes-seconds
- MERN-stack Docker Compose: https://github.com/sidpalas/devops-directive/tree/master/2020-08-31-docker-compose
- Dockerizing a react app: https://jsramblings.com/dockerizing-a-react-app/

## Reporting issues

Issues may be reported by creating an issue on Github. These issues will then be looked into. The help and involvement is very much appreciated.

---

**_Project made by Finn Janssens, 2022 for the Development 5 course at Erasmus Hogeschool Brussels_**
