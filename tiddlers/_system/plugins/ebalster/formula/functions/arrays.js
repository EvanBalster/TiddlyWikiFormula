(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";


// Array constructor function
exports.array = function() {
	return Array.prototype.slice.call(arguments);
};
exports.array.variadic = true;


exports.nth = function(a, i) {
	i = Math.floor(i);
	if (i < 1 || i > a.length) return undefined;
	return a[i-1];
};
exports.nth.inCast = 'AN';

exports.first = function(a) {
	if (a.length) return a[0];
	return undefined;
};
exports.first.inCast = 'A';

exports.last = function(a) {
	if (a.length) return a[a.length-1];
	return undefined;
};
exports.last.inCast = 'A';

// MAP function
exports.map = function(f, a) {
	if (f.min_args > 1 || f.max_args < 1) throw "MAP requires single-argument function.";
	var result = [];
	var func = f.bind(this);
	for (var i = 0; i < a.length; ++i) result.push(func(a[i]));
	return result;
};
exports.map.inCast = 'FA';


/*
	Counting subroutines...
		countA counts every non-array value
		countS counts every non-array value but null, undefined and empty strings.
*/
function countS(a) {
	if (!(a instanceof Array)) return (a == null || a.length === 0) ? 0 : 1;
	var n = 0;
	for (var i = 0; i < a.length; ++i) n += countS(a[i]);
	return n;
}
function countA(a) {
	if (!(a instanceof Array)) return 1;
	var n = 0;
	for (var i = 0; i < a.length; ++i) n += countA(a[i]);
	return n;
}
function countS_multi() {
	var n = 0;
	for (var i = 0; i < arguments.length; ++i) n += countS(arguments[i]);
	return n;
}
function countA_multi() {
	var n = 0;
	for (var i = 0; i < arguments.length; ++i) n += countA(arguments[i]);
	return n;
}
exports.count =
{
	min_args : 1,
	select : function(operands)
	{
		switch (operands)
		{
		case 1: return countS;
		default: return countS_multi;
		}
	}
};
exports.counta =
{
	min_args : 1,
	select : function(operands)
	{
		switch (operands)
		{
		case 1: return countA;
		default: return countA_multi;
		}
	}
};

// COUNTA function, currently counts everything
exports.counta = exports.count;


})();