#!/bin/bash

set -e
set -x

rm -rf dist

git clone "${REPOSITORY_NAME}" dist
cd dist
git checkout "${BRANCH_NAME}" || git checkout --orphan "${BRANCH_NAME}"

cd ..
rm -rf dist/**/* || exit 0
npm run deploy

cd dist
git config user.email "${USER_MAIL}"
git config user.name "${USER_MAIL}"
git add .
git commit -m "Deploy to GitHub Pages: ${CI_COMMIT_ID} --skip-ci"
git push origin "${BRANCH_NAME}"
