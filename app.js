"use strict";

var gzippo = require('gzippo');
var express = require('express');
var app = express();

app.use(require('morgan')('dev'));
app.set('port', (process.env.PORT || 9000));
app.use(gzippo.staticGzip(__dirname + '/dist'));

app.listen(app.get('port'), function () {
  console.log('GoNevis Dash application is running on port', app.get('port'));
});
