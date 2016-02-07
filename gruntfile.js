module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            options: {
                atBegin: true
            },
            sass: {
                files: ['src/scss/**/*.scss'],
                tasks: ['sass']
            }
        },
        browserify: {
            publish: {
                files: {
                    'resources/js/routeplanner.js': ['src/js/index.js']
                },
                options : {
                    transform : ['reactify']
                }
            }
        },
        sass: {
            dist: {
                files: {
                    'resources/css/main.css': 'src/scss/main.scss'
                }
            }
        },
        connect: {
            server: {
                options: {
                    port: 8888,
                    keepalive: true
                }
            },
            keepalive: true
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-browserify');

    grunt.registerTask('default', ['sass','browserify:publish']);

}