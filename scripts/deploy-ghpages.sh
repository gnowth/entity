#!/bin/sh

# abort the script if there is a non-zero error
# show where we are on the machine
set -e
pwd
remote=$(git config remote.origin.url)
current=$(git symbolic-ref --short HEAD)

# make a directory to put the gp-pages branch
mkdir gh-pages-branch
cd gh-pages-branch

# now lets setup a new repo so we can update the gh-pages branch
git config --global user.email "$CIRCLE_USERNAME@circleci.com"
git config --global user.name "$CIRCLE_USERNAME"
git init
git remote add --fetch origin "$remote"

# switch into the the gh-pages branch
if git rev-parse --verify origin/gh-pages
then
    git checkout gh-pages
    # delete any old site as we are going to replace it
    # Note: this explodes if there aren't any, so moving it here for now
    git rm -rf .
else
    git checkout --orphan gh-pages
fi

# copy over or recompile the new site
cp -a "../dist/." .
cp -a "../.circleci" .

# stage any changes and new files
# now commit, ignoring branch gh-pages doesn't seem to work, so trying skip
# and push, but send any output to /dev/null to hide anything sensitive
git add -A
git commit --allow-empty -m "Deploy to GitHub pages"
# git pull --rebase origin $current
git push origin gh-pages --force

cd ..
rm -rf gh-pages-branch

echo "Finished Deployment!"
