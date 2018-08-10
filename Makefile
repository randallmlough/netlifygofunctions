.PHONY: deps clean build

start: deps clean build server
build: deps clean binaries

deps:
	go get ./cmd/...

clean: 
	rm -rf ./bin

binaries:
	GOOS=linux GOARCH=amd64 go build -o bin/hello ./cmd/hello
	GOOS=linux GOARCH=amd64 go build -o bin/form ./cmd/form
	GOOS=linux GOARCH=amd64 go build -o bin/env ./cmd/env
server: 
	sam local start-api --host localhost --port 9000 --env-vars env.json