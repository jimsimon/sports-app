#!/bin/sh

set -e

if output=$(git status --porcelain) && [ -z "$output"]; then
  exit 0
else
  echo "One or more uncommitted or untracked files were found. Please ensure all files are either committed or ignored."
  git status --porcelain
  exit 1
fi
