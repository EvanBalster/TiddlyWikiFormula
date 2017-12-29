(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";


exports.formula = function(source, pos, node) {
	// Is it a formula?
	var reFormulaValue = /\(=(([^=]+|=[^\)])*)=\)/g;

	var value = $tw.utils.parseTokenRegExp(source,pos,reFormulaValue);
	if (!value) return null;

	node.type = "formula";
	node.formula = value.match[1];
	node.end = value.end;
	return node;
};

})();
