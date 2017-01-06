var fs = require('fs');

/*var read = fs.readFileSync('read.txt', 'utf8');
console.log(read);

fs.writeFileSync('write.txt', read);*/

fs.readFile('read.txt', 'utf8', function(err, data){
  fs.writeFile('write.txt', data, function() {
    console.log("Ecriture terminee");
  });
});
