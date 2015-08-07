'use strict';
var gulp = require('gulp');
var excludeGitignore = require('gulp-exclude-gitignore');
var mocha = require('gulp-mocha');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var istanbul = require('gulp-istanbul');
var nsp = require('gulp-nsp');
var plumber = require('gulp-plumber');
var babel = require('gulp-babel');
var exec = require('child_process').exec;

// Initialize the babel transpiler so ES2015 files gets compiled
// when they're loaded
require('babel-core/register');

var handleErr = function (err) {
  console.log(err.message);
  process.exit(1);
};

gulp.task('static', function () {
  return gulp.src('**/*.js')
    .pipe(excludeGitignore())
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'))
    .pipe(jscs())
    .on('error', handleErr);
});

gulp.task('nsp', function (cb) {
  nsp('package.json', cb);
});

gulp.task('pre-test', function () {
  return gulp.src('lib/**/*.js')    .pipe(babel())

    .pipe(istanbul({includeUntested: true}))
    .pipe(istanbul.hookRequire());
});

gulp.task('test', ['pre-test'], function (cb) {
  var mochaErr;

  gulp.src('test/**/*.js')
    .pipe(plumber())
    .pipe(mocha({reporter: 'spec'}))
    .on('error', function (err) {
      mochaErr = err;
    })
    .pipe(istanbul.writeReports())
    .on('end', function () {
      cb(mochaErr);
    });
});

gulp.task('babel', function () {
  return gulp.src('lib/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('dist'));
});

var printFunction = function(data){
  console.log(data);
};

gulp.task('server', function (cb) {

  var registrar = exec('node lib/registrar.js');
  registrar.stdout.on('data',printFunction);
  registrar.stderr.on('data',printFunction);
  registrar.on('close',printFunction);

  var rabbit = exec('rabbitmq-server');

  rabbit.stdout.on('data',printFunction);
  rabbit.stderr.on('data',printFunction);
  rabbit.on('close',printFunction);

  //var mongo = exec('mongod -dbpath /Users/Sriram/DevSpace/MongoDB/data/db');

  //mongo.stdout.on('data', printFunction('stdout',data));
  //mongo.stderr.on('data', printFunction('stderr',data));
  //mongo.on('close', printFunction('closing code',data));

});

gulp.task('prepublish', ['nsp', 'babel']);
gulp.task('default', ['static', 'test']);
