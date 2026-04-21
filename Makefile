# Root Makefile to run server/client from the top-level project directory
.PHONY: install-server install-client install server client build

install-server:
	cd server && npm install

install-client:
	cd client && npm install

install: install-server install-client

server:
	cd server && npm start

client:
	cd client && npm start

build:
	cd client && npm run build


