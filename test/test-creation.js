/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;


describe('riotjs generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('riotjs:app', [
        '../../app'
      ]);
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = [
      '.jshintrc',
      '.editorconfig',
      'bower.json',
      'package.json',
      'app/',
      'app/index.html',
      'app/js',
      'app/js/presenter.js',
      'app/js/model.js',
      'app/js/store.js',
      'app/css',
      'app/img'
    ];

    helpers.mockPrompt(this.app, {
      'buildFile': 'None'
    });
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFiles(expected);
      done();
    });
  });

  it('creates a Gulpfile when Gulp is chosen as a build tool', function(done) {
    var expected = ['Gulpfile.js']

    helpers.mockPrompt(this.app, {
      'buildFile': 'Gulpfile.js'
    });
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFiles(expected);
      done();
    });
  });

  it('creates a Gruntfile when Grunt is chosen as a build tool', function(done) {
    var expected = ['Gruntfile.js']

    helpers.mockPrompt(this.app, {
      'buildFile': 'Gruntfile.js'
    });
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFiles(expected);
      done();
    });
  });
});
