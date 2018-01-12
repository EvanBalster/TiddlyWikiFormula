(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

var Val = require("$:/plugins/ebalster/formula/value.js");
var Opd = require("$:/plugins/ebalster/formula/operands.js");

var V_Text = Val.V_Text;



// Get variable string by name.
exports.transclude = {
	min_args: 1, max_args: 2,
	construct: function(operands) {
		switch (operands.length) {
			case 1: return new Opd.Opd_TranscludeText(operands[0]);
			case 2: return new Opd.Opd_TranscludeField(operands[0], operands[1]);
		}
	}
};

// Transclude tiddler text string by name.
exports.transclude_index = {
	min_args: 2, max_args: 2,
	construct: function(operands) {return new Opd.Opd_TranscludeIndex(operands[0]);}
};

// Transclude field string by name.
exports.variable = {
	min_args: 1, max_args: 1,
	construct: function(operands) {return new Opd.Opd_Variable(operands[0]);}
};

// Interpret value as a datum.
exports.datum = {
	min_args: 1, max_args: 1,
	construct: function(operands) {return new Opd.Opd_Datum(operands[0]);}
};


})();