const gulp = require("gulp");
const babel = require("gulp-babel");
const merge = require("merge-stream");

gulp.task("build:lib", function () {
    let js = gulp.src([ "./src/CoverFlow/**/*.js"])
                 .pipe(babel({presets:["react-app"]}))
                 .pipe(gulp.dest("lib"));

    let css = gulp.src([ "./src/CoverFlow/**/*.css"])
                  .pipe(gulp.dest("lib"));

    return merge(js, css);
});

gulp.task('default', [ 'build:lib' ]);

//$ NODE_ENV=development gulp