#!/bin/sh

if [ -d ./dist ]; then
    rm -rf ./dist
fi

mkdir ./dist
TARGET=./dist/main.gs

# 元ネタを出力しておく
echo '// このライブラリのソースコードはこちら' >> $TARGET
echo '// https://github.com/punkrou404/GASUtility' >> $TARGET

for filename in `find ./src/main -name "*.js"`
do
# スニペットを全て吐き出す
echo >> $TARGET
cat $filename >> $TARGET
echo >> $TARGET
done