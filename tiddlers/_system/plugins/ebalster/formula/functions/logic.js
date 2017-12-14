(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

var Val = require("$:/plugins/ebalster/formula/value.js");


// Constants
exports.true  = function()    {return new Val.V_Bool(true);};
exports.false = function()    {return new Val.V_Bool(false);};

// Logical operators
exports.not = function(a)       {return new Val.V_Bool(!a.get());};
exports.and = function(a, b)    {return new Val.V_Bool(a.get() && b.get());};
exports.or  = function(a, b)    {return new Val.V_Bool(a.get() || b.get());};
exports.xor = function(a, b)    {return new Val.V_Bool(a.get() ? !b.get() : !!b.get());};

// Ternary
exports.if  = function(p, a, b) {return p.get() ? a.get() : b.get();};


// IFERROR
exports.iferror = function(a, b) {try {return a.get();} catch (err) {return b.get();}};

// SWITCH (variadic)
exports.switch = function(a)
{
  var switchVal = a.get();
  var i = 1;
  for (; i+1 < arguments.length; i += 2)
  {
    if (arguments[i].get() == switchVal)
    {
      var result = arguments[i+1];
      if (!result) throw "SWITCH missing value after predicate";
      return result;
    }
  }
  if (i < arguments.length) return arguments[i];
  return new Val.V_Undefined();
}
exports.switch.variadic = true;

// NTH (variadic)
exports.nth = function(a)
{
  var result = arguments[a.asNumber()];
  if (!result) throw "NTH index out of range";
  return result;
}
exports.switch.variadic = true;

// IFS function (variadic)
exports.ifs = function()
{
  for (var i = 0; i < arguments.length; i += 2)
  {
    if (arguments[i].get())
    {
      var result = arguments[i+1];
      if (!result) throw "IFS missing value after predicate";
      return result;
    }
  }
  return new Val.V_Undefined();
}
exports.ifs.variadic = true;

})();