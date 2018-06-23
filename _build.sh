#!/usr/bin/env bash
set -e

MODE=$1||development

echo " * Installing Bower dependencies..."
bower install

echo ""
echo " * Executing webpack..."
# Compile all javascript files and minify them together with Fancytree
webpack --mode ${MODE} -p --progress

echo ""
echo " * Copying required vendor files to public directory..."
# jQuery
if [ ! -d "./src/Resources/public/vendor/jquery" ]; then
    mkdir -p ./src/Resources/public/vendor/jquery/dist
fi
cp ./bower_components/jquery/dist/jquery.min.js ./src/Resources/public/vendor/jquery/dist/jquery.min.js

# jQuery UI
if [ ! -d "./src/Resources/public/vendor/jquery-ui" ]; then
    mkdir ./src/Resources/public/vendor/jquery-ui
fi
cp ./bower_components/jquery-ui/jquery-ui.min.js ./src/Resources/public/vendor/jquery-ui/jquery-ui.min.js
