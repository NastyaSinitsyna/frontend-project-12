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