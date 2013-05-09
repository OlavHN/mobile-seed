module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    less: {
      development: {
        files: {
          "www/lib/bootstrap.css": "bootstrap/less/bootstrap.less"
        }
      }
    },
    manifest: {
      generate: {
        options: {
          basePath: "./www"
        },
        src: [
          "lib/*",
          "views/*.html",
          "fonts/*"
        ],
        dest: "www/manifest.appcache"
      }
    }
  });

  grunt.registerTask('downloadAngular', '', function() {
    var done = this.async();
    
    grunt.util.spawn({
      cmd: 'npm',
      args: ['install'],
      opts: {cwd: 'angular', stdio: 'inherit'}
    }, function(err, res, code) {
      done(err ? false : true);
    });
  });

  grunt.registerTask('installAngular', '', function() {
    var done = this.async();

    grunt.util.spawn({
      cmd:'grunt',
      opts: {cwd: 'angular',stdio: 'inherit'}
    }, function(err, res, code) {
      done(err ? false : true);
    });
  });

  grunt.loadNpmTasks('grunt-manifest');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-update-submodules');

  grunt.registerTask('default', ['update_submodules', 'less', 'downloadAngular', 'installAngular', 'manifest']);
}
