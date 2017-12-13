(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

// Unary sign operators
exports.uplus    = {arity: 1, position: "pre",  operator: "+", function: "uplus"};
exports.uminus   = {arity: 1, position: "pre",  operator: "-", function: "uminus"};

// Add
exports.plus     = {arity: 2, precedence: 10,   operator: "+", function: "add"};
exports.minus    = {arity: 2, precedence: 10,   operator: "-", function: "sub"};

// Multiply
exports.multiply = {arity: 2, precedence: 20,   operator: "*", function: "mul"};
exports.divide   = {arity: 2, precedence: 20,   operator: "/", function: "div"};

// Exponential
exports.pow      = {arity: 2, precedence: 30,   operator: "^", function: "pow", associativity: "right"};

// Percentage
exports.percent  = {arity: 1, position: "post", operator: "%", function: "percent"};

})();