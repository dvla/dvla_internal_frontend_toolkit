
'use strict'

const paths = require('./config/paths.json')
const gulp = require('gulp')
const gutil = require('gulp-util')
const cssnano = require('gulp-cssnano')
const del = require('del')
const mocha = require('gulp-mocha')
const nodemon = require('gulp-nodemon')
const rename = require('gulp-rename')
const runsequence = require('run-sequence')
const sass = require('gulp-sass')
const base64 = require('gulp-base64')

// Clean task ----------------------------
// Deletes the /public directory
// ---------------------------------------

gulp.task('clean', () => {
  return del(paths.public)
})

// Build task ----------------------------
// Runs tasks that copy assets to the public directory.
// ---------------------------------------

gulp.task('build', cb => {
  runsequence('clean', ['styles', 'images', 'fonts', 'scripts', 'examplescripts'], cb)
})

// Styles build task ---------------------
// Compiles CSS from Sass
// Output both a minified and non-minified version into /public/stylesheets/
// ---------------------------------------

gulp.task('styles', () => {
  return gulp.src(paths.assetsScss + '**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(base64({
      baseDir: 'app/assets',
      extensions: ['svg', 'png', 'woff'],
      maxImageSize: 200 * (1024 * 1024),
      debug: true
    }))
    .pipe(gulp.dest(paths.publicCss))
    .pipe(rename({ suffix: '.min' }))
    .pipe(cssnano())
    .pipe(gulp.dest(paths.publicCss))
    .pipe(gulp.dest(paths.assetsScss))
})

// Images build task ---------------------
// Copies images to /public/images
// ---------------------------------------

gulp.task('images', () => {
  return gulp.src(paths.assetsImg + '**/*')
    .pipe(gulp.dest(paths.publicImg))
})

// Font build task ---------------------
// Copies images to /public/images
// ---------------------------------------

gulp.task('fonts', () => {
  return gulp.src(paths.assetsFnt + '**/*')
    .pipe(gulp.dest(paths.publicFnt))
})

// Scripts build task ---------------------
// Copies JavaScript to /public/javascripts
// ---------------------------------------
gulp.task('scripts', () => {
  return gulp.src(paths.assetsJs + '**/*.js')
    .pipe(gulp.dest(paths.publicJs))
})

// Example scripts build task ---------------------
// Copies JavaScript to /public/javascripts
// ---------------------------------------
gulp.task('examplescripts', () => {
  return gulp.src(paths.assetsJs + '**/*.js')
    .pipe(gulp.dest(paths.publicJs))
})

// Server task --------------------------
// Configures nodemon
// ---------------------------------------
gulp.task('server', () => {
  nodemon({
    watch: ['.env', '**/*.js', '**/*.json'],
    script: 'server.js',
    ignore: [
      paths.public + '*',
      paths.assets + '*',
      paths.nodeModules + '*'
    ]
  })
})

// Test task --------------------------
// Check that the build task copies assets
// to /public and that the app runs.
// ---------------------------------------
gulp.task('test', cb => {
  runsequence('build', ['test:app'], cb)
})

gulp.task('test:app', () =>
          gulp.src(paths.testSpecs + 'app_spec.js', {read: false})
          .pipe(mocha({reporter: 'spec'}))
          // https://github.com/sindresorhus/gulp-mocha#test-suite-not-exiting
          .once('error', () => {
  process.exit(1)
})
          .once('end', () => {
  process.exit()
})
         )

// Watch task ----------------------------
// When a file is changed, re-run the build task.
// ---------------------------------------

gulp.task('watch', ['watch:styles', 'watch:scripts', 'watch:examplescripts', 'watch:images'])

gulp.task('watch:styles', () => {
  return gulp.watch(paths.assetsScss + '**/*.scss', ['styles'])
})

gulp.task('watch:scripts', () => {
  return gulp.watch(paths.assetsJs + '**/*.js', ['scripts'])
})

gulp.task('watch:examplescripts', () => {
  return gulp.watch(paths.assetsJs + '**/*.js', ['examplescripts'])
})

gulp.task('watch:images', () => {
  return gulp.watch(paths.assetsImg + '**/*', ['images'])
})

// Develop task --------------------------
// Runs copy-assets task and sets up watches.
// ---------------------------------------
gulp.task('develop', cb => {
  runsequence('build',
              'watch',
              'server', cb)
})

// Default task --------------------------
// Lists out available tasks.
// ---------------------------------------

gulp.task('default', () => {
  const cyan = gutil.colors.cyan
  const green = gutil.colors.green

  gutil.log(green('----------'))

  gutil.log(('The following main ') + cyan('tasks') + (' are available:'))

  gutil.log(cyan('build'
                ) + ': copies assets to the public directory.'
           )
  gutil.log(cyan('develop'
                ) + ': performs an initial build then sets up watches.'
           )
  gutil.log(cyan('package'
                ) + ': prepares the govuk-elements-sass npm package'
           )

  gutil.log(green('----------'))
})
