(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

var Nodes = require("$:/plugins/ebalster/formula/nodes.js");


// Get variable string by name.
exports.transclude = {
	min_args: 1, max_args: 2,
	construct: function(operands) {
		switch (operands.length) {
			case 1: return new Nodes.TranscludeText(operands[0]);
			case 2: return new Nodes.TranscludeField(operands[0], operands[1]);
		}
	}
};

// Transclude tiddler text string by name.
exports.transclude_index = {
	min_args: 2, max_args: 2,
	construct: function(operands) {return new Nodes.TranscludeIndex(operands[0], operands[1]);}
};

// Transclude field string by name.
exports.variable = {
	min_args: 1, max_args: 1,
	construct: function(operands) {return new Nodes.Variable(operands[0]);}
};

// Interpret value as a datum.
exports.datum = {
	min_args: 1, max_args: 1,
	construct: function(operands) {return new Nodes.Datum(operands[0]);}
};


})();