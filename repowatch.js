var versionInfo = require('./package.json'),
	async = require('async'),
	chokidar = require('chokidar'),
 	commander = require('commander'),
 	path = require('path'),
 	fs = require('fs');
 	
commander
	.usage("repowatch [options] (default repo is taken from the current folder)")
	.version(versionInfo.version)
	.option('-r, --repo [repo]', 'The name of the repo to be watched.', __dirname)
	.parse(process.argv);

// Setup a mongo database object and connect to the server
var mongodb = require('./lib/db').db;

// bootstrap models
var modelsPath = path.join(__dirname + "/lib/models")
fs.readdirSync(modelsPath).forEach(function (file) {
  require(modelsPath + '/' + file)
})

console.log('Watching repo at %s ...', commander.repo);
chokidar.watch(commander.repo, {ignored: /node_modules/, persistent: true}).on('all', reactToChange);


function reactToChange(event, path, stats) {
	
	console.log(event);

	// Build new collection

}



	