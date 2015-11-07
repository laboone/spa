var gulp = require('gulp');
var typescript = require('gulp-typescript');

var tsProject = typescript.createProject('tsconfig.json');

gulp.task('scripts', function () {
    return tsProject.src()
        .pipe(typescript(tsProject))
        .pipe(gulp.dest('release'));
});

gulp.task('watch', function () {
    gulp.watch('scripts/*.ts', ['scripts']);
})

gulp.task('default', ['scripts']);
