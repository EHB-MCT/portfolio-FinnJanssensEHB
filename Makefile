# Makefile for entire project

build:
# navigate to server folder and run "make build"
	cd server && $(MAKE) build
# navigate to client folder and run "make build"
	cd client && $(MAKE) build

run:
# Start up docker containers and seed database right after
	docker-compose up --d && docker-compose exec api-server npm run db:seed

stop:
# stop all docker containers
	docker-compose down