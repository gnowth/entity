#!/bin/sh

set -e
pwd

# get current branch
current=$(git symbolic-ref --short HEAD)

# configure git
git config --global user.email "$CIRCLE_USERNAME@circleci.com"
git config --global user.name "$CIRCLE_USERNAME"

lerna version --exact --amend --convertional-commits --yes --no-commit-hooks --no-git-tag-version --no-push

# Commiting changes
version="v$(npx -c 'json -f lerna.json version')"
npx -c 'json -I -f package.json -e "this.version=\"$version\""'

# Updating branch
git add -A
git commit --amend -m "$version [skip ci]"
git tag -a $version -m $version
git push origin $version
git push origin $current --force

# publishing
npm run packages-build
lerna publish from-git --yes

echo "Finished Branch Update!"
