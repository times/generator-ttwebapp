// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
/*jslint node: true */
'use strict';

var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

module.exports = function(grunt) {

  var taskConfig = {

    pkg: grunt.file.readJSON('package.json'),

    vendor_files: {
      js: [
        'bower_components/modernizr/modernizr.js',
        'bower_components/jquery/jquery.min.js',
        <% if (includeFoundation) { %>'bower_components/foundation/js/foundation.min.js',<% } %>
      ],
      css: [
      ]
    },

    clean: [
      'css',
      'js/libs'
    ],

    copy: {
      main: {
        src: [ '<%%= vendor_files.js %>' ],
        dest: 'js/libs',
        flatten: true,
        expand: true
      }
    },

    uglify: {
      options: {
        banner: '/*! <%%= pkg.name %> <%%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'js/*.js',
        dest: 'js/',
        expand: true,
        flatten: true,
        ext: '.min.js'
      }
    },

    jshint: {
      files: ['Gruntfile.js', 'js/app.js'],
      options: {
        globals: {
          curly: true,
          immed: true,
          newcap: true,
          noarg: true,
          sub: true,
          boss: true,
          eqnull: true
        }
      }
    },

    connect: {
      options: {
        port: 9000,
        // change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [
              lrSnippet,
              mountFolder(connect, '.')
            ];
          }
        }
      }
    },

    open: {
      server: {
        path: 'http://localhost:<%%= connect.options.port %>'
      }
    },

    sass: {
      <% if (includeFoundation) { %>options: {
        includePaths: ['bower_components/foundation/scss']
      },<% } %>
      dist: {
        options: {
          outputStyle: 'compressed'
        },
        files: {
          'css/app.css': 'scss/app.scss'
        }
      }
    },

    watch: {
      grunt: { files: ['Gruntfile.js', 'js/app.js'] },
      sass: {
        files: 'scss/**/*.scss',
        tasks: ['sass']
      }
    }

  };

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-open');

  grunt.initConfig( taskConfig );

  grunt.registerTask('build', ['clean','copy','jshint','uglify','sass']);
  grunt.registerTask('serve', ['build', 'connect:livereload', 'open', 'watch']);
  grunt.registerTask( 'default', ['build', 'watch'] );

};