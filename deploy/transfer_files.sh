#!/bin/zsh

# Variables
REMOTE_USER="your_username"
REMOTE_HOST="your_remote_host"
REMOTE_DIR="/path/to/remote/directory"
LOCAL_DIR="/path/to/local/directory"

# Transfer files
scp -r $LOCAL_DIR $REMOTE_USER@$REMOTE_HOST:$REMOTE_DIR
