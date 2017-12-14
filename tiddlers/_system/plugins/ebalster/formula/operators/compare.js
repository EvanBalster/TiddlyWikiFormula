(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

// Equality
exports.eq  = {arity: 2, precedence: 0,   operator: "=",  function: "eq"};
exports.ne  = {arity: 2, precedence: 0,   operator: "<>", function: "ne"};

// Inequality
exports.gt  = {arity: 2, precedence: 0,   operator: ">",  function: "gt"};
exports.gte = {arity: 2, precedence: 0,   operator: ">=", function: "gte"};
exports.lt  = {arity: 2, precedence: 0,   operator: "<",  function: "lt"};
exports.lte = {arity: 2, precedence: 0,   operator: "<=", function: "lte"};

})();