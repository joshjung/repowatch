var versionInfo = require('./package.json'),
	chokidar = require('chokidar'),
 	commander = require('commander'),
 	mongoose = require('mongoose'),
 	mongodb = require('./lib/db').db;

require('./lib/models/repo.js');
var RepoModel = mongoose.model("Repo");

commander
	.usage("repowatch [options] (default repo is taken from the current folder)")
	.version(versionInfo.version)
	.option('-r, --repo [repo]', 'The name of the repo to be watched.', null)
	.parse(process.argv);

// require the repo option
if (!commander.repo) { 
	console.log("repo name must be specified.  user -r [repoName];");
	process.kill(process.pid);
}

// the _id of the document we are dealing with.
var workingRepo = null;

// start watching files when we've connected to the mongo db.
mongodb.connection.once("open", function() {

	// check for existence of a repo by this name
	RepoModel.count({"name": commander.repo}, function(err, count) {
		
		if (err) {console.log(err); return }

		// if doesn't exist, create a new document for it.  or else find the existing one and get its id.
		if (count==0) {
			currentRepo = new RepoModel({name: commander.repo })
			currentRepo.save(startWatcher);
		} else {
			RepoModel.findOne({"name": commander.repo}, startWatcher)
		}
	});
	
})	

// executed after connection to db and collection for the repo is made/found
function startWatcher(err, repo) {
	workingRepo = repo._id;
	console.log('Watching repo %s ...', commander.repo);
	chokidar.watch(__dirname, {ignored: /node_modules/, persistent: true}).on('all', reactToChange);
}

// executed anytime a new file has been changed/created/deleted
function reactToChange(event, path, stats) {
	// console.log(workingRepo)
}



	