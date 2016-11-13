"use strict";

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
  process.env.QT_QPA_PLATFORM = "";

  // Time how long tasks take. Can help when optimizing build times
  require("time-grunt")(grunt);

  // Automatically load required Grunt tasks
  require("jit-grunt")(grunt, {
    useminPrepare: "grunt-usemin",
    ngtemplates: "grunt-angular-templates",
    cdnify: "grunt-google-cdn"
  });

  grunt.loadNpmTasks("grunt-ng-constant");

  var serveStatic = require("serve-static");

  // Configurable paths for the application
  var appConfig = {
    app: require("./bower.json").appPath || "app",
    dist: "dist"
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    gonevisDash: appConfig,

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ["bower.json"],
        tasks: ["wiredep"]
      },
      js: {
        files: ["<%= gonevisDash.app %>/{,*/}/{,*/}*.js"],
        tasks: ["newer:jshint:all", "newer:jscs:all"],
        options: {
          livereload: "<%= connect.options.livereload %>"
        }
      },
      jsTest: {
        files: ["test/spec/{,*/}*.js"],
        tasks: ["newer:jshint:test", "newer:jscs:test", "karma"]
      },
      styles: {
        files: ["<%= gonevisDash.app %>/assets/css/{,*/}*.css"],
        tasks: ["newer:copy:styles", "postcss"]
      },
      gruntfile: {
        files: ["Gruntfile.js"]
      },
      livereload: {
        options: {
          livereload: "<%= connect.options.livereload %>"
        },
        files: [
          "<%= gonevisDash.app %>/*/{,*/}/{,*/}*.html",
          ".tmp/styles/{,*/}*.css",
          "<%= gonevisDash.app %>/assets/img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}"
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: "localhost",
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          middleware: function (connect) {
            return [
              serveStatic(".tmp"),
              connect().use(
                "/bower_components",
                serveStatic("./bower_components")
              ),
              connect().use(
                "/app/assets/css",
                serveStatic("./app/assets/css")
              ),
              serveStatic(appConfig.app)
            ];
          }
        }
      },
      test: {
        options: {
          port: 9001,
          middleware: function (connect) {
            return [
              serveStatic(".tmp"),
              serveStatic("test"),
              connect().use(
                "/bower_components",
                serveStatic("./bower_components")
              ),
              serveStatic(appConfig.app)
            ];
          }
        }
      },
      dist: {
        options: {
          open: true,
          base: "<%= gonevisDash.dist %>"
        }
      }
    },

    // Make sure there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: ".jshintrc",
        reporter: require("jshint-stylish")
      },
      all: {
        src: [
          "Gruntfile.js",
          "<%= gonevisDash.app %>/{,*/,*/}*.js"
        ]
      },
      test: {
        options: {
          jshintrc: "test/.jshintrc"
        },
        src: ["test/spec/{,*/}*.js"]
      }
    },

    // Make sure code styles are up to par
    jscs: {
      options: {
        config: ".jscsrc",
        fix: true
      },
      all: {
        src: [
          "Gruntfile.js",
          "<%= gonevisDash.app %>/{,*/}*.js",
        ]
      },
      test: {
        src: ["test/spec/{,*/}*.js"]
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            ".tmp",
            "<%= gonevisDash.dist %>/{,*/}*",
            "!<%= gonevisDash.dist %>/.git{,*/}*"
          ]
        }]
      },
      server: ".tmp"
    },

    // Add vendor prefixed styles
    postcss: {
      options: {
        processors: [
          require("autoprefixer-core")({ browsers: ["last 1 version"] })
        ]
      },
      server: {
        options: {
          map: true
        },
        files: [{
          expand: true,
          cwd: ".tmp/styles/",
          src: "{,*/}*.css",
          dest: ".tmp/styles/"
        }]
      },
      dist: {
        files: [{
          expand: true,
          cwd: ".tmp/styles/",
          src: "{,*/}*.css",
          dest: ".tmp/styles/"
        }]
      }
    },

    // Automatically inject Bower components into the app
    wiredep: {
      app: {
        src: ["<%= gonevisDash.app %>/index.html"],
        ignorePath: /\.\.\//
      },
      test: {
        devDependencies: true,
        src: "<%= karma.unit.configFile %>",
        ignorePath: /\.\.\//,
        fileTypes: {
          js: {
            block: /(([\s\t]*)\/{2}\s*?bower:\s*?(\S*))(\n|\r|.)*?(\/{2}\s*endbower)/gi,
            detect: {
              js: /'(.*\.js)'/gi
            },
            replace: {
              js: "'{{filePath}}',"
            }
          }
        }
      }
    },

    // Renames files for browser caching purposes
    filerev: {
      dist: {
        src: [
          "<%= gonevisDash.dist %>/{,*/}*.js",
          "<%= gonevisDash.dist %>/assets/css/{,*/}*.css",
          "<%= gonevisDash.dist %>/assets/img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}",
          "<%= gonevisDash.dist %>/assets/css/fonts/*"
        ]
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: "<%= gonevisDash.app %>/index.html",
      options: {
        dest: "<%= gonevisDash.dist %>",
        flow: {
          html: {
            steps: {
              js: ["concat", "uglifyjs"],
              css: ["cssmin"]
            },
            post: {}
          }
        }
      }
    },

    // Performs rewrites based on filerev and the useminPrepare configuration
    usemin: {
      html: ["<%= gonevisDash.dist %>/{,*/}*.html"],
      css: ["<%= gonevisDash.dist %>/assets/css/{,*/}*.css"],
      js: ["<%= gonevisDash.dist %>/{,*/}*.js"],
      options: {
        assetsDirs: [
          "<%= gonevisDash.dist %>",
          "<%= gonevisDash.dist %>/assets/img",
          "<%= gonevisDash.dist %>/assets/css"
        ],
        patterns: {
          js: [
            [/(images\/[^''""]*\.(png|jpg|jpeg|gif|webp|svg))/g, "Replacing references to images"]
          ]
        }
      }
    },

    // The following *-min tasks will produce minified files in the dist folder
    // By default, your `index.html`'s <!-- Usemin block --> will take care of
    // minification. These next options are pre-configured if you do not wish
    // to use the Usemin blocks.
    // cssmin: {
    //   dist: {
    //     files: {
    //       '<%= gonevisDash.dist %>/assets/css/main.css': [
    //         '.tmp/styles/{,*/}*.css'
    //       ]
    //     }
    //   }
    // },
    // uglify: {
    //   dist: {
    //     files: {
    //       '<%= gonevisDash.dist %>/scripts.js': [
    //         '<%= gonevisDash.dist %>/scripts.js'
    //       ]
    //     }
    //   }
    // },
    // concat: {
    //   dist: {}
    // },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: "<%= gonevisDash.app %>/assets/img",
          src: "{,*/}*.{png,jpg,jpeg,gif}",
          dest: "<%= gonevisDash.dist %>/assets/img"
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: "<%= gonevisDash.app %>/assets/img",
          src: "{,*/}*.svg",
          dest: "<%= gonevisDash.dist %>/assets/img"
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          conservativeCollapse: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true
        },
        files: [{
          expand: true,
          cwd: "<%= gonevisDash.dist %>",
          src: ["*.html"],
          dest: "<%= gonevisDash.dist %>"
        }]
      }
    },

    ngtemplates: {
      dist: {
        options: {
          module: "gonevisDash",
          htmlmin: "<%= htmlmin.dist.options %>",
          usemin: "scripts/scripts.js"
        },
        cwd: "<%= gonevisDash.app %>",
        src: ["{,*/}*/{,*/}*.html", "{,*/}*.html", "{,*/}*/{,*/}*/{,*/}*.html", "!index.html"],
        dest: ".tmp/templateCache.js"
      }
    },

    // ng-annotate tries to make the code safe for minification automatically
    // by using the Angular long form for dependency injection.
    ngAnnotate: {
      dist: {
        files: [{
          expand: true,
          cwd: ".tmp/concat/scripts",
          src: "*.js",
          dest: ".tmp/concat/scripts"
        }]
      }
    },

    // Replace Google CDN references
    cdnify: {
      dist: {
        html: ["<%= gonevisDash.dist %>/*.html"]
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: "<%= gonevisDash.app %>",
          dest: "<%= gonevisDash.dist %>",
          src: [
            "*.{ico,png,txt}",
            "*.html",
            "assets/img/{,*/}*.{webp}",
            "assets/css/fonts/{,*/}*.*"
          ]
        }, {
          expand: true,
          cwd: ".tmp/images",
          dest: "<%= gonevisDash.dist %>/assets/img",
          src: ["generated/*"]
        }, {
          expand: true,
          cwd: "bower_components/bootstrap/dist",
          src: "fonts/*",
          dest: "<%= gonevisDash.dist %>"
        }, {
          expand: true,
          cwd: "bower_components/font-awesome",
          src: "fonts/*",
          dest: "<%= gonevisDash.dist %>"
        }]
      },
      styles: {
        expand: true,
        cwd: "<%= gonevisDash.app %>/assets/css",
        dest: ".tmp/styles/",
        src: "{,*/}*.css"
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [
        "copy:styles"
      ],
      test: [
        "copy:styles"
      ],
      dist: [
        "copy:styles",
        "imagemin",
        "svgmin"
      ]
    },

    // Test settings
    karma: {
      unit: {
        configFile: "test/karma.conf.js",
        singleRun: true
      }
    },
    ngconstant: {
      options: {
        space: "  ",
        wrap: "\"use strict\";\n\n var app = {%= __ngModule %}",
        name: "gonevisDash",
        dest: "<%= gonevisDash.app %>/app_config.js",
        deps: [
          "ngMaterial",
          "ngAnimate",
          "ui.router",
          "ngAnimate",
          "ngCookies",
          "ngMessages",
          "ngResource",
          "ngSanitize",
          "gettext",
          "xeditable",
          "textAngular",
          "angularModalService",
          "ngTagsInput",
          "ngFileUpload",
          "slugifier",
          "angular-sortable-view"
        ],
        constants: {
          ENV: {
            googleAnalyticsID: "UA-XXXXXXX-X"
          }
        }
      },
      development: {
        constants: {
          ENV: {
            name: "development",
            apiEndpoint: "http://127.0.0.1:8000/api/v1/"
          }
        }
      },
      staging: {
        constants: {
          ENV: {
            name: "staging",
            apiEndpoint: "http://draft.gonevis.com/api/v1/"
          }
        }
      },
      production: {
        constants: {
          ENV: {
            name: "production",
            apiEndpoint: "http://api.gonevis.com/api/v1/"
          }
        }
      }
    }
  });

  // release
  grunt.registerTask('release', [
    "clean:dist",
    "ngconstant:production",
    "wiredep",
    "useminPrepare",
    "concurrent:dist",
    "postcss",
    "ngtemplates",
    "concat",
    "ngAnnotate",
    "copy:dist",
    "cdnify",
    "cssmin",
    "uglify",
    "filerev",
    "usemin",
    "htmlmin"
  ]);

  grunt.registerTask('staging', [
    "clean:dist",
    "ngconstant:staging",
    "wiredep",
    "useminPrepare",
    "concurrent:dist",
    "postcss",
    "ngtemplates",
    "concat",
    "ngAnnotate",
    "copy:dist",
    "cdnify",
    "cssmin",
    "uglify",
    "filerev",
    "usemin",
    "htmlmin"
  ]);


  grunt.registerTask("serve", "Compile then start a connect web server", function (target) {
    if (target === "dist") {
      return grunt.task.run(["build", "connect:dist:keepalive"]);
    }

    if (target === "staging") {
      return grunt.task.run([
        "clean:server",
        "ngconstant:staging",
        "wiredep",
        "concurrent:server",
        "postcss:server",
        "connect:livereload",
        "watch"
      ]);
    }

    grunt.task.run([
      "clean:server",
      "ngconstant:development",
      "wiredep",
      "concurrent:server",
      "postcss:server",
      "connect:livereload",
      "watch"
    ]);
  });

  grunt.registerTask("test", [
    "clean:server",
    "ngconstant:development",
    "wiredep",
    "concurrent:test",
    "postcss",
    "connect:test",
    "karma"
  ]);

  grunt.registerTask("build", [
    "clean:dist",
    "ngconstant:production",
    "wiredep",
    "useminPrepare",
    "concurrent:dist",
    "postcss",
    "ngtemplates",
    "concat",
    "ngAnnotate",
    "copy:dist",
    "cdnify",
    "cssmin",
    "uglify",
    "filerev",
    "usemin",
    "htmlmin"
  ]);

  grunt.registerTask("default", [
    "newer:jshint",
    "newer:jscs",
    "test",
    "build"
  ]);

  // Rock'nRolla
  grunt.registerTask('rock', function () {
    if (process.env.NPM_CONFIG_PRODUCTION === 'false') {
      console.log('Rocking on draft!');
      return grunt.task.run(['staging']);
    }

    console.log('Rock to Release!');
    return grunt.task.run(['release']);
  });
};
