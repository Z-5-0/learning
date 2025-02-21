const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));

// SCSS/SASS fájlok fordítása
function compileSass() {
    return gulp.src('./*.scss') // SCSS fájlokat keres
        .pipe(sass().on('error', sass.logError)) // SASS fordítás és hibakezelés
        .pipe(purgecss({content: ['*.html']}))
        .pipe(gulp.dest('./dist/css')); // kimeneti CSS fájlok helye
}

// automatikus figyelés a változásokra
function watchSass() {
    gulp.watch(['./*.scss', '*.html'], compileSass);
}

// alapértelmezett feladat
exports.default = gulp.series(compileSass, watchSass);