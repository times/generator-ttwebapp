'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var TtwebappGenerator = module.exports = function TtwebappGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({
      skipInstall: options['skip-install'],
      callback: function() {
        this.spawnCommand('grunt',['build']);
      }.bind(this)
    });

  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(TtwebappGenerator, yeoman.generators.Base);

TtwebappGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [
    {
      name: 'projectName',
      message: 'What is the project name?',
    },{
      type: 'confirm',
      name: 'includeFoundation',
      message: 'Would you like to include Foundation?',
      default: true
    }
  ];

  this.prompt(prompts, function (props) {
    // `props` is an object passed in containing the response values, named in
    // accordance with the `name` property from your prompt object.
    this.projectName = props.projectName;
    this.includeFoundation = props.includeFoundation;

    cb();
  }.bind(this));
};

TtwebappGenerator.prototype.app = function app() {
  this.mkdir('js');
  this.mkdir('js/libs');
  this.mkdir('scss');

  this.template('_bower.json', 'bower.json');
  this.template('_config.json', 'config.json');
  this.template('_package.json', 'package.json');

  this.template('Gruntfile.js', 'Gruntfile.js');
  this.template('js/app.js', 'js/app.js');
  this.template('scss/app.scss','scss/app.scss');
  this.template('index.html','index.html');

  if (this.includeFoundation) {
    this.copy('scss/_settings.scss','scss/_settings.scss');
  }
};

TtwebappGenerator.prototype.runtime = function runtime() {
  this.copy('config.rb', 'config.rb');
  this.copy('humans.txt', 'humans.txt');
  this.copy('bowerrc', '.bowerrc');
  this.copy('gitignore', '.gitignore');
};
