'use strict';

var mongoose = require('mongoose'),
  	Schema = mongoose.Schema;

var RepoSchema = Schema({
	name: String,
	files: [
		{ name: String,
		path: String,
		diff: String,
		timeModified: Date }
	]
});

mongoose.model('Repo', RepoSchema);