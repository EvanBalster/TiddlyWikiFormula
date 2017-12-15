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
      }
    case 1: return function(a) // Switch, no default
      {
        var value = a.get();
        for (var i = 1; i+1 < arguments.length; i += 2)
          {if (arguments[i].get() == value) return arguments[i+1];}
        return new Val.V_Undefined();
      }
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
    if (operands.length % 2 != 0)
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