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
exports.Value.prototype.asSum = function() {
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
exports.V_Undefined = function() {
  this.name = "undefined";
}
exports.V_Undefined.prototype = new exports.Value();
exports.V_Undefined.prototype.get = function()    {throw "undefined value";}


// String value.
exports.V_Text = function(value) {
  this.name = "string";

  this.value = value;
}
exports.V_Text.prototype = new exports.Value();
exports.V_Text.prototype.get = function()    {return this.value;}


// Array value.
exports.V_Array = function(value) {
  this.name = "array";

  this.value = value;
}
exports.V_Array.prototype = new exports.Value();
exports.V_Array.prototype.get      = function()                {return this.value;}
exports.V_Array.prototype.asNumber = function()                {throw "Cannot convert " + this.describe() + " to number!";}
exports.V_Array.prototype.asSum    = function() {
  var n = 0;
  for (var i = 0; i < this.value.length; ++i) n += this.value[i].asNumber();
  if (isNaN(n)) throw "Cannot sum " + this.describe() + " to a number!";
  return n;
}
exports.V_Array.prototype.asString     = function() {
  var result = "[";
  if (this.value.length) result += this.value[0].asString();
  for (var i = 1; i < this.value.length; ++i) result += "," + this.value[i].asString();
  return result + "]";
}


// Number value.
exports.V_Bool = function(value) {
  this.name = "boolean";

  this.value = value;
}
exports.V_Bool.prototype = new exports.Value();
exports.V_Bool.prototype.get      = function()    {return this.value;}
exports.V_Bool.prototype.asString = function()    {return this.value ? "TRUE" : "FALSE";}
exports.V_Bool.prototype.asNumber = function()    {return this.value ? 1 : 0;}
exports.V_Bool.prototype.asSum    = function()    {return this.value ? 1 : 0;}


// Number value.
exports.V_Number = function(value) {
  this.name = "number";

  this.value = value;
}
exports.V_Number.prototype = new exports.Value();
exports.V_Number.prototype.get      = function()    {return this.value;}
exports.V_Number.prototype.asString = function()    {return (exports.NumberFormatFunc || String)(this.value);}
exports.V_Number.prototype.asNumber = function()    {return this.value;}
exports.V_Number.prototype.asSum    = function()    {return this.value;}


// Percentage value.
exports.V_Percent = function(value) {
  this.name = "percentage";

  this.value = value;
}
exports.V_Percent.prototype = new exports.V_Number();
exports.V_Percent.prototype.asString = function()
{
  return (exports.NumberFormatFunc || String)(100*this.value) + "%";
}

})();
