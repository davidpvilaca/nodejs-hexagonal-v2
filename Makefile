default: prepare

prepare: build-base-image

build-base-image:
	docker build -t nodejs-hexagonal-v2 .

build-http-api:
	docker build -t http-api ./apps/http-api

.PHONY: prepare build-base-image build-http-api
