SHELL = /bin/bash

.PHONY: start clean install

APP=REACT-BABEL
DIR=${PWD}
DIR-ROOT=${DIR}/../
DIR-SRC=${DIR}/src
DIR-DIST=${DIR}/dist
DIR-NPM=${DIR}/node_modules

develop:
	@gnome-terminal \
		--tab-with-profile="tab"\
			--working-directory="${DIR}"\
			--title="${APP}-api"\
			--command="make api"\
		--tab-with-profile="tab"\
			--working-directory="${DIR}"\
			--title="${APP}-frontend"\
			--command="make start"

api:
	@cd ${DIR-ROOT} && $(MAKE) api

api-mock:
	@cd ${DIR-ROOT} && $(MAKE) api-mock

start:
	@# @DEBUG='express:router' webpack-dev-server --inline --hot
	@# webpack-dev-server --inline --hot
	@npm start

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