(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

var Val = require("$:/plugins/ebalster/formula/value.js");
var Ops = require("$:/plugins/ebalster/formula/operands.js");


// Unary sign operators
exports.uplus  = function(a)    {return new Val.V_Number(+a.asSum());};
exports.uminus = function(a)    {return new Val.V_Number(-a.asSum());};

// Sum
exports.sum = function(a)       {return new Val.V_Number(a.asSum());};

// Add
exports.add = function(a, b)    {return new Val.V_Number(a.asSum() + b.asSum());};
exports.sub = function(a, b)    {return new Val.V_Number(a.asSum() - b.asSum());};

// Multiply
exports.mul = function(a, b)    {return new Val.V_Number(a.asNumber() * b.asNumber());};
exports.div = function(a, b)    {return new Val.V_Number(a.asNumber() / b.asNumber());};

// Exponential
exports.pow = function(a, b)    {return new Val.V_Number(Math.pow(a.asNumber(), b.asNumber()));};

// Percent -- TODO make this a different value-type
exports.percent = function(a, b)    {return new Val.V_Percent(a.asNumber() / 100);};


// Aliases
exports.subtract = exports.sub;
exports.multiply = exports.mul;
exports.divide   = exports.div;


})();