#!/bin/bash
# Install and start service
sudo cp coding-memo.service /lib/systemd/system/
sudo systemctl enable coding-memo.service
sudo systemctl start coding-memo.service
