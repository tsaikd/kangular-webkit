module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		meta: {
			banner: [
				'/*',
				' * <%= pkg.name %>',
				' * <%= pkg.homepage %>',
				' * ',
				' * Version: <%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>',
				' * License: <%= pkg.license %>',
				' */\n'
			].join("\n")
		},
		clean: {
			dist: ["build/*"]
		},
		concat: {
			options: {
				banner: '<%= meta.banner %>'
			},
			dist: {
				src: ["src/**/*.js"],
				dest: "build/<%= pkg.name %>-<%= pkg.version %>.js"
			}
		},
		uglify: {
			options: {
				banner: '<%= meta.banner %>'
			},
			build: {
				src: ["<%= concat.dist.dest %>"],
				dest: "build/<%= pkg.name %>-<%= pkg.version %>.min.js"
			}
		}
	});

	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-uglify");

	grunt.registerTask("default", ["clean", "concat", "uglify"]);

};
