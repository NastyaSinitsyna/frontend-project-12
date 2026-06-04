build-frontend:
	make -C frontend build

start:
	npx start-server -s ./frontend/dist