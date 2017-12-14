(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

var Val = require("$:/plugins/ebalster/formula/value.js");
var Ops = require("$:/plugins/ebalster/formula/operands.js");


// Unary sign operators
exports.uplus  = function(a)    {return new Val.Value_Number(+a.asNumber_sum());};
exports.uminus = function(a)    {return new Val.Value_Number(-a.asNumber_sum());};

// Sum
exports.sum = function(a)       {return new Val.Value_Number(a.asNumber_sum());};

// Add
exports.add = function(a, b)    {return new Val.Value_Number(a.asNumber_sum() + b.asNumber_sum());};
exports.sub = function(a, b)    {return new Val.Value_Number(a.asNumber_sum() - b.asNumber_sum());};

// Multiply
exports.mul = function(a, b)    {return new Val.Value_Number(a.asNumber() * b.asNumber());};
exports.div = function(a, b)    {return new Val.Value_Number(a.asNumber() / b.asNumber());};

// Exponential
exports.pow = function(a, b)    {return new Val.Value_Number(Math.pow(a.asNumber(), b.asNumber()));};

// Percent -- TODO make this a different value-type
exports.percent = function(a, b)    {return new Val.Value_Percent(a.asNumber() / 100);};


// Aliases
exports.subtract = exports.sub;
exports.multiply = exports.mul;
exports.divide   = exports.div;


})();