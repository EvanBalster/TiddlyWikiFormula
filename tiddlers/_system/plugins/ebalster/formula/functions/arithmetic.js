(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

var Val = require("$:/plugins/ebalster/formula/value.js");


// Unary sign operators
exports.uplus  = function(a)    {return new a;};
exports.uminus = function(a)    {return new Val.V_Num(-a.asNum());};

// Add
exports.add = function(a, b)    {return new Val.V_Num(a.asSum() + b.asSum());};
exports.sub = function(a, b)    {return new Val.V_Num(a.asSum() - b.asSum());};

// Multiply
exports.mul = function(a, b)    {return new Val.V_Num(a.asNum() * b.asNum());};
exports.div = function(a, b)    {return new Val.V_Num(a.asNum() / b.asNum());};

// Percent -- TODO make this a different value-type
exports.percent = function(a, b)    {return new Val.V_Percent(a.asNum() / 100);};


// Aliases
exports.subtract = exports.sub;
exports.minus    = exports.sub;
exports.multiply = exports.mul;
exports.divide   = exports.div;
exports.quotient = exports.div;
exports.power    = exports.pow;


})();