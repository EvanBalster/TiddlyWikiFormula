(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

var Node = require("$:/plugins/ebalster/formula/nodes.js").Node;


// Constants
exports.true  = function()    {return true;};
exports.false = function()    {return false;};

exports.true.isConstant = true;
exports.false.isConstant = true;

// Logical operators
exports.not = function(a)       {return !a;};
exports.not.inCast = 'B';
exports.and = function(a, b)    {return a && b;};
exports.and.inCast = 'BB';
exports.or  = function(a, b)    {return a || b;};
exports.or .inCast = 'BB';
exports.xor = function(a, b)    {return a ? !b : b;};
exports.xor.inCast = 'BB';

// Ternary
function IfNode(pred, tval, fval) {
	this.pred = pred;
	this.tval = tval;
	this.fval = fval;
}
IfNode.prototype = new Node();
IfNode.prototype.name = "if";
IfNode.prototype.compute = (function(ctx) {
	return (this.pred.computeBool(ctx) ? this.tval.compute(ctx) : this.fval.compute(ctx));
});
exports.if = {
	min_args: 3, max_args: 3,
	construct: function(operands) {
		return new IfNode(operands[0], operands[1], operands[2]);
	}
};


// IFERROR
/*exports.iferror = {
	min_args = 2, max_args = 2,
	func = function(a, b) {
	select: function(operands) {
		try {return a.compute();}
		catch (err) {return b.compute();}
	}
	};*/


// SWITCH (variadic)
exports.switch =
{
	min_args: 3,
	select: function(operands)
	{
		switch (operands.length % 2)
		{
		default:
		case 0: return function(a) // Switch with default
			{
				var value = a;
				for (var i = 1; i+1 < arguments.length; i += 2)
					{if (arguments[i] == value) return arguments[i+1];}
				return arguments[arguments.length-1];
			};
		case 1: return function(a) // Switch, no default
			{
				var value = a;
				for (var i = 1; i+1 < arguments.length; i += 2)
					{if (arguments[i] == value) return arguments[i+1];}
				return undefined;
			};
		}
	}
};

// CHOOSE (variadic)
exports.choose = function(a, b)
{
	var index = Math.floor(a);
	var result = arguments[index];
	if (index < 1 || !result) return undefined;
	return result;
};
exports.choose.inCast = 'N';
exports.choose.variadic = true;

// IFS function (variadic)
function ifsFunc() {
	for (var i = 0; i < arguments.length; i += 2)
		{if (arguments[i]) return arguments[i+1];}
	return undefined;
};
ifsFunc.inCast = '+B_';

exports.ifs =
{
	min_args : 2,
	input: '+B_',
	select : function(operands) {
		if (operands.length % 2 !== 0) throw "Odd number of arguments to IFS";
		return ifsFunc;
	}
};

})();