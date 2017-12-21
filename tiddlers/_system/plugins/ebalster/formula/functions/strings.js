(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

var Val = require("$:/plugins/ebalster/formula/value.js");

var V_Text = Val.V_Text;



// Cast to text.  Second argument not yet supported.
exports.t = function(a)    {return new V_Text(a.asString());};

exports.text = {
	min_args: 1, max_args: 1,
	select: function(operands) {
		if (operands.length == 1) return exports.t;
		return function(a, format) {return new V_Text(a.asString());};
	}
};

// Cast string to number.
exports.value = function(a)    {return new Val.V_Num(a.get());};

// Array to string
exports.textjoin = function(delimiter, ignore_empty, a) {
	delimiter = delimiter.asString();
	var s = "";
	var i = 1;
	if (ignore_empty instanceof Val.V_Bool) {
		i = 2;
		ignore_empty = ignore_empty.get();
	}
	else ignore_empty = true;
	for (; i < arguments.length; ++i)
	{
		var arg = arguments[i];
		if (arg instanceof Val.V_Array) {
			arg = arg.get();
			for (var j = 0; j < arg.length; ++j) {
				if (s.length) s += delimiter;
				s += arg[j].asString();
			}
		}
		else {
			if (s.length) s += delimiter;
			s += arg.asString();
		}
	}
	return new V_Text(s);
};
exports.textjoin.variadic = true;

// Split string to array
exports.split = function(str, delimiter) {
	delimiter = delimiter.asString();
	var split = str.asString().split(delimiter);
	var results = [];
	for (var i = 0; i < split.length; ++i) {
		if (split[i].length) results.push(split[i]);
	}
	return new Val.V_Array(results);
};

// String length
exports.len = function(str)     {return new Val.V_Num(str.asString().length);};

// String exact match
exports.exact = function(a, b)    {return new Val.V_Bool(a.asString() === b.asString());};


// Substrings
exports.mid = function(str, i, n)    {return new V_Text(str.asString().substr(i.asNum()-1, n.asNum()));};

exports.substr = exports.mid;


// Substitute
exports.substitute = function(s, f, r)    {return new V_Text(s.asString().replace(f.asString(), r.asString()));};

// Replace (N/I)
//exports.replace = function(s, p, l, r)    {return new V_Text(s.asString().splice(a.asString(), b.asString()));};


// Concatenate
exports.cat = function(a, b)    {return new V_Text(a.asString() + b.asString());};

// Trim space
exports.trim = function(a)      {return new V_Text(a.asString().replace(/^\s+|\s+$/g, ""));};


// Aliases
exports.concatenate = exports.cat;


})();