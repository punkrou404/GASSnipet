#!/bin/sh

if [ -d ./dist ]; then
    rm -rf ./dist
fi

mkdir ./dist

for filename in `find ./src/main -name "*.js"`
do
cat $filename >> ./dist/main.gs
echo >> ./dist/main.gs
echo >> ./dist/main.gs
done