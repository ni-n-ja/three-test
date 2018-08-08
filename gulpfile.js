'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var svgmin = require('gulp-svgmin');
var replace = require('gulp-replace');
var qr = require("qrcode-terminal");
var del = require('del');

gulp.task('reviveSVG', () => {
    del(['svg_minified/**/*.svg'], function (err, deleted) {
        console.log('deleted: ' + deleted.join(','));
    });
    gulp.src('svg/**/*.svg')
        .pipe(svgmin())
        .pipe(gulp.dest('./svg_minified'));
});

gulp.task('browser-sync', () => {
    const instance = browserSync({
        files: ['js/**/*.js', '**/*.html', 'css/**/*.css', '!js/service-worker.js'],
        server: {
            baseDir: "./"
        },
        port: 9001,
        // https: true,
        open: false
    }, () => {
        let url = instance.getOption('urls').get('external');
        if (url != null)
            qr.generate(url);
    });
});

gulp.task('default', ['reviveSVG', 'browser-sync'], function () {
    gulp.watch(['svg/**/*.svg'], ['reviveSVG', 'browser-sync']);
});