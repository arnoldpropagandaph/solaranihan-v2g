#!/bin/zsh

# Variables
REMOTE_USER="your_username"
REMOTE_HOST="your_remote_host"

# Commands to execute
ssh $REMOTE_USER@$REMOTE_HOST << 'ENDSSH'
cd /path/to/remote/directory
# Add your commands here, e.g., start a service, run a script, etc.
echo "Deployment complete!"
ENDSSH
