build-frontend:
	make -C frontend build

start-backend:
	npm run start

start-frontend:
	make -C frontend start

start:
	make start-backend & make start-frontend