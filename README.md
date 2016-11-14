# Gonevis Dash

[![Build Status](https://travis-ci.org/SavandBros/gonevis-dash.svg?branch=master)](https://travis-ci.org/SavandBros/gonevis-dash)
[![codecov](https://codecov.io/gh/SavandBros/gonevis-dash/branch/master/graph/badge.svg)](https://codecov.io/gh/SavandBros/gonevis-dash)
[![Dependency Status](https://gemnasium.com/badges/github.com/SavandBros/gonevis-dash.svg)](https://gemnasium.com/github.com/SavandBros/gonevis-dash)


This project is the source code of the [Me Gonevis], the admin area of
Gonevis platform.

## Build & development

Run `grunt` for building and `grunt serve` for preview.

### Staging backend API

To run the server that uses GoNevis draft/staging API:

```
$ grunt serve:staging
```

### Code Quality

GoNevis Dash uses code quality checkers & linters.
On each pull request the CI runs them.

Before making a pull patch, be sure to run:

```
$ grunt jshint jscs
```

## Testing

Running `grunt test` will run the unit tests with karma.


## License

Gonevis Dash is licensed and distrubuted under GPLv3.
