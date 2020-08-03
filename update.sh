#!/bin/bash
# Simple update
sudo systemctl stop coding-memo.service
git stash
git pull
git stash apply
npm install
npm run build
sudo systemctl start coding-memo.service
