SHELL = /bin/bash

.PHONY: start clean install

APP=REACT-TYPESCRIPT
DIR=${PWD}
DIR-SRC=${DIR}/src
DIR-DIST=${DIR}/dist
DIR-NPM=${DIR}/node_modules

start: develop

develop:
	@webpack-dev-server --inline --hot

build: clean-dist
	webpack

build-production: clean-dist
	@NODE_ENV=production webpack -p

debug:
	@webpack --profile --display-modules --display-reasons

clean-dist:
	@rm -rf ${DIR-DIST}

clean: clean-dist
	@rm -rf ${DIR-NPM} package-lock.json

install: clean
	@npm install