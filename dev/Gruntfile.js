/*!
 * SUI Mobile
 */

/* jshint node: true */
module.exports = function(grunt) {
    'use strict';

    // Force use of Unix newlines
    grunt.util.linefeed = '\n';

    RegExp.quote = function(string) {
        return string.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
    };

    var buildTo = grunt.option('buildTo');
    var dist = buildTo ? (buildTo + '/') : 'dist/';
    var src = '../src/';

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Metadata.
        meta: {
            distPath: dist,
            srcPath: src,
            doclessetsPath: 'docs/assets/',
            docsDistPath: 'docs/dist/',
            docsPath: 'docs/',
            jsPath: 'js/',
            lessPath: 'less/',
            smJSPath: 'sm-js/',
            smLessPath: 'sm-less/',
        },

        banner: '/*!\n' +

        ' * =====================================================\n' +
        ' * SUI Mobile\n' +
        ' * used BY yunying UI\n' +
        ' * project for \n' +
        ' *\n' +
        ' * =====================================================\n' +
        ' */\n',
        //,

        clean: {
            dist: ['<%= meta.distPath %>', '<%= meta.docsDistPath %>']
        },

        concat: {
            sm: {
              options: {
                  banner: '<%= banner %>;$.smVersion = "<%= pkg.version %>";'
              },
              src: [
                  '<%= meta.smJSPath %>intro.js',
                  '<%= meta.smJSPath %>util.js',
                  '<%= meta.smJSPath %>zepto-adapter.js',
                  '<%= meta.smJSPath %>device.js',
                  '<%= meta.smJSPath %>fastclick.js',
                  '<%= meta.smJSPath %>modal.js',
                  '<%= meta.smJSPath %>calendar.js',
                  '<%= meta.smJSPath %>picker.js',
                  '<%= meta.smJSPath %>datetime-picker.js',
                  '<%= meta.smJSPath %>iscroll.js',
                  '<%= meta.smJSPath %>scroller.js',
                  '<%= meta.smJSPath %>tabs.js',
                  '<%= meta.smJSPath %>fixed-tab.js',
                  '<%= meta.smJSPath %>pull-to-refresh-js-scroll.js',
                  '<%= meta.smJSPath %>pull-to-refresh.js',
                  '<%= meta.smJSPath %>infinite-scroll.js',
                  '<%= meta.smJSPath %>searchbar.js',
                  '<%= meta.smJSPath %>panels.js',
                  '<%= meta.smJSPath %>router.js',
                  '<%= meta.smJSPath %>last-position.js',
                  '<%= meta.smJSPath %>init.js',
                  '<%= meta.smJSPath %>scroll-fix.js'
              ],
              dest: '<%= meta.distPath %>js/<%= pkg.name %>.js'
            },
            extend: {
                options: {
                    banner: '<%= banner %>'
                },
                src: [
                    '<%= meta.smJSPath %>swiper.js',
                    '<%= meta.smJSPath %>swiper-init.js',
                    '<%= meta.smJSPath %>photo-browser.js'
                ],
                dest: '<%= meta.distPath %>js/<%= pkg.name %>-extend.js'
            },
            cityPicker: {
                options: {
                    banner: '<%= banner %>'
                },
                src: [
                    '<%= meta.smJSPath %>city-data.js',
                    '<%= meta.smJSPath %>city-picker.js'
                ],
                dest: '<%= meta.distPath %>js/<%= pkg.name %>-city-picker.js'
            }
        },


        less: {
            options: {
                paths: ['./','<%= meta.smLessPath %>'],
                ieCompat: false
            },
            core: {
                src: '<%= meta.smLessPath %>sm.less',
                dest: '<%= meta.distPath %>css/<%= pkg.name %>.css'
            },
            extend: {
                src: '<%= meta.smLessPath %>sm-extend.less',
                dest: '<%= meta.distPath %>css/<%= pkg.name %>-extend.css'
            },
            normal: {
            	expand: true,
            	cwd: '<%= meta.lessPath %>',
                src: '*.less',
                dest: '<%= meta.distPath %>css/',
                ext: '.css'
            },
//          docs: {
//              src: '<%= meta.doclessetsPath %>css/docs.less',
//              dest: '<%= meta.doclessetsPath %>css/docs.css'
//          },
//          demos: {
//              src: '<%= meta.doclessetsPath %>css/demos.less',
//              dest: '<%= meta.doclessetsPath %>css/demos.css'
//          }
        },

        usebanner: {
            dist: {
                options: {
                    position: 'top',
                    banner: '<%= banner %>'
                },
                files: {
                    src: [
                        '<%= meta.distPath %>css/sm*.css',
                        '<%= meta.doclessetsPath %>css/docs.css'
                    ]
                }
            }
        },

        copy: {
            /*
            fonts: {
                expand: true,
                src: 'fonts/*',
                dest: '<%= meta.docsDistPath %>'
            },
            */
          	/*
            img: {
                expand: true,
                src: 'img/*',
                dest: '<%= meta.doclessetsPath %>'
            },
            */
            css: {
            	expand: true,
            	cwd: '<%= meta.distPath %>css',
            	src: '*.css',
            	dest: '<%= meta.srcPath %>css/'
            },
            js: {
            	expand: true,
            	cwd: '<%= meta.distPath %>js',
            	src: '*.js',
            	dest: '<%= meta.srcPath %>js/'
            },
            normalJs: {
            	expand: true,
            	cwd: '<%= meta.jsPath %>',
            	src: '*.js',
            	dest: '<%= meta.srcPath %>js/'
            }
//          docs: {
//              expand: true,
//              cwd: '<%= meta.distPath %>',
//              src: [
//                  '**/*'
//              ],
//              dest: '<%= meta.docsDistPath %>'
//          }
        },

        autoprefixer: {
            options: {
                browsers: [
                    'Android >= 4',
                    'Chrome >= 40',
                    'last 6 Firefox versions',
                    'iOS >= 6',
                    'Safari >= 6'
                ]
            },
            core: {
                src: '<%= less.core.dest %>'
            },
            extend: {
                src: '<%= less.extend.dest %>'
            },
//          docs: {
//              src: '<%= less.docs.dest %>'
//          },
//          demos: {
//              src: '<%= less.demos.dest %>'
//          }
        },

        cssmin: {
            options: {
                keepSpecialComments: '*',// keep all important comments
                advanced: false
            },
            sm: {
                src: '<%= meta.distPath %>css/<%= pkg.name %>.css',
                dest: '<%= meta.distPath %>css/<%= pkg.name %>.min.css'
            },
            extend: {
                src: '<%= meta.distPath %>css/<%= pkg.name %>-extend.css',
                dest: '<%= meta.distPath %>css/<%= pkg.name %>-extend.min.css'
            },
//          docs: {
//              src: [
//                  '<%= meta.doclessetsPath %>css/docs.css',
//                  '<%= meta.doclessetsPath %>css/pygments-manni.css'
//              ],
//              dest: '<%= meta.doclessetsPath %>css/docs.min.css'
//          }
        },

        uglify: {
            options: {
                banner: '<%= banner %>',
                compress: {
                    warnings: false
                },
                mangle: true,
                preserveComments: false
            },
            sm: {
                src: '<%= concat.sm.dest %>',
                dest: '<%= meta.distPath %>js/<%= pkg.name %>.min.js'
            },
            extend: {
                src: '<%= concat.extend.dest %>',
                dest: '<%= meta.distPath %>js/<%= pkg.name %>-extend.min.js'
            },
            cityPicker: {
                src: '<%= concat.cityPicker.dest %>',
                dest: '<%= meta.distPath %>js/<%= pkg.name %>-city-picker.min.js'
            },
//          docs: {
//              src: [
//                  '<%= meta.doclessetsPath %>js/docs.js',
//                  '<%= meta.doclessetsPath %>js/fingerblast.js'
//              ],
//              dest: '<%= meta.doclessetsPath %>js/docs.min.js'
//          }
        },

        qunit: {
            options: {
                inject: 'js/tests/unit/phantom.js'
            },
            files: 'js/tests/index.html'
        },

        watch: {
            options: {
                hostname: 'localhost',
                livereload: true,
                port: 8000
            },
            js: {
                files: '<%= meta.jsPath %>/*.js',
                tasks: ['copy:normalJs']
            },
            smJs: {
                files: '<%= meta.smJSPath %>/*.js',
                tasks: ['dist-sm-js', 'copy:js']
            },
            css: {
                files: '<%= meta.lessPath %>/*.less',
                tasks: ['build-css', 'copy:css']
            },
            smCss: {
            	files: '<%= meta.smLessPath %>/*.less',
                tasks: ['dist-sm-css', 'copy:css']
            }
//          html: {
//              files: '<%= meta.docsPath %>**',
//              tasks: ['jekyll']
//          }
        },

        jekyll: {
            docs: {}
        },

        jshint: {
            options: {
                jshintrc: 'js/.jshintrc'
            },
            grunt: {
                src: ['Gruntfile.js', 'grunt/*.js']
            },
            src: {
                src: 'js/*.js'
            },
            docs: {
                src: ['<%= meta.doclessetsPath %>/js/docs.js', '<%= meta.doclessetsPath %>/js/fingerblast.js']
            }
        },


        connect: {
            site: {
                options: {
                    base: '_site/',
                    hostname: '0.0.0.0',
                    livereload: true,
                    open: true,
                    port: 8000
                }
            }
        }
    });

    // Load the plugins
    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    // Default task(s).
    grunt.registerTask('dist-sm-css', ['less:core','less:extend', 'autoprefixer', 'usebanner']);
    grunt.registerTask('dist-sm-js', ['concat']);
    grunt.registerTask('build-css', ['less:normal']);
    grunt.registerTask('build-sm-css', ['dist-sm-css', 'cssmin']);
    grunt.registerTask('build-sm-js', ['dist-sm-js', 'uglify']);
    grunt.registerTask('copy-source', ['copy:css','copy:js','copy:normalJs']);
    grunt.registerTask('dist', ['clean','build-css', 'build-sm-css','build-sm-js']);
    grunt.registerTask('src', ['clean','build-css', 'build-sm-css','build-sm-js', 'copy']);
    grunt.registerTask('validate-html', ['jekyll']);
    grunt.registerTask('build', ['dist']);
    grunt.registerTask('test', ['dist', 'jshint', 'qunit', 'validate-html']);
    grunt.registerTask('server', ['src', 'connect', 'watch']);
//  grunt.registerTask('server-dist', ['dist', 'jekyll', 'connect', 'watch']);    
    if (buildTo) {
        //CDN发布环境
        grunt.registerTask('default', ['build-js', 'build-css', 'copy']);
    } else {
        //开发环境
        grunt.registerTask('default', ['test', 'dist']);
    }

    // Version numbering task.
    // grunt change-version-number --oldver=A.B.C --newver=X.Y.Z
    // This can be overzealous, so its changes should always be manually reviewed!
};
