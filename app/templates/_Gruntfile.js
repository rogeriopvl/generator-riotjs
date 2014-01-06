module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect: {
      livereload: {
        options: {
          base: 'app',
          port: 9000,
          host: 'localhost',
          livereload: 35729
        }
      }
    },
    watch: {
      all: {
        files: ['app/**/*']
      },
      options: {
        livereload: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('server', function(target) {
    grunt.task.run([
      'connect',
      'watch:all'
    ]);
  });

  grunt.registerTask('default', ['server']);
};
