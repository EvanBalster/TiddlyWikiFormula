(function(){

"use strict";

var Values   = require("$:/plugins/ebalster/formula/value.js");
var Operands = require("$:/plugins/ebalster/formula/operands.js");


exports.Operator = function Operator() {
}
exports.Operator.prototype.name = "unknown-operator";
exports.Operator.prototype = new Operands.Operand();

/*
exports.UnaryOperator = function UnaryOperator() {
  this.first = null;
}
exports.UnaryOperator.prototype = new exports.Operator();
exports.UnaryOperator.prototype.name = "unknown-unary-operator";


exports.BinaryOperator = function BinaryOperator() {
  this.first = null;
  this.second = null;
}
exports.BinaryOperator.prototype = new exports.Operator();
exports.BinaryOperator.prototype.name = "unknown-binary-operator";
*/

exports.CallOperator = function CallOperator(func, args) {
  this.func = func;
  this.args = args;
}
exports.CallOperator.prototype = new exports.Operator();
exports.CallOperator.prototype.name = "function-call";
exports.CallOperator.prototype.compute = (function(widget, recur) {
  var vals = [];
  this.args.forEach(function(arg) {vals.push(arg.compute(widget, recur));});
  return this.func.apply(null, vals);
});

/*
exports.BinaryMathOperator = function BinaryMathOperator() {
}
exports.BinaryMathOperator.prototype = new exports.BinaryOperator();
exports.BinaryMathOperator.prototype.name = "unknown-binary-math-operator";
exports.BinaryMathOperator.prototype.compute = (function(widget, recur) {
  return mathOp(this.first.compute(widget, recur).asNum(), this.first.compute(widget, recur).asNum());
});


// Identity operator (used for unary plus)
exports.Operator_UnaryPlus = function Operator_UnaryPlus(first) {this.first = first;}
exports.Operator_UnaryPlus.prototype = new exports.UnaryOperator();
exports.Operator_UnaryPlus.prototype.name = "unary-plus";
exports.Operator_UnaryPlus.prototype.compute = function(widget, recur) {return +this.first.compute(widget, recur).asSum();}

// Negation operator (used for unary minus)
exports.Operator_UnaryMinus = function Operator_UnaryMinus(first) {this.first = first;}
exports.Operator_UnaryMinus.prototype = new exports.UnaryOperator();
exports.Operator_UnaryMinus.prototype.name = "unary-minus";
exports.Operator_UnaryMinus.prototype.compute = function(widget, recur) {return -this.first.compute(widget, recur).asSum();}


// Addition operator
exports.Operator_Plus = function Operator_Plus(first, second) {this.first = first; this.second = second;}
exports.Operator_Plus.prototype = new exports.BinaryMathOperator();
exports.Operator_Plus.prototype.name = "plus";
exports.Operator_Plus.prototype.mathOp = function(a, b) {return a+b;}

// Subtraction operator
exports.Operator_Minus = function Operator_Minus(first, second) {this.first = first; this.second = second;}
exports.Operator_Minus.prototype = new exports.BinaryMathOperator();
exports.Operator_Minus.prototype.name = "minus";
exports.Operator_Minus.prototype.mathOp = function(a, b) {return a-b;}

// Multiplication operator
exports.Operator_Multiply = function Operator_Multiply(first, second) {this.first = first; this.second = second;}
exports.Operator_Multiply.prototype = new exports.BinaryMathOperator();
exports.Operator_Multiply.prototype.name = "multiply";
exports.Operator_Multiply.prototype.mathOp = function(a, b) {return a*b;}

// Division operator
exports.Operator_Divide = function Operator_Divide(first, second) {this.first = first; this.second = second;}
exports.Operator_Divide.prototype = new exports.BinaryMathOperator();
exports.Operator_Divide.prototype.name = "divide";
exports.Operator_Divide.prototype.mathOp = function(a, b) {return a/b;}

// Division operator
exports.Operator_Exponent = function Operator_Exponent(first, second) {this.first = first; this.second = second;}
exports.Operator_Exponent.prototype = new exports.BinaryMathOperator();
exports.Operator_Exponent.prototype.name = "exponent";
exports.Operator_Exponent.prototype.mathOp = function(a, b) {return Math.pow(a, b);}
*/
})();
