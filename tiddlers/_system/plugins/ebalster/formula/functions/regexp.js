(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";


// Compile regex.  TODO: Precompile these where possible
/*var TW_RX_FLAGS = /^\(\?[a-z]*\)|\(\?[a-z]*\)$/i;

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
}*/


// Regex replace
exports.regexreplace = function(s, rx, b) {
	//rx = tw_regex(rx, "g");
	rx.lastIndex = 0;
	return s.replace(rx, b);
};
exports.regexreplace.inCast = 'TRT';

// Regex match
exports.regexmatch = function(s, rx) {
	//rx = tw_regex(rx, "");
	rx.lastIndex = 0;
	return rx.test(s);
};
exports.regexmatch.inCast = 'TR';

// Regex extract
function regexextract(s, rx) {
	//rx = tw_regex(rx, "g");
	rx.lastIndex = 0;
	s = s;
	var captureIndex = arguments[2] || 0;
	var matches = [];
	var match;
	while ((match = rx.exec(s)) != null) {
		if (match[0].length == 0) ++rx.lastIndex;
		matches.push(match[captureIndex] || "");
		if (!rx.global) break;
	}
	return matches;
}
regexextract.inCast = 'TRN';

exports.regexextract = {
	min_args: 2, max_args: 3,
	select: function(operands) {return regexextract;}
};

// Regex extract, single argument
function regexextract1(s, rx, dfl) {
	//rx = tw_regex(rx, "");
	rx.lastIndex = 0;
	s = s;
	var captureIndex = arguments[3] || 0;
	var match = rx.exec(s);
	return (match && match[captureIndex]) ? match[captureIndex] : dfl;
}
regexextract1.inCast = 'TRTN';

exports.regexextract1 = {
	min_args: 3, max_args: 4,
	select: function(operands) {return regexextract1;}
};

})();