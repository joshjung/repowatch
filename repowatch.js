var chokidar = require('chokidar');
var commander = require('commander');
var versionInfo = require('./package.json')

commander
	.usage("repowatch [options] (default repo is taken from the current folder)")
	.version(versionInfo.version)
	.option('-r, --repo [repo]', 'Watch the specified repository/folder.', __dirname)
	.parse(process.argv);

console.log('Watching repo at %s ...', commander.repo);

// TODO: sanitize folder input.
chokidar.watch(commander.repo, {ignored: /[\/\\]\./, persistent: true}).on('all', reactToChange);

function reactToChange(event, path, stats) {
	console.log(event);
}