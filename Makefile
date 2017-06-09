SHELL = /bin/bash

.PHONY: start backend frontend

APP=REACT-BABEL
DIR=${PWD}
DIR-SRC=${DIR}/src
DIR-DIST=${DIR}/dist
DIR-NPM=${DIR}/node_modules


start: develop

develop:
	@webpack-dev-server --inline --hot

frontend-build: frontend-clean
	webpack

frontend-build-production: frontend-clean
	@NODE_ENV=production webpack -p

frontend-debug:
	@webpack --profile --display-modules --display-reasons

frontend-clean:
	@rm -rf ${DIR-DIST}

clean: frontend-clean
	@rm -rf ${DIR-NPM}
	${MAKE} npm-install

npm-install:
	@npm install