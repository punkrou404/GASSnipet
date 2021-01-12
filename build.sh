#!/bin/sh

if [ -d ./dist ]; then
    rm -rf ./dist
fi

mkdir ./dist

for filename in `find ./src/main -name "*.js"`
do
TARGET=./dist/`basename $filename ".js"`.gs

# 元ネタを出力しておく
echo '// このライブラリのソースコードはこちら' >> $TARGET
echo '// https://github.com/punkrou404/GASUtility' >> $TARGET

# スニペットを全て吐き出す
echo >> $TARGET
echo >> $TARGET
cat $filename >> $TARGET
done