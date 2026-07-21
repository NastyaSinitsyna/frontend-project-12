build:
	make -C frontend build

install:
	npm ci

lint-frontend:
	make -C frontend lint

start-backend:
	npm run start

start-frontend:
	make -C frontend start

start:
	npm start

develop:
	make start-backend & make start-frontend
