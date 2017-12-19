(function(){

"use strict";

var Operands = require("$:/plugins/ebalster/formula/operands.js");


exports.Operator = function Operator() {
};
exports.Operator.prototype.name = "unknown-operator";
exports.Operator.prototype = new Operands.Operand();

/*
  All operators and functions are implemented with this "function call" operator.
*/

exports.CallOperator = function CallOperator(func, args) {
  this.func = func;
  this.args = args;
};
exports.CallOperator.prototype = new exports.Operator();
exports.CallOperator.prototype.name = "function-call";
exports.CallOperator.prototype.compute = (function(widget, recur) {
  var vals = [];
  this.args.forEach(function(arg) {vals.push(arg.compute(widget, recur));});
  return this.func.apply(null, vals);
});

})();
