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
          'libs/jquery.min.js',
          'libs/bootstrap.min.js',
          'libs/angular.min.js',
          'libs/moment.js',
          'src/app.js',
          'src/controllers/listViewController.js'
        ],
        dest: '../static/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %><%= grunt.template.today("dd-mm-yyyy") %> */\n',
        mangle: false
      },
      dist: {
        files: {
          '../static/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    less: {
      all: {
        files: {
          "../static/main.css": "../static/main.less",
        }
      }
    },
    htmlbuild: {
      dist: {
        src: '../templates/index.html',
        dest: '../templates/index.jinja2',
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
      src: ["src/**/*.js"]
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
