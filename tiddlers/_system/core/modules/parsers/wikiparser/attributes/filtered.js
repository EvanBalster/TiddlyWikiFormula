(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

exports.filtered = function(source, pos, node) {
	// Is it a filtered value?
	var reFilteredValue = /\{\{\{(.+?)\}\}\}/g;

	var value = $tw.utils.parseTokenRegExp(source,pos,reFilteredValue);
	if (!value) return null;

	node.type = "filtered";
	node.filter = value.match[1];
	node.end = value.end;
	return node;
};

})();
