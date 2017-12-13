(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

exports.name = "formula";
exports.types = {inline: true};

exports.init = function(parser) {
	this.parser = parser;
	// Regexp to match
	this.matchRegExp = /\(=/mg;
	this.endMatchRegExp = /=\)/mg;
};

exports.parse = function() {
	// Move past the match
	this.parser.pos = this.matchRegExp.lastIndex;
	// Look for the end marker
	this.endMatchRegExp.lastIndex = this.parser.pos;
	var match = this.endMatchRegExp.exec(this.parser.source),
		text;
	// Process the text
	if(match) {
		text = this.parser.source.substring(this.parser.pos,match.index);
		this.parser.pos = match.index + match[0].length;
	} else {
		text = this.parser.source.substr(this.parser.pos);
		this.parser.pos = this.parser.sourceLength;
	}
	return [{
		type: "formula",
		attributes: {
			formula: {type: "string", value: text},
		}
	}];
};

})();
