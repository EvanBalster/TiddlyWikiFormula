(function(){

"use strict";


exports.NumberFormatFunc = null;


// Base type for formula values
exports.Value = function() {
  this.name = "unknown-value";
}

// Get the value payload
exports.Value.prototype.get = function()    {return undefined;};

// Describe the value
exports.Value.prototype.describe = function()    {return this.name + " (" + String(this.get()) + ")";}

exports.Value.prototype.toString = function()    {return "[Value " + this.describe() + "]";}

// Get the value as a number (generic implementation)
exports.Value.prototype.asNumber = function() {
  var v = this.get();
  var n = Number(v);
  if (isNaN(n)) throw "Cannot convert " + this.describe() + " to a number!";
  return n;
}

// Get the value as a number, summing arrays (generic implementation)
exports.Value.prototype.asNumber_sum = function() {
  var v = this.get();
  var n;
  if (Array.isArray(v)) {n = 0; for (var i = 0; i < v.length; ++i) n += Number(v[i]);}
  else                  n = Number(v);
  if (isNaN(n)) throw "Cannot sum " + this.describe() + " to a number!";
  return n;
}

// Get the value as a string
exports.Value.prototype.asString = function() {
  return String(this.get());
}

// Get the value as an array
exports.Value.prototype.asArray = function() {
  var v = this.get();
  if (Array.isArray(v)) return v;
  else return [v];
}


// Undefined value.
exports.Value_Undefined = function() {
  this.name = "undefined";
}
exports.Value_Undefined.prototype = new exports.Value();
exports.Value_Undefined.prototype.get = function()    {throw "undefined value";}


// String value.
exports.Value_String = function(value) {
  this.name = "string";

  this.value = value;
}
exports.Value_String.prototype = new exports.Value();
exports.Value_String.prototype.get = function()    {return this.value;}


// Array value.
exports.Value_Array = function(value) {
  this.name = "array";

  this.value = value;
}
exports.Value_Array.prototype = new exports.Value();
exports.Value_Array.prototype.get          = function()                {return this.value;}
exports.Value_Array.prototype.asNumber     = function()                {throw "Cannot convert " + this.describe() + " to number!";}
exports.Value_Array.prototype.asNumber_sum = function() {
  var n = 0;
  for (var i = 0; i < this.value.length; ++i) n += this.value[i].asNumber();
  if (isNaN(n)) throw "Cannot sum " + this.describe() + " to a number!";
  return n;
}
exports.Value_Array.prototype.asString     = function() {
  var result = "[";
  if (this.value.length) result += this.value[0].asString();
  for (var i = 1; i < this.value.length; ++i) result += "," + this.value[i].asString();
  return result + "]";
}


// Number value.
exports.Value_Number = function(value) {
  this.name = "number";

  this.value = value;
}
exports.Value_Number.prototype = new exports.Value();
exports.Value_Number.prototype.get          = function()    {return this.value;}
exports.Value_Number.prototype.asString     = function()    {return (exports.NumberFormatFunc || String)(this.value);}
exports.Value_Number.prototype.asNumber     = function()    {return this.value;}
exports.Value_Number.prototype.asNumber_sum = function()    {return this.value;}


// Percentage value.
exports.Value_Percent = function(value) {
  this.name = "percentage";

  this.value = value;
}
exports.Value_Percent.prototype = new exports.Value_Percent();
exports.Value_Percent.prototype.get          = function()    {return this.value;}
exports.Value_Percent.prototype.asString     = function()    {return (exports.NumberFormatFunc || String)(100*this.value) + "%";}
exports.Value_Percent.prototype.asNumber     = function()    {return this.value;}
exports.Value_Percent.prototype.asNumber_sum = function()    {return this.value;}

})();
