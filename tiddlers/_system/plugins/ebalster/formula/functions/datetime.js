(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";


var MS_PER_DAY = 86400000;
var MS_PER_HOUR = 3600000;
var MS_PER_MINUTE = 60000;
var MS_PER_SECOND =  1000;

var UNIX_EPOCH_JULIAN_DAY = 2440587;


/*!
 * isoWeekNum from pikaday <https://github.com/actano/Pikaday>
 */
function isoWeekOfYear(date, dayInFirstWeek) {
	dayInFirstWeek = dayInFirstWeek || 4;
	date = date instanceof Date ? date : new Date();
	date.setHours(0, 0, 0, 0);
	var yearDay        = date.getDate(),
		weekDay        = date.getDay(),
		dayShift       = dayInFirstWeek - 1, // counting starts at 0
		prevWeekDay    = function(day) { return (day + 7 - 1) % 7; };
	date.setDate(yearDay + dayShift - prevWeekDay(weekDay));
	var jan4th      = new Date(date.getFullYear(), 0, dayInFirstWeek),
		daysBetween = (date.getTime() - jan4th.getTime()) / MS_PER_DAY,
		weekNum     = 1 + Math.round((daysBetween - dayShift + prevWeekDay(jan4th.getDay())) / 7);
	return weekNum;
}
function isLeapYear(year) {
	return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
}
function daysInYear(year) {
	return isLeapYear(year) ? 366 : 365;
}
function daysInMonth(year, monthIndex) {
	switch (monthIndex) {
	case  0: case  2: case  4: case  6: case  7: case  9: case 11:return 31;
	case  3: case  5: case  8: case 10: return 30;
	case  1: return (isLeapYear(year) ? 29 : 28);
	default: throw "days_in_month: invalid monthIndex: " + monthIndex;
	}
}

// Utility: Add some months or years to a date
function dateAddMonths(date, monthDiff, yearDiff) {
	yearDiff = yearDiff || 0;
	var newMonth = date.getMonth() + Math.round(monthDiff);
	var newYear = date.getFullYear() + Math.round(yearDiff);

	var yearShift = ((newMonth < 0) ? -Math.floor(-(newMonth-11)/12) : Math.floor(newMonth/12));
	newYear  += yearShift;
	newMonth -= 12*yearShift;

	return new Date(newYear, newMonth,
		Math.min(date.getDate(), daysInMonth(newYear, newMonth)),
		date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
}

// Utility: Get date difference in whole years and months
function dateDelta(date1, date2) {
	if (date2.getTime() < date1.getTime())
	{
		var d = dateDelta(date2, date1);
		return {years: -d.years, months: -d.months};
	}
	var dMonths = 12*(date2.getYear()-date1.getYear()) + (date2.getMonth()-date1.getMonth());
	if (date2.getDate() < date1.getDate()) dMonths -= 1;
	var dYears = Math.floor(dMonths/12);
	//dMonths -= dYears*12;
	/*var dDays = (new Date(
		date1.getFullYear()+dYears, date1.getMonth()+dMonths, date2.getDate(),
		date2.getHours(), date2.getMinutes(), date2.getSeconds(), date2.getMilliseconds()
		).getTime() - date1.getTime()) / MS_PER_DAY;*/
	return {years: dYears, months: dMonths};
}


// Get the current time
exports.now         = function()     {return new Date(Date.now());};

// Decompose dates
exports.year        = function(d)    {return (d.getFullYear());};
exports.year.inCast = 'D';
exports.month       = function(d)    {return (d.getMonth()+1);};
exports.month.inCast = 'D';
exports.day         = function(d)    {return (d.getDate());};
exports.day.inCast = 'D';
exports.hour        = function(d)    {return (d.getHours());};
exports.hour.inCast = 'D';
exports.minute      = function(d)    {return (d.getMinutes());};
exports.minute.inCast = 'D';
exports.second      = function(d)    {return (d.getSeconds());};
exports.second.inCast = 'D';
exports.millisecond = function(d)    {return (d.getMilliseconds());};
exports.millisecond.inCast = 'D';

// Week functions
exports.weekday     = function(d)    {return (d.getDay()+1);};
exports.weekday.inCast = 'D';
exports.weeknum     = function(d)    {return (isoWeekOfYear(d, 1));};
exports.weeknum.inCast = 'D';
exports.isoweekday  = function(d)    {return ((d.getDay()+6) % 7 + 1);};
exports.isoweekday.inCast = 'D';
exports.isoweeknum  = function(d)    {return (isoWeekOfYear(d));};
exports.isoweeknum.inCast = 'D';


/*
	Date math
*/
function makeTimeDiffFunction(milliseconds) {
	var f = function(a, b) {return (b.getTime() - a.getTime()) / milliseconds;};
	f.inCast = 'DD';
	return f;
}
function makeTimeAddFunction(milliseconds) {
	var f = function(a, b) {return new Date(a.getTime() + b * milliseconds);};
	f.inCast = 'DN';
	return f;
}

exports.years  = function(a, b) {return dateDelta(a, b).years;};
exports.years.inCast = 'DD';
exports.months = function(a, b) {return dateDelta(a, b).months;};
exports.months.inCast = 'DD';
exports.days            = makeTimeDiffFunction(MS_PER_DAY);
exports.hours           = makeTimeDiffFunction(MS_PER_HOUR);
exports.minutes         = makeTimeDiffFunction(MS_PER_MINUTE);
exports.seconds         = makeTimeDiffFunction(MS_PER_SECOND);
exports.milliseconds    = makeTimeDiffFunction(1);

exports.add_years  = function(a, b) {return dateAddMonths(a, 0, b);};
exports.add_years.inCast = 'DN';
exports.add_months = function(a, b) {return dateAddMonths(a, b);};
exports.add_months.inCast = 'DN';
exports.add_days         = makeTimeAddFunction(MS_PER_DAY);
exports.add_hours        = makeTimeAddFunction(MS_PER_HOUR);
exports.add_minutes      = makeTimeAddFunction(MS_PER_MINUTE);
exports.add_seconds      = makeTimeAddFunction(MS_PER_SECOND);
exports.add_milliseconds = makeTimeAddFunction(1);

exports.is_leap_year  = function(year)       {return (isLeapYear(year));};
exports.is_leap_year.inCast = 'N';
exports.days_in_year  = function(year)       {return (daysInYear(year));};
exports.days_in_year.inCast = 'N';
exports.days_in_month = function(yr, mon)    {return (daysInMonth(yr, mon-1));};
exports.days_in_month.inCast = 'NN';

/*exports.datedif = function(a, b, c) {
	switch (c.toUpperCase())
	{
	case "D": return ((b.getTime() - a.getTime()) / MS_PER_DAY);
	case "M": {var d=dateDelta(a, b); return d.months+12*d.years;}
	case "Y": return dateDelta(a, b).years;
	case "YM": return dateDelta(a, b).months;
	case "MD": return dateDelta(a, b).days;
	}
};
exports.datedif.inCast = 'DDT';*/


// Parse TiddlyWiki date
exports.tw_date = function(timestamp) {
	var date = $tw.utils.parseDate(timestamp);
	if (!date) throw "Bad timestamp: \"" + date + "\"";
	return (date);
};
exports.tw_date.inCast = 'T';

// Stringify as TiddlyWiki date
exports.to_tw_date = function(date) {
	return $tw.utils.stringifyDate(date);
};
exports.to_tw_date.inCast = 'D';

// Create ISO date
exports.make_date = function(year, month, day) {
	return (new Date(year, month-1, day));
};
exports.make_date.inCast = 'NNN';

// Create ISO time
exports.make_time = function(hour, minute, second) {
	return (new Date(0, 0, 0, hour, minute, second));
};
exports.make_time.inCast = 'NNN';

// Create from julian
exports.julian = function(julian) {
	return (new Date((julian - UNIX_EPOCH_JULIAN_DAY) * MS_PER_DAY));
};
exports.julian.inCast = 'N';

// Convert to julian
exports.to_julian = function(date) {
	return (UNIX_EPOCH_JULIAN_DAY + (date.getTime() / MS_PER_DAY));
};
exports.to_julian.inCast = 'D';

exports.time = exports.make_time;


// Cast the incoming value into a date.
function interpret_date(a) {
	if (a instanceof Date) return a;
	return exports.tw_date(a);
}
interpret_date.inCast = 'D';


// Consruct a date from a TiddlyWiki timestamp or a set of parts
exports.date = {
	min_args: 1, max_args: 3,
	select: function(operands) {
		switch (operands.length) {
		case 1: return interpret_date;
		case 3: return exports.make_date;
		default: throw "Bad arguments to DATE. Should be (timestamp) or (year, month, day).";
		}
	}
};


})();