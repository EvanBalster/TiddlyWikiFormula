(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

var Node = require("$:/plugins/ebalster/formula/nodes.js").Node;
var Val = require("$:/plugins/ebalster/formula/value.js");


// Constants
exports.true  = function()    {return new Val.V_Bool(true);};
exports.false = function()    {return new Val.V_Bool(false);};

exports.true.isConstant = true;
exports.false.isConstant = true;

// Logical operators
exports.not = function(a)       {return new Val.V_Bool(!a.get());};
exports.and = function(a, b)    {return new Val.V_Bool(a.get() && b.get());};
exports.or  = function(a, b)    {return new Val.V_Bool(a.get() || b.get());};
exports.xor = function(a, b)    {return new Val.V_Bool(a.get() ? !b.get() : !!b.get());};

// Ternary
function IfNode(pred, tval, fval) {
	this.pred = pred;
	this.tval = tval;
	this.fval = fval;
}
IfNode.prototype = new Node();
IfNode.prototype.name = "if";
IfNode.prototype.compute = (function(ctx) {
	return (this.pred.compute(ctx).get() ? this.tval.compute(ctx) : this.fval.compute(ctx));
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
				var value = a.get();
				for (var i = 1; i+1 < arguments.length; i += 2)
					{if (arguments[i].get() == value) return arguments[i+1];}
				return arguments[arguments.length-1];
			};
		case 1: return function(a) // Switch, no default
			{
				var value = a.get();
				for (var i = 1; i+1 < arguments.length; i += 2)
					{if (arguments[i].get() == value) return arguments[i+1];}
				return new Val.V_Undefined();
			};
		}
	}
};

// CHOOSE (variadic)
exports.choose = function(a, b)
{
	var index = Math.floor(a.asNum());
	var result = arguments[index];
	if (index < 1 || !result) return new Val.V_Undefined();
	return result;
};
exports.choose.variadic = true;

// IFS function (variadic)
exports.ifs =
{
	min_args : 2,
	select : function(operands)
	{
		if (operands.length % 2 !== 0)
			throw "Odd number of arguments to IFS";

		return function()
		{
			for (var i = 0; i < arguments.length; i += 2)
				{if (arguments[i].get()) return arguments[i+1];}
			return new Val.V_Undefined();
		};
	}
};

})();