#!/usr/bin/env node
'use strict';
const fs = require('fs');
const path = require('path');
const process = require('process');
const jsdom = require('jsdom');
const { JSDOM } = jsdom ;
const md = require('markdown-it')();
const { resolve } = require('path');
const fetchUrl = require("fetch").fetchUrl;
const https = require('https');
const chalk = require('chalk');

// Import the filter from module.js
const filterFiles = require('./module');
const { url } = require('inspector');
const { rejects } = require('assert');

// Find the directory and render it
console.log(chalk.blueBright('La rata ha encontrado los siguientes links'));

// Type of path 
let pathDirectory = process.argv[2];
pathDirectory = path.resolve(pathDirectory);
pathDirectory = path.normalize(pathDirectory);

const motherPromise = () => {
  return new Promise((resolve, reject) => {
    let stats = fs.statSync(pathDirectory);
    if (stats.isDirectory() === true){
      resolve (pathDirectory)
    } else {
      reject(readArchive(pathDirectory))
    } 
  })
}

// Give filter values, in this case find "md" file in current directory
const functionFilterFiles = () => {
const ext = 'md';
filterFiles(pathDirectory, ext, function(err, directory){
  if(err) console.log(chalk.red('No hay archivos de extensión md en el directorio :( '))
  // This will look for the "md" file and also read them to me
  directory.map(file => {
    readArchive(file)
  });
});  
}

// Function that reads the files
const readArchive= (file) => {
    fs.readFile(file, function(err, contentFile){
      if (err) {
        console.log(chalk.red('No se pudo leer el archivo :( '));
      } else {
        functionConvertStringToHtml(contentFile, file)
      }
    }); 
}

const functionConvertStringToHtml = (contentFile, file) => {
  // We convert the string to html in order to find <a>
  let convertStringToHtml = md.render(contentFile.toString());
  const dom = new JSDOM(convertStringToHtml);
  arrayWithLinks(dom, file)
}

const arrayWithLinks = (dom, file) => {
  // We go through the html to find the links and save them in an array
  let save = [];
  const searchingLinks = dom.window.document.querySelectorAll('a').forEach(link =>{
  //  We create an object that contains the link of the file, the text and the file that contains it
    let objectInfo = {

      href : link.href,
      file : file,
      title : link.textContent

    }
    save.push(objectInfo);
  });
  filterArray(save)
}

const filterArray = (save) => {
  // Filter links that don't serve us
 const result = save.filter((obj) => (!obj.href.includes('about:blank') | !obj.length === 0 ));
  return validate(result)
}

// VALIDATE 
const linkStatus = (result) => {
 return new Promise((resolve, reject) => {
    fetchUrl(result, (error, meta) => {
        if (error) reject (error);
        else resolve (meta.status);
     })
  });  
}
const validate = (result) => {
  result.map( (obj) => {
   linkStatus(obj.href)
  .then((res) => {
      let status= '';
      if ( res.toString().slice(0,1) <= '3' ) status='okidoki';
      else status= 'fail';

      let newObject = {
        href: obj.href,
        title: obj.title,
        file: obj.file,
        status: status,
        statusCode: res,
      }

      let nEwNeW = [];

      nEwNeW.push(newObject);
      
      console.log(nEwNeW);
    })
    .catch((err) => console.log(chalk.red('Erros al traer la información')))
  })
 
}

module.exports = () => {
  motherPromise().then(firstResult => {
    functionFilterFiles(firstResult);
  })
  .catch((err) => {
    console.log(chalk.red('Error fatal :(', err))
  })
}


// let options = {
//   validate: false,
//   stats: false
// }

// if(process.argv.includes('--validate')) options.validate = true;
// if(process.argv.includes('--stats')) options.stats = true;
