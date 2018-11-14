SHELL = /bin/bash

.PHONY: start clean install

APP=REACT-BABEL
DIR=${PWD}
DIR-API=${DIR}/../api
DIR-API-CI=${DIR}/../api-ci
DIR-SRC=${DIR}/src
DIR-DIST=${DIR}/dist
DIR-NPM=${DIR}/node_modules

start:
	@gnome-terminal \
		--tab-with-profile="tab"\
			--working-directory="${DIR}"\
			--title="${APP}-api"\
			--command="make api-ci"\
		--tab-with-profile="tab"\
			--working-directory="${DIR}"\
			--title="${APP}-frontend"\
			--command="make develop"

api:
	@$(MAKE) -C ${DIR-API}

api-ci:
	@$(MAKE) -C ${DIR-API-CI}

develop:
	@# @DEBUG='express:router' webpack-dev-server --inline --hot
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