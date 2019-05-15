#!/bin/sh

set -e
pwd

# get current branch
current=$(git symbolic-ref --short HEAD)

# not strick check for github
mkdir -p ~/.ssh/
ssh-keyscan -Ht rsa github.com >> ~/.ssh/known_hosts

# add npm token
echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > ./.npmrc

# configure git
git config --global user.email "accounts@burnsred.com.au"
git config --global user.name "Codeship CI"

lerna version --exact --amend --convertional-commits --yes --no-commit-hooks --no-git-tag-version --no-push

# Commiting changes
version="v$(npx -c 'json -f lerna.json version')"
npx -c 'json -I -f package.json -e "this.version=\"$version\""'

# publishing
npm run packages-build
git add -A
git commit --amend -m "$version [skip ci]"
git tag -a $version -m $version

lerna publish from-git --yes

npm run packages-link-main:src
npm run packages-link-module:src
git tag -d $version

# Updating branch
git add -A
git commit --amend -m "$version [skip ci]"
git tag -a $version -m $version
git push origin $version
git push origin $current --force

echo "Finished Branch Update!"
