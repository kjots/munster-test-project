import 'babel-polyfill';

import chalk from 'chalk';
import chokidar from 'chokidar';
import del from 'del';
import gulp from 'gulp';
import gulpBabel from 'gulp-babel';
import gulpSourcemaps from 'gulp-sourcemaps';
import gulpUtil from 'gulp-util';

function compile(pattern) {
    gulpUtil.log('Compiling', chalk.magenta(pattern));

    return gulp.src(pattern)
        .pipe(gulpSourcemaps.init())
        .pipe(gulpBabel())
        .pipe(gulpSourcemaps.write('.', { sourceRoot: 'src' }))
        .pipe(gulp.dest('lib'));
}

gulp.task('watch', [ 'compile' ], () => {
    chokidar.watch('src/**/*.js', { ignoreInitial: true }).on('all', function (event, file) {
        compile(file);
    });
});

gulp.task('compile', [], () => {
    return compile('src/**/*.js');
});

gulp.task('clean', [], () => {
    return del([
        'lib'
    ]);
});