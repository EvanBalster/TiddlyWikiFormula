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
var JoinFunc = function(delimiter, ignore_empty, array, startIndex) {
	var join = "", part;
	for (var i = startIndex; i < array.length; ++i)
	{
		var arg = array[i];
		if (arg instanceof Array) {
			part = JoinFunc(delimiter, ignore_empty, arg, 0);
		}
		else {
			part = Coerce.ToText(arg,this);
		}
		if (part.length || !ignore_empty) {
			if (join.length) join += delimiter;
			join += part;
		}
	}
	return join;
};

// Join
exports.join = function(delimiter) {
	return JoinFunc.call(this, delimiter, false, arguments, 1);
};
exports.join.variadic = true;
exports.join.inCast = 'T';

// Textjoin
exports.textjoin = function(delimiter, ignore_empty) {
	return JoinFunc.call(this, delimiter, ignore_empty, arguments, 2);
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