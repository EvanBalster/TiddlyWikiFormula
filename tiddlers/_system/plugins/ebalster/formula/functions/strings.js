(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

var Coerce = require("$:/plugins/ebalster/formula/coerce.js");


// Cast to text.  Second argument not yet supported.
exports.t = function(a)    {return a;};
exports.t.inCast = 'T';

function t_format(a, format) {return a;}
t_format.inCast = 'TT';

exports.text = {
	min_args: 1, max_args: 1,
	input: 'TT',
	select: function(operands) {
		if (operands.length == 1) return exports.t;
		return t_format;
	}
};

// Cast string to number.
exports.value = function(a)    {return a;};
exports.inCast = 'N';

// Array to string
exports.textjoin = function(delimiter, ignore_empty, a) {
	var s = "";
	var i = 1;
	if (typeof ignore_empty === "boolean") {
		i = 2;
	}
	else ignore_empty = true;
	for (; i < arguments.length; ++i)
	{
		var arg = arguments[i];
		if (arg instanceof Array) {
			for (var j = 0; j < arg.length; ++j) {
				if (s.length) s += delimiter;
				s += Coerce.ToText(arg[j],this);
			}
		}
		else {
			if (s.length) s += delimiter;
			s += Coerce.ToText(arg,this);
		}
	}
	return s;
};
exports.textjoin.variadic = true;
exports.textjoin.inCast = 'T';

// Split string to array
exports.split = function(str, delimiter) {
	return str.split(delimiter);
};
exports.split.inCast = 'T';

// String length
exports.len = function(str)     {return str.length;};
exports.len.inCast = 'T';

// String exact match
exports.exact = function(a, b)    {return a === b;};
exports.exact.inCast = 'TT';


// Substrings
exports.mid = function(str, i, n)    {return str.substr(i-1, n);};
exports.exact.inCast = 'TNN';

exports.substr = exports.mid;


// Substitute
exports.substitute = function(s, f, r)    {return s.split(f).join(r);};
exports.substitute.inCast = 'TTT';

// Replace (N/I)
//exports.replace = function(s, p, l, r)    {return (s.splice(a, b));};


// Concatenate
exports.cat = function(a, b)    {return a + b;};
exports.cat.inCast = 'TT';

// Trim space
exports.trim = function(a)      {return a.split(/^\s+|\s+$/g).join("");};
exports.trim.inCast = 'T';


// Aliases
exports.concatenate = exports.cat;


})();