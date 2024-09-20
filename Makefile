.DEFAULT_GOAL := run

.PHONY: run

auth:
	cd apps/auth && yarn run start:dev

gate:
	cd apps/api-gateway && yarn run start:dev
	