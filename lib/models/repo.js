'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var RepoSchema = Schema({
	repository: {
		type: String, //dynamically build from a directory with a git or svn repo.
		remoteUrl: String
	},
	files: [{
		name: String,
		size: Number,
		path: String,
		changed: Boolean,
		edits: [{
			user: String,
			diff: String,
			time: Date
		}]
	}]

});

mongoose.model('Repo', RepoSchema);