(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

var Compute = require("$:/plugins/ebalster/formula/compute.js");

/*
	Information about this macro
*/

exports.name = "formula";
exports.params = [{"name": "formula"}];

/*
Run the macro
*/
exports.run = function(formula) {

	try {
		return Compute.evalFormula(formula, this);
	}
	catch (err) {
		return "`" + String(err) + "`";
	}
};

})();
