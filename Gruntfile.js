module.exports = function (grunt) {

  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: [
          'frontend/libs/jquery.min.js',
          'frontend/libs/bootstrap.min.js',
          'frontend/libs/angular.min.js',
          'frontend/libs/moment.js',
          'frontend/src/app.js',
          'frontend/src/utils.js',
          'frontend/src/controllers/listViewController.js'
        ],
        dest: 'top250/static/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %><%= grunt.template.today("dd-mm-yyyy") %> */\n',
        mangle: false
      },
      dist: {
        files: {
          'top250/static/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    less: {
      all: {
        files: {
          "top250/static/main.css": "top250/static/main.less",
        }
      }
    },
    htmlbuild: {
      dist: {
        src: 'top250/templates/index.html',
        dest: 'top250/templates/index.jinja2',
        options: {
          styles: {
            main: ['dist/main.css'] 
          },
          scripts: {
            minified: '/static/<%= pkg.name %>.min.js'
          }
        },
      }
    },
    jshint: {
      src: ["frontend/src/**/*.js"]
    },
    watch: {
      files: ['<%= concat.dist.src %>'],
      tasks: ['concat', 'uglify']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-html-build');

  grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'less', 'htmlbuild']);
};
