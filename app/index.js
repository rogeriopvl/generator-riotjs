'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var RiotjsGenerator = module.exports = function RiotjsGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(RiotjsGenerator, yeoman.generators.Base);

RiotjsGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  console.log('\n\n***********************')
  console.log('** Riot.js Generator **');
  console.log('***********************\n\n')

  var prompts = [
    {
      type: 'list',
      name: 'buildFile',
      message: 'Which build file should I generate?',
      choices: ['Gruntfile.js', 'Gulpfile.js', 'None'],
      default: 2
    }
  ];

  this.prompt(prompts, function (props) {
    this.buildFile = props.buildFile === 'None' ? false : props.buildFile;
    cb();
  }.bind(this));
};

RiotjsGenerator.prototype.app = function app() {
  this.mkdir('app');
  this.mkdir('app/img');
  this.mkdir('app/css');
  this.mkdir('app/js');

  this.copy('_presenter.js', 'app/js/presenter.js');
  this.copy('_model.js', 'app/js/model.js');
  this.copy('_store.js', 'app/js/store.js');
  this.copy('_index.html', 'app/index.html');
  this.copy('_package.json', 'package.json');
  this.copy('_bower.json', 'bower.json');
  this.copy('_bowerrc', '.bowerrc')

  if (this.buildFile) {
    this.copy('_' + this.buildFile, this.buildFile);
  }
};

RiotjsGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};
