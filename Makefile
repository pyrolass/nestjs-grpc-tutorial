.DEFAULT_GOAL := run

.PHONY: run auth auth_p gate

auth:
	cd apps/auth && yarn run start:dev auth

gate:
	cd apps/api-gateway && yarn run start:dev api-gateway

auth_p:
	protoc --plugin=./node_modules/.bin/protoc-gen-ts-proto --ts_proto_out=./ --ts_proto_opt=nestJs=true ./proto/auth.proto
