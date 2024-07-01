#REGISTRY=registry.inter-nation.uz
TAG=latest
ENV_TAG=latest
PROJECT_NAME=${PROJECT_NAME}
CURRENT_DIR=$(shell pwd)
APP=$(shell basename ${CURRENT_DIR})

build-image:
	docker build --rm --build-arg SOURCE=${SOURCE} --build-arg PRIVATE_REPO_PASSWORD=${PRIVATE_REPO_PASSWORD} -t ${REGISTRY}/${PROJECT_NAME}/${APP}/${SOURCE}:${TAG} .
	docker tag ${REGISTRY}/${PROJECT_NAME}/${APP}/${SOURCE}:${TAG} ${REGISTRY}/${PROJECT_NAME}/${APP}/${SOURCE}:${ENV_TAG}

push-image:
	docker push ${REGISTRY}/${PROJECT_NAME}/${APP}/${SOURCE}:${TAG}
	docker push ${REGISTRY}/${PROJECT_NAME}/${APP}/${SOURCE}:${ENV_TAG}

clear-image:
	docker rmi ${REGISTRY}/${PROJECT_NAME}/${APP}/${SOURCE}:${TAG}
	docker rmi ${REGISTRY}/${PROJECT_NAME}/${APP}/${SOURCE}:${ENV_TAG}
