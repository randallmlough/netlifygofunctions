'use strict'

import gulp from 'gulp'
import connect from 'gulp-connect'
import proxy from 'http-proxy-middleware'
import runSequence from 'run-sequence'

import {spawn} from "child_process"

const isProduction = process.env.NODE_ENV === 'production'

// FRONTEND STUFF
gulp.task('frontend:server', ['connect', 'watch']);

gulp.task('connect', function () {
    connect.server({
        root: 'public',
        livereload: true,
        port: 3000,
        middleware: function (connect, opt) {

            var apiProxy = proxy('/.netlify', {
                target: 'http://localhost:9000',
                changeOrigin: true // for vhosted sites
            });

            return [apiProxy];
        }
    });
});

gulp.task('watch', function () {
    gulp.watch(['./public/**/*.html'], ['frontend:build']);
});

gulp.task('frontend:build', function () {
    gulp.src('./public/**/*.html')
        .pipe(gulp.dest('./public'))
        .pipe(connect.reload());
});

// GO LAMBDA STUFF
gulp.task('lambda', ['sam'], () => {
    gulp.watch([
        'cmd/**/*'
    ], () => gulp.start('gobuild'))
});

// Build the Go binaries
gulp.task('gobuild', (cb) => {
    let args = ['build'];

    return spawn('make', args, {
        stdio: 'inherit'
    }).on('close', (code) => {
        if (code === 0) {
            console.log('Built GO Files');
            cb();
        } else {
            console.log('Failed to build GO files');
            cb('Failed to build GO files');
        }
    })
})

// Run the necessary sequence to build the binaries and create server
gulp.task('sam', () => {
    runSequence('gobuild', 'backend:server')
})

// Start Sam Local server
gulp.task('backend:server', (cb) => {
    let args = ['server'];

    return spawn('make', args, {
        stdio: 'inherit'
    }).on('close', (code) => {
        if (code === 0) {
            cb();
        } else {
            console.log('Failed to build GO files');
            cb('Failed to build GO files');
        }
    })
})