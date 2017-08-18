'use strict';


module.exports = function(grunt) {
    grunt.initConfig({
        compass: {
    			dist: {
    				options: {
    					sassDir: 'sass',
    					cssDir: 'stylesheets',
              outputStyle: 'compressed'
    				}
    			}
    		},
        uglify: {
          my_target: {
            files: {
              'js/app.min.js':['js/app.js'],
              'js/main.min.js':['js/main.js']
            }
          }
        },
        watch: {
          js: {
            files: ['js/app.js','js/main.js'],
            tasks: ['uglify']
          },
          css: {
      			files: 'sass/*.scss',
      			tasks: ['compass']
      		}
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jst');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.registerTask('default',['jst']);
};
