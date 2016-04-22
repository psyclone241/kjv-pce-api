module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);

  grunt.registerTask('server', function (target) {
      if (target === 'dist') {
          return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
      }

      grunt.task.run([
          // 'clean:server',
          // 'coffee:dist',
          // 'createDefaultTemplate',
          // 'jst',
          // 'compass:server',
          'flask',
          // 'open',
          // 'watch',
      ]);
  });

  grunt.registerTask('flask', 'Run flask server.', function() {
     var spawn = require('child_process').spawn;
     grunt.log.writeln('Starting Flask development server.');
     // stdio: 'inherit' let us see flask output in grunt
     var PIPE = {stdio: 'inherit'};
     spawn('python', ['servelocal.py'], PIPE);
  });
};
