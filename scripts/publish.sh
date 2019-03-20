#!/bin/sh

set -e
pwd

# get current branch
current=$(git symbolic-ref --short HEAD)

# configure git
git config --global user.email "$CIRCLE_USERNAME@circleci.com"
git config --global user.name "$CIRCLE_USERNAME"

# copy package.json to packages/root to get updated by lerna
mkdir -p packages/root
cp package.json packages/root

lerna version --exact --amend --convertional-commits --yes --no-commit-hooks --no-git-tag-version --no-push

# get updated package.json from packages/root
cp -f packages/root/package.json .
rm -r packages/root

# Commiting changes
version="v$(npx -c 'echo "$npm_package_version"')"

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
