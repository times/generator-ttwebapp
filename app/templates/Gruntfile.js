// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
/*jslint node: true */
'use strict';

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
        src: 'js/app.js',
        dest: 'js/app.min.js'
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

  grunt.initConfig( taskConfig );

  grunt.registerTask('build', ['clean','copy','jshint','uglify','sass']);
  grunt.registerTask( 'default', ['build', 'watch'] );

};