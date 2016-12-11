#!/bin/bash

mkdir -p bower_components/quill/dist/{css,js}

curl -o bower_components/quill/dist/js/quill.js http://cdn.quilljs.com/1.1.5/quill.js
curl -o bower_components/quill/dist/css/quill.snow.css http://cdn.quilljs.com/1.1.5/quill.snow.css
curl -o bower_components/quill/dist/css/quill.bubble.css http://cdn.quilljs.com/1.1.5/quill.bubble.css
