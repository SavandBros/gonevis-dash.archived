// This file is an entry point for angular tests
// Avoids some weird issues when using webpack + angular.
require("./../src/app/vendor");
require("./../src/app/index");

require("angular-mocks/angular-mocks");

const context = require.context('./spec', true, /\.js$/);
context.keys().forEach(context);
