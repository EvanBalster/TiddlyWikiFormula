(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";


// Unary sign operators
exports.uplus  = function(a)    {return a;};
exports.uminus = function(a)    {return -a;};
exports.uminus.inCast = 'N';

// Add
exports.add = function(a, b)    {return a + b;};
exports.add.inCast = 'NN';
exports.sub = function(a, b)    {return a - b;};
exports.sub.inCast = 'NN';

// Multiply
exports.mul = function(a, b)    {return a * b;};
exports.mul.inCast = 'NN';
exports.div = function(a, b)    {return a / b;};
exports.div.inCast = 'NN';

// Percent -- TODO make this a different value-type
exports.percent = function(a)    {return a / 100;};
exports.percent.inCast = 'N';


// Aliases
exports.subtract = exports.sub;
exports.minus    = exports.sub;
exports.multiply = exports.mul;
exports.divide   = exports.div;
exports.quotient = exports.div;
exports.power    = exports.pow;


})();