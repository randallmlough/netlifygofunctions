# Run Netlify + AWS GO Lambda Functions (Locally!)
Build and test AWS Golang lambda functions locally and have it work with Netlify's functions.

## Prerequisites
* [Docker](https://docs.docker.com/install)
* [AWS Command Line Interface](https://docs.aws.amazon.com/cli/latest/userguide/installing.html) - and configured 
* [AWS SAM Local](https://github.com/awslabs/aws-sam-local#windows-linux-macos-with-npm-recommended)

## Overview
This repo is intended to make Netlify users life a litte bit easier by allowing them to test their functions locally (with live reloading!) and publish to Netlify seamlessly.

## Runing Locally
:warning: Make sure to install all the [Prerequisites](#prerequisites). On Mac
OSX and Windows, ensure that the Docker VM is running.

## Installation & usage
```bash
# Install npm dependencies
npm install -g aws-sam-local

# Clone the skeleton into your go path
cd $GOPATH/src 
git clone https://github.com/randallmlough/netlifygofunctions.git netlifygofunctions

# Compile the sample lambdas
cd netlifygofunctions
npm i

# Start the servers (frontend deploys to :3000 and backend deploys to :9000)
npm start 

# To build your functions to publish on netlify
npm build 

```

## Some config changes before Netlify Deployment
change the `GO_IMPORT_PATH` in `netlify.toml` to your repo

## Invoke functions
All functions should use the path `/.netlify/functions/{{FUNCTION NAME}}` the router will automatically route all `/.netlify` traffic to backend port of `:9000`