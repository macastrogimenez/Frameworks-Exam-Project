# Root Makefile to run server/client from the top-level project directory
.PHONY: install-server install-client install-reactDependencies install server client build

install-server:
	cd server && npm install

install-client:
	cd client && npm install

install-reactDependencies:
	cd client && npm install react-bootstrap bootstrap && npm install react-router-dom

install: install-server install-client install-reactDependencies

server:
	cd server && npm start

client:
	cd client && npm start

build:
	cd client && npm run build


