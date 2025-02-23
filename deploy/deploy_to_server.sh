#!/bin/bash

# Deploy the project to the server
echo "Deploying the project to the server..."
# Example deployment command using rsync
rsync -avz --exclude='node_modules' ./build/ user@server:/path/to/deploy

# Example command to start the server on a different port
ssh user@server 'cd /path/to/deploy && PORT=8081 npm start'
