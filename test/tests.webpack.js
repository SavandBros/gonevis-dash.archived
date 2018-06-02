// This file is an entry point for angular tests
// Avoids some weird issues when using webpack + angular.
import 'angular';
import 'angular-mocks/angular-mocks';
import '../src/app'

const context = require.context('./spec', true, /\.js$/);

context.keys().forEach(context);
