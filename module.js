const fs = require('fs');
let path = require('path');

// module that reads the entire directory and filters
module.exports = (filename, ext, directory) => {
    fs.readdir(filename, function (err, lista){
        if(err){
            return directory(err)
        } 
          lista = lista.filter(function (element) {
              return path.extname(element) === '.' + ext
          })
          directory(null,lista)
      })
};

