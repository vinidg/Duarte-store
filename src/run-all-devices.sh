#!/usr/bin/env bash
deviceLst=$(adb devices | awk 'NR > 1 {print $1}' | sed ':a;N;$!ba;s/\n/ /g')
enviroment=$1
IFS=' ' read -a array <<< "$deviceLst"

for element in "${array[@]}"
do
    cross-env ENV=$enviroment ionic cordova run android --target=$element
done
