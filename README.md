# Formula for TiddlyWiki

A TiddlyWiki plugin for functional formulas, combining the power of Excel and Google Sheets with TiddlyWiki's processing idioms.

Created by Evan Balster <evan@imitone.com>

* [Source on GitHub](https://github.com/EvanBalster/TiddlyWikiFormula).
* [Demonstration Wiki](https://joshuafontany.github.io/TiddlyWikiFormula/).

Get Formulas by opening the Demonstration Wiki and navigating to the plugins there.


## Examples


feature | formula | result
--- | --- | ---
numbers |	`(= 2 =)` |	2.00
math |	`(= 2+3*4 =)` |	14.00
functions	|	`(= pow(2, 3) =)` |	8.00
comparison	|	`(= 2+3*4 > 12 =)` |	TRUE
transclusion	|	`(= {{Soda-Pop!!value}} =)` |	1.49
variables	|	`(= <<now>> =)` |	15:38, 20th December 2017
filters	|	`(= [tag[Expenses]] =)` |	[Candy-Bar,Soda-Pop,Ten-Sodas]
complex
formulas |	`(= round(5*sum([tag[Expenses]get[value]]), 2) =)` |	92.10
strings	|	`(= "hello" =)` |	hello
concatenation	|	`(= '$' & 45.23*12 & " cost" =)` |	$542.76 cost


## Contributing

"This plugin is currently under development.  I've written compilers before, but this is my first in-depth project in JavaScript.  Please report any bugs you encounter, or any problems you spot in the code." - Evan Balster

The Formula plugin has not been fully tested under IE, Edge or other mobile browsers.
