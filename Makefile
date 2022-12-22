build:
	cd server && $(MAKE) build
	cd client && $(MAKE) build

# run:
# 	docker-compose up --d && docker-compose exec api-server npm run db:seed
run:
	docker-compose up
stop:
	docker-compose down