#!/bin/bash

git status

echo -n "Enter object name and press [ENTER]: "
read name
echo -n "Enter the changes and press [ENTER]: "
read msg
echo -n "Enter the issue # and press [ENTER]: "
read issue
echo

git add .

if [ "$issue" == "" ]; then
	git commit -m "[$name] $msg"
else
	git commit -m "[$name] $msg (#$issue)"
fi
echo
