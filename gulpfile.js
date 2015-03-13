var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var bower = require('gulp-bower');
var es = require('event-stream');

gulp.task('default', ['install_deps', 'minify', 'move_vendors']);

gulp.task('install_deps', function() {
    return bower().pipe(gulp.dest('bower_components'));
});

gulp.task('minify', function() {
    return gulp.src([
        'Resources/public/js/jquery.cmf_tree.js',
        'Resources/public/js/adapter/*.js'
    ])
        .pipe(uglify())
        .pipe(concat('cmf_tree_browser.min.js'))
        .pipe(gulp.dest('Resources/public/js'));
});

gulp.task('move_vendors', ['install_deps'], function() {
    var targetPath = 'Resources/public/vendor';

    var fancytree = es.merge(
        gulp.src('bower_components/fancytree/dist/src/jquery.fancytree.js')
            .pipe(uglify())
            .pipe(gulp.dest(targetPath + '/fancytree/dist/src')),

        gulp.src([
            'bower_components/fancytree/dist/skin-win8/ui.fancytree.min.css',
            'bower_components/fancytree/dist/skin-win8/*.gif'
        ]).pipe(gulp.dest(targetPath + '/fancytree/dist/skin-win8'))
    );

    return es.merge(
        fancytree,
        gulp.src('bower_components/jquery/dist/jquery.min.js').pipe(gulp.dest(targetPath + '/jquery/dist')),
        gulp.src('bower_components/jquery-ui/jquery-ui.min.js').pipe(gulp.dest(targetPath + '/jquery-ui'))
    );
});
