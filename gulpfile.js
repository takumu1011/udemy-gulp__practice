const {src, dest, watch, series, parallel} = require('gulp');
const loadPlugins = require('gulp-load-plugins');
const $ = loadPlugins();
const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync');
const server = browserSync.create();
const isProd = process.env.NODE_ENV === "production";


function copyFiles() {
    return src('src/assets/sample.png')
    .pipe($.imagemin())
        .pipe($.rename({
            prefix: 'hello-'
        }))
        .pipe(dest('dist/img/'));
}

function styles() {
    return src('src/sass/main.scss')
        .pipe($.if(!isProd, $.sourcemaps.init())
        .pipe($.sass())
        .pipe($.postcss([
            autoprefixer()
        ]))
        .pipe($.sourcemaps.write('.'))
        .pipe(dest('dist/css'));
}

function startAppServer() {
    server.init({
        server: {
            baseDir: 'dist/'
        }
    });
    watch('src/**/*.scss', styles);
    watch('src/**/*.scss').on('change', server.reload);
}

function scripts() {
    return src('src/assets/main.js')
        .pipe($.babel())
        .pipe(dest('dist/js'));
}

function lint() {
    return src('src/assets/*.js')
        .pipe($.eslint({fix: true}))
        .pipe($.eslint.format())
        .pipe($.eslint.failAfterError())
        .pipe(dest('src/assets/'));
}

const serve = series(parallel(styles, series(lint, scripts)), startAppServer);


exports.copyFiles = copyFiles;
exports.styles = styles;
exports.scripts = scripts;
exports.lint = lint;
exports.serve = serve;
