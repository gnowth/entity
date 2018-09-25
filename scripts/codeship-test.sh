#!/bin/bash

set -e
set -x

npm run build
npm run lint
npm test
