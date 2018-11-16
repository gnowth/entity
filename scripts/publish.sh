#!/bin/sh

set -e
pwd

# get current branch
current=$(git symbolic-ref --short HEAD)

# configure git
git config --global user.email "$CIRCLE_USERNAME@circleci.com"
git config --global user.name "$CIRCLE_USERNAME"

# copy package.json to packages/react to get updated by lerna
mkdir -p packages/react
cp package.json packages/react

lerna version --exact --amend --convertional-commits --yes --no-commit-hooks --no-git-tag-version --no-push

# get updated package.json from packages/react
cp -f packages/react/package.json .
rm -r packages/react

# Commiting changes
version="v$(npx -c 'echo "$npm_package_version"')"

# publishing
npm run packages-build
git add -A
git commit --amend -m "$version [skip ci]"
git tag -a $version -m $version

lerna publish from-git --yes

npm run packages-link-main:src
git tag -d $version

# Updating branch
git add -A
git commit --amend -m "$version [skip ci]"
git tag -a $version -m $version
git push origin $version
git push origin $current --force

echo "Finished Branch Update!"
