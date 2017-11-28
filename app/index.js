const Generator = require('yeoman-generator');

module.exports = class extends Generator {
 promting() {
   return this.prompt([{
     type: 'input',
     name: 'project',
     message: 'Project name',
    }, {
      type: 'input',
      name: 'author',
      message: 'Author',
    }, {
      type: 'confirm',
      name: 'docker',
      message: 'Use docker?',
    }, {
      type: 'input',
      name: 'dockerTag',
      message: 'dockerTag',
      when: (answer) => answer.docker,
    }])
    .then((answer) => {
      this.param = {};
      this.param.project = answer.project;
      this.param.author = answer.author;
      this.param.dockerTag = answer.dockerTag;
      this.param.docker = answer.docker;
   });
 }
  writing() {
    // main files
    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),
      this.param
    )
    this.fs.copy(
      this.templatePath('tsconfig.json'),
      this.destinationPath('tsconfig.json')
    )
    this.fs.copy(
      this.templatePath('tslint.json'),
      this.destinationPath('tslint.json')
    )
    if (this.param.docker) {
      this.fs.copy(
        this.templatePath('Dockerfile'),
        this.destinationPath('Dockerfile')
      )
      this.fs.copy(
        this.templatePath('.dockerignore'),
        this.destinationPath('.dockerignore')
      )
    }
    this.fs.copy(
      this.templatePath('src/server.ts'),
      this.destinationPath('src/server.ts')
    )
    // routes
    this.fs.copy(
      this.templatePath('src/routes/index.ts'),
      this.destinationPath('src/routes/index.ts')
    )
    // controllers
    this.fs.copy(
      this.templatePath('src/controllers/index.ts'),
      this.destinationPath('src/controllers/index.ts')
    )
  }
  install() {
    this.npmInstall().then(() => {
      this.log(`
       _______ ___ __   __ _______ ___     _______            
      |       |   |  |_|  |       |   |   |       |           
      |  _____|   |       |    _  |   |   |    ___|           
      | |_____|   |       |   |_| |   |   |   |___            
      |_____  |   |       |    ___|   |___|    ___|           
       _____| |   | ||_|| |   |   |       |   |___            
      |_______|___|_|   |_|___|   |_______|_______|           
       __   __ _______ _______ ___   _______ __    _ ______   
      |  | |  |   _   |       |   | |   _   |  |  | |      |  
      |  |_|  |  |_|  |    _  |   | |  |_|  |   |_| |  _    | 
      |       |       |   |_| |   | |       |       | | |   | 
      |       |       |    ___|   | |       |  _    | |_|   | 
      |   _   |   _   |   |   |   | |   _   | | |   |       | 
      |__| |__|__| |__|___|   |___| |__| |__|_|  |__|______|  
       __    _ _______ _______ _______   _______ _______ ___  
      |  |  | |   _   |       |       | |   _   |       |   | 
      |   |_| |  |_|  |_     _|  _____| |  |_|  |    _  |   | 
      |       |       | |   | | |_____  |       |   |_| |   | 
      |  _    |       | |   | |_____  | |       |    ___|   | 
      | | |   |   _   | |   |  _____| | |   _   |   |   |   | 
      |_|  |__|__| |__| |___| |_______| |__| |__|___|   |___| 
      `);
    });
  }
};
