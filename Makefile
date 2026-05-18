# Root Makefile to run server/client from the top-level project directory
.PHONY: install-server install-client install-reactDependencies install-yupAndFormik install server client build

install-server:
	cd server && npm install

install-client:
	cd client && npm install

install-reactDependencies:
	cd client && npm install react-bootstrap bootstrap && npm install react-router-dom

install-yupAndFormik:
	cd client && npm install formik yup --save && npm run build

install: install-server install-client install-reactDependencies install-yupAndFormik

server:
	cd server && npm start

client:
	cd client && npm start

build:
	cd client && npm run build


