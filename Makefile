# Root Makefile to run the backend server from the top-level project directory
.PHONY: start

start:
	cd src/server && npm start
