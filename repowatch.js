var versionInfo = require('./package.json'),
	chokidar = require('chokidar'),
 	commander = require('commander'),
 	mongoose = require('mongoose'),
 	mongodb = require('./lib/db').db;

require('./lib/models/repo.js');

commander
	.usage("repowatch [options] (default repo is taken from the current folder)")
	.version(versionInfo.version)
	.option('-r, --repo [repo]', 'The name of the repo to be watched.', null)
	.parse(process.argv);

var Repo = null;

// require the repo option
if (!commander.repo) { 
	console.log("repo name must be specified.  user -r [repoName];");
	process.kill(process.pid);
}

// the _id of the document we are dealing with.
var workingRepo = null;

// start watching files when we've connected to the mongo db.
mongodb.connection.once("open", function() {

	Repo = mongoose.model("Repo");

	Repo.findOne({ 'name': commander.repo }, function(err, repo) {
		if (err) console.log(err);
		else {
			if (repo) {
				chokidar.watch(__dirname, {persistent: true}).on('all', reactToChange);
			}
			else {
				var currentRepo = new Repo({ 'name' : commander.repo }).save(function(err, repo) {
					chokidar.watch(__dirname, {ignored: /node_modules/, persistent: true}).on('all', reactToChange);
				});
			}
		}
	});
	
})	


// executed anytime a new file has been changed/create1d/deleted
function reactToChange(event, path, stats) {
	Repo.findOne( { 'name': commander.repo } , function(err, repo) {
		console.log(repo)
	})
	Repo.update({ 'name': commander.repo }, {$set : {"isEdited" : true}})
}



	