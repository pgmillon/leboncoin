'use strict';

var LIVERELOAD_PORT = 35729;
module.exports = function (grunt) {

  var LIVERELOAD_PORT = 35729;

  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({

    less: {
      production: {
        options: {
          paths: [
            "css",
            "bower_components"
          ],
          yuicompress: true
        },
        files: {
          "_site/css/main.css": "css/main.less"
        }
      }
    },

    jade: {
      compile: {
        files: {
          '_site/index.html': 'index.jade'
        }
      }
    },

    copy: {
      js: {
        files: [
          {
            expand: true,
            src: ['js/**',],
            dest: '_site/'
          },
        ]
      },
      static: {
        files: [
          {
            expand: true,
            src: [
              'bower_components/**',
              'img/**'
            ],
            dest: '_site/'
          },
        ]
      }
    },

    clean: ["_site"],

    watch: {
      grunt: { files: ['Gruntfile.js'] },

      less: {
        files: 'css/*.less',
        tasks: ['less']
      },

      js: {
        files: 'js/**',
        tasks: ['copy:js']
      },

      jade: {
        files: '*.jade',
        tasks: ['jade']
      },

      options: {
        livereload: LIVERELOAD_PORT
      }
    },

    connect: {
      livereload: {
        options: {
          base: '_site',
          keepalive: false,
          middleware: function (connect, options) {
            return [
              require('connect-livereload')({ port: LIVERELOAD_PORT }),
              require('grunt-connect-proxy/lib/utils').proxyRequest,
              connect.static(require('path').resolve('_site'))
            ];
          }
        },
        proxies: [
          {
            context: '/api',
            host: 'localhost',
            port: 5000
          }
        ]
      }
    }


  });

  grunt.registerTask('serve', [
    'build',
    'configureProxies:livereload',
    'connect',
    'watch']);

  grunt.registerTask('build', [
    'clean',
    'less',
    'copy',
    'jade']);

  grunt.registerTask('default', ['serve']);

};