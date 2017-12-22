(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

var Val = require("$:/plugins/ebalster/formula/value.js");

var V_Num  = Val.V_Num;
var V_Text = Val.V_Text;


// Compile regex.  TODO: Precompile these where possible
var TW_RX_FLAGS = /^\(\?[a-z]*\)|\(\?[a-z]*\)$/i;

function tw_regex(rx_str, defaultFlags) {
	if (!rx_str) throw "Empty regular expression";
	var flagPart = TW_RX_FLAGS.exec(rx_str);
	if (flagPart) {
		var flagLen = flagPart[0].length;
		var flags = flagPart[0].substr(2, flagPart[0].length-3);
		if (flagPart.index == 0) return new RegExp(rx_str.substr(flagLen), flags);
		else                     return new RegExp(rx_str.substr(0, rx_str.length-flagLen), flags);
	}
	return new RegExp(rx_str, defaultFlags);
}


// Regex replace
exports.regexreplace = function(s, rx, b) {
	rx = tw_regex(rx.asString(), "g");
	return new V_Text(s.asString().replace(rx, b.asString()));
};

// Regex match
exports.regexmatch = function(s, rx) {
	rx = tw_regex(rx.asString(), "");
	return new Val.V_Bool(rx.test(s.asString()));
};

// Regex extract
exports.regexextract = function(s, rx) {
	rx = tw_regex(rx.asString(), "g");
	s = s.asString();
	var matches = [];
	var match;
	while ((match = rx.exec(s)) != null) {
		if (match[0].length == 0) ++rx.lastIndex;
		matches.push(new V_Text(match[0]));
		if (!rx.global) break;
	}
	return new Val.V_Array(matches);
};

// Regex extract, single argument
exports.regexextract1 = function(s, rx, dfl) {
	rx = tw_regex(rx.asString(), "");
	s = s.asString();
	var match = rx.exec(s);
	return new Val.V_Text(match ? match[0] : dfl.asString());
};


})();