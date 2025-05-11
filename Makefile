
IMAGE?=jsonstore
TAG?=latest

COMPOSE_PROJECT_NAME?=jsonstore-dev

.PHONY: help default image

# Default target
default: help

help:
	@echo "Usage: make [target]"
	@echo ""
	@echo "Available targets:"
	@echo "  packages           Build Node.js packages using lerna"
	@echo "  image          	Build Docker images (base and local)"
	@echo "  run            	Run the local Docker container"

packages:
	@echo "Building Node.js packages ..."
	yarn install
	yarn run build

image:
	@echo "Building docker image ..."
	#docker build -f ./Dockerfile -t $(IMAGE):$(TAG) .
	docker buildx build -f ./Dockerfile -t $(IMAGE):$(TAG) --platform linux/arm64,linux/amd64 .

run:
	@echo "Running docker container ..."
	docker run -it --rm \
	  -v $(PWD)/data:/app/data \
	  $(IMAGE):$(TAG)
