const gulp = require('gulp');

const prepare = require("./gulp/tasks/prepare");

exports.prepare = prepare.prepareTask;

exports.build = gulp.series(
    prepare.prepareTask
);
