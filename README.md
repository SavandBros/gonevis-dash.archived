# GoNevis Dash

[![Build Status](https://travis-ci.org/SavandBros/gonevis-dash.svg?branch=master)](https://travis-ci.org/SavandBros/gonevis-dash)
[![codecov](https://codecov.io/gh/SavandBros/gonevis-dash/branch/master/graph/badge.svg)](https://codecov.io/gh/SavandBros/gonevis-dash)

This project is the source code of the [GoNevis Dash](http://dash.gonevis.com), the admin area of of GoNevis blogging platform.

## Build & development

Run `npm run build` for building and `npm start` for preview.

### Staging backend API

To run the server that uses GoNevis draft/staging API you don't need to run a differen command. `npm start` or `npm run server` use the staging server API by default,

```bash
> npm server
```

Running against development server:

```bash
> npm run server-dev
```

Finally to let the application consume production server:

```bash
> npm run server-prod
```

## Testing

Running `npm test` will run the unit tests with karma.

### Code Quality

GoNevis Dash uses `jshint` to ensure quality of the code (_it just tries keep the coding rules in line_).

The configuration files of jshint can be found at:

* `.jshintrc`
* `.jshintignore`

To run the jshint over the code:

```bash
> npm run code-quality
```

This step will be executed on CI as well to enforce it on development cycle.

## Branching

Features: Any new work should be branched out from "master" branch and must be merged back into the "master" branch.

Hot fixes: Fixes should be branched out from "production" branch and must be merged back into "master" and "production".

### Branches

Branch **production**, should be last and stable working code that is on production servers.

All the pull requests (from Master branch) should pass the code checks, including and not limited to:

* Test Coverage
* Unit Tess Status
* Build Status
* Reviewers Approval

Branch **master**, should contains the latest development work and should be on staging.

All the pull requests (from developers) should pass the code checks, including and not limited to:

* Test Coverage
* Unit Tess Status
* Build Status
* Reviewers Approval

### Deployment

Deployment happens automatically via the CI.

Latest code on **master** branch will be deployed to the staging, while branch **production** will be deployed to production server.

### Release

To release a new version or have the latest changes on the production:

* Make a new Pull Request from branch **master** to **production**.
* The pull request should pass (not limited to):
  * Test Coverage
  * Unit Test Status
  * Build Status
  * Reviewers Approval

After merging the pull request into **production**, the CI will build and deploy the latest code from production branch to the Production server.

## License

GoNevis Dash is licensed and distributed under GPLv3.
