const sass = require('node-sass');

module.exports = function(grunt) {
  'use strict';

  // Load all grunt packages
  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      dist: {
        options: {
          implementation: sass,
          style: 'compressed',
          sourceMap: true
        },
        files: {
          'dist/css/style.css': [
            'src/scss/style.scss',
            'src/scss/*/*.scss',
            'src/scss/*/*/*.scss',
            'src/scss/*/*/*/*.scss'
          ]
        }
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %> */ \n'
      },
      targets: {
        files: {
          'dist/js/main.min.js': 'dist/js/main.js',
        } //Files
      }
    },
    concat: {
      options: {
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %> */ \n'
      },
      targets: {
        files: {
          'dist/js/main.js': ['node_modules/bootstrap-sass/assets/javascripts/bootstrap.js', 'src/js/*/*/*.js', 'src/js/*/*.js', 'src/js/main.js'],
        } //Files
      }
    }, //concat
    cssmin: {
      files: {
        expand: true,
        cwd: 'dist/css/',
        src: ['*.css', '!*.min.css'],
        dest: 'dist/css/',
        ext: '.min.css'
      }
    },
    copy: {
      fonts: {
        files: [{
          expand: true,
          src: '**',
          dest: 'dist/fonts',
          cwd: 'node_modules/bootstrap-sass/assets/fonts/',
        }]
      }
    },
    htmlmin: {
      dev: {
        // @NOTE: All options can be found at https://github.com/kangax/html-minifier#options-quick-reference
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: [{
          expand: true,
          cwd: 'src',
          src: ['**/*.html', '*.html'],
          dest: 'dist'
        }]
      }
    },
    watch: {
      options: {
        livereload: true
      },
      scripts: {
        files: ['src/js/**/*.js'],
        tasks: ['concat']
      },
      sass: {
        files: ['src/scss/**/*.scss'],
        tasks: ['sass']
      },
      html: {
        files: ['src/**/*.html', '*.html'],
        tasks: ['htmlmin']
      }
    }
  }); //initConfig
  grunt.registerTask('default', ['watch']);
  grunt.registerTask('init', ['copy', 'concat', 'uglify', 'sass', 'cssmin', 'htmlmin']);
  grunt.registerTask('build', ['concat', 'uglify', 'sass', 'cssmin', 'htmlmin']);
} //exports
