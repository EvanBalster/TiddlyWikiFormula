@@ -1,20 +1,19 @@
 /*%5C
-%0D
 %0Atitle: $:/core/
@@ -29,33 +29,32 @@
 idgets/widget.js
-%0D
 %0Atype: applicati
@@ -58,33 +58,32 @@
 ation/javascript
-%0D
 %0Amodule-type: wi
@@ -106,33 +106,32 @@
 ase class%0D%0A%0D%0A%5C*/
-%0D
 %0A(function()%7B%0D%0A%0D
@@ -160,33 +160,32 @@
 browser: true */
-%0D
 %0A/*global $tw: f
@@ -183,33 +183,32 @@
 al $tw: false */
-%0D
 %0A%22use strict%22;%0D%0A
@@ -203,33 +203,32 @@
 e strict%22;%0D%0A%0D%0A/*
-%0D
 %0ACreate a widget
@@ -248,33 +248,32 @@
  parse tree node
-%0D
 %0A%09parseTreeNode:
@@ -312,33 +312,32 @@
 e to be rendered
-%0D
 %0A%09options: see b
@@ -332,33 +332,32 @@
 tions: see below
-%0D
 %0AOptions include
@@ -349,33 +349,32 @@
 Options include:
-%0D
 %0A%09wiki: mandator
@@ -417,33 +417,32 @@
 this render tree
-%0D
 %0A%09parentWidget: 
@@ -499,33 +499,32 @@
 he context chain
-%0D
 %0A%09document: opti
@@ -569,37 +569,35 @@
  global document
-%0D
 %0A*/
-%0D
 %0Avar Widget = fu
@@ -619,34 +619,34 @@
 eNode,options) %7B
-%0D
 %0A
+%09
 %09this.initialise
@@ -661,43 +661,41 @@
 eeNode,options);
-%0D
 %0A%7D;%0D%0A%0D%0A/*
-%0D
 %0AInitialise widg
@@ -786,37 +786,35 @@
 em in subclasses
-%0D
 %0A*/
-%0D
 %0AWidget.prototyp
@@ -853,33 +853,32 @@
 eNode,options) %7B
-%0D
 %0A%09// Bail if par
@@ -992,33 +992,32 @@
 an be subclassed
-%0D
 %0A%09if(parseTreeNo
@@ -1035,32 +1035,29 @@
 fined) %7B
-%0D
 %0A%09%09return;
-%0D
 %0A%09%7D
-%0D
 %0A%09option
@@ -1066,33 +1066,32 @@
 = options %7C%7C %7B%7D;
-%0D
 %0A%09// Save widget
@@ -1087,33 +1087,32 @@
 Save widget info
-%0D
 %0A%09this.parseTree
@@ -1124,33 +1124,32 @@
 = parseTreeNode;
-%0D
 %0A%09this.wiki = op
@@ -1151,33 +1151,32 @@
  = options.wiki;
-%0D
 %0A%09this.parentWid
@@ -1194,33 +1194,32 @@
 ns.parentWidget;
-%0D
 %0A%09this.variables
@@ -1238,33 +1238,32 @@
 = function() %7B%7D;
-%0D
 %0A%09this.variables
@@ -1331,33 +1331,32 @@
 .variables : %7B%7D;
-%0D
 %0A%09this.variables
@@ -1382,33 +1382,32 @@
 esConstructor();
-%0D
 %0A%09this.document 
@@ -1417,33 +1417,32 @@
 ptions.document;
-%0D
 %0A%09this.attribute
@@ -1440,33 +1440,32 @@
 attributes = %7B%7D;
-%0D
 %0A%09this.children 
@@ -1461,33 +1461,32 @@
 s.children = %5B%5D;
-%0D
 %0A%09this.domNodes 
@@ -1482,33 +1482,32 @@
 s.domNodes = %5B%5D;
-%0D
 %0A%09this.eventList
@@ -1509,33 +1509,32 @@
 tListeners = %7B%7D;
-%0D
 %0A%09// Hashmap of 
@@ -1543,33 +1543,32 @@
 e widget classes
-%0D
 %0A%09if(!this.widge
@@ -1570,33 +1570,32 @@
 widgetClasses) %7B
-%0D
 %0A%09%09// Get widget
@@ -1594,33 +1594,32 @@
 t widget classes
-%0D
 %0A%09%09Widget.protot
@@ -1665,33 +1665,32 @@
 thods(%22widget%22);
-%0D
 %0A%09%09// Process an
@@ -1693,33 +1693,32 @@
 s any subclasses
-%0D
 %0A%09%09$tw.modules.f
@@ -1770,33 +1770,32 @@
 (title,module) %7B
-%0D
 %0A%09%09%09if(module.ba
@@ -1796,33 +1796,32 @@
 ule.baseClass) %7B
-%0D
 %0A%09%09%09%09var baseCla
@@ -1866,33 +1866,32 @@
 dule.baseClass%5D;
-%0D
 %0A%09%09%09%09if(!baseCla
@@ -1887,33 +1887,32 @@
 if(!baseClass) %7B
-%0D
 %0A%09%09%09%09%09throw %22Mod
@@ -2000,40 +2000,38 @@
 baseClass + %22'%22;
-%0D
 %0A%09%09%09%09%7D
-%0D
 %0A%09%09%09%09var subClas
@@ -2045,33 +2045,32 @@
 ule.constructor;
-%0D
 %0A%09%09%09%09subClass.pr
@@ -2087,33 +2087,32 @@
 new baseClass();
-%0D
 %0A%09%09%09%09$tw.utils.e
@@ -2146,33 +2146,32 @@
 dule.prototype);
-%0D
 %0A%09%09%09%09Widget.prot
@@ -2234,44 +2234,191 @@
 ubClass;
-%0D
 %0A%09%09%09%7D
-%0D
 %0A%09%09%7D);
-%0D
+%0A%09%7D%0A%09// Hashmap of the attribute classes%0A%09if(!this.attributeClasses) %7B%0A%09%09Widget.prototype.attributeClasses = $tw.modules.applyMethods(%22attributevalue%22);
 %0A%09%7D
-%0D
 %0A%7D;%0D%0A%0D%0A/*
-%0D
 %0ARender 
@@ -2433,37 +2433,35 @@
 get into the DOM
-%0D
 %0A*/
-%0D
 %0AWidget.prototyp
@@ -2493,33 +2493,32 @@
 t,nextSibling) %7B
-%0D
 %0A%09this.parentDom
@@ -2523,33 +2523,32 @@
 omNode = parent;
-%0D
 %0A%09this.execute()
@@ -2540,33 +2540,32 @@
 %09this.execute();
-%0D
 %0A%09this.renderChi
@@ -2582,43 +2582,41 @@
 nt,nextSibling);
-%0D
 %0A%7D;%0D%0A%0D%0A/*
-%0D
 %0ACompute the int
@@ -2632,37 +2632,35 @@
 te of the widget
-%0D
 %0A*/
-%0D
 %0AWidget.prototyp
@@ -2675,33 +2675,32 @@
 e = function() %7B
-%0D
 %0A%09this.makeChild
@@ -2701,43 +2701,41 @@
 eChildWidgets();
-%0D
 %0A%7D;%0D%0A%0D%0A/*
-%0D
 %0ASet the value o
@@ -2746,33 +2746,32 @@
 context variable
-%0D
 %0Aname: name of t
@@ -2773,33 +2773,32 @@
  of the variable
-%0D
 %0Avalue: value of
@@ -2802,33 +2802,32 @@
  of the variable
-%0D
 %0Aparams: array o
@@ -2856,33 +2856,32 @@
 r each parameter
-%0D
 %0AisMacroDefiniti
@@ -2986,37 +2986,35 @@
 ution performed)
-%0D
 %0A*/
-%0D
 %0AWidget.prototyp
@@ -3068,33 +3068,32 @@
 croDefinition) %7B
-%0D
 %0A%09this.variables
@@ -3164,43 +3164,41 @@
 acroDefinition%7D;
-%0D
 %0A%7D;%0D%0A%0D%0A/*
-%0D
 %0AGet the prevail
@@ -3220,33 +3220,32 @@
 context variable
-%0D
 %0Aname: name of v
@@ -3243,33 +3243,32 @@
 name of variable
-%0D
 %0Aoptions: see be
@@ -3270,34 +3270,32 @@
 ee below
-%0D
 %0AOptions include
-%0D
 %0Aparams:
@@ -3330,33 +3330,32 @@
 r each parameter
-%0D
 %0AdefaultValue: d
@@ -3515,33 +3515,32 @@
 kitext variables
-%0D
 %0Atext: text of v
@@ -3576,37 +3576,35 @@
 erly substituted
-%0D
 %0A*/
-%0D
 %0AWidget.prototyp
@@ -3639,33 +3639,32 @@
 (name,options) %7B
-%0D
 %0A%09options = opti
@@ -3665,33 +3665,32 @@
 = options %7C%7C %7B%7D;
-%0D
 %0A%09var actualPara
@@ -3707,33 +3707,32 @@
 ns.params %7C%7C %5B%5D,
-%0D
 %0A%09%09parentWidget 
@@ -3743,33 +3743,32 @@
 is.parentWidget;
-%0D
 %0A%09// Check for t
@@ -3839,33 +3839,32 @@
 prototype chain)
-%0D
 %0A%09if(parentWidge
@@ -3893,33 +3893,32 @@
 get.variables) %7B
-%0D
 %0A%09%09var variable 
@@ -3940,33 +3940,32 @@
 variables%5Bname%5D,
-%0D
 %0A%09%09%09value = vari
@@ -3967,33 +3967,32 @@
  variable.value,
-%0D
 %0A%09%09%09params = thi
@@ -4041,33 +4041,32 @@
 s,actualParams);
-%0D
 %0A%09%09// Substitute
@@ -4100,33 +4100,32 @@
 n the definition
-%0D
 %0A%09%09$tw.utils.eac
@@ -4142,33 +4142,32 @@
 unction(param) %7B
-%0D
 %0A%09%09%09value = $tw.
@@ -4265,40 +4265,38 @@
 %22),param.value);
-%0D
 %0A%09%09%7D);
-%0D
 %0A%09%09// Only subst
@@ -4365,33 +4365,32 @@
 e %5Cdefine pragma
-%0D
 %0A%09%09if(variable.i
@@ -4400,33 +4400,32 @@
 croDefinition) %7B
-%0D
 %0A%09%09%09value = this
@@ -4464,51 +4464,47 @@
 lue);%09%09%09
-%0D
 %0A%09%09%7D
-%0D
 %0A%09%09return %7B
-%0D
 %0A%09%09%09text: value,
-%0D
 %0A%09%09%09para
@@ -4505,43 +4505,40 @@
 %09%09params: params
-%0D
 %0A%09%09%7D;
-%0D
 %0A%09%7D
-%0D
 %0A%09// If the vari
@@ -4605,28 +4605,26 @@
 o module
-%0D
 %0A%09return %7B
-%0D
 %0A%09%09text:
@@ -4688,32 +4688,29 @@
 ltValue)
-%0D
 %0A%09%7D;
-%0D
 %0A%7D;%0D%0A%0D%0A/*
-%0D
 %0ASimplif
@@ -4760,37 +4760,35 @@
 returns the text
-%0D
 %0A*/
-%0D
 %0AWidget.prototyp
@@ -4819,33 +4819,32 @@
 (name,options) %7B
-%0D
 %0A%09return this.ge
@@ -4868,33 +4868,32 @@
 e,options).text;
-%0D
 %0A%7D;%0D%0A%0D%0AWidget.pr
@@ -4957,33 +4957,32 @@
 ,actualParams) %7B
-%0D
 %0A%09formalParams =
@@ -4993,33 +4993,32 @@
 malParams %7C%7C %5B%5D;
-%0D
 %0A%09actualParams =
@@ -5029,33 +5029,32 @@
 ualParams %7C%7C %5B%5D;
-%0D
 %0A%09var nextAnonPa
@@ -5109,33 +5109,32 @@
 er in macro call
-%0D
 %0A%09%09paramInfo, pa
@@ -5142,34 +5142,32 @@
 amValue,
-%0D
 %0A%09%09results = %5B%5D;
-%0D
 %0A%09// Ste
@@ -5214,33 +5214,32 @@
 macro definition
-%0D
 %0A%09for(var p=0; p
@@ -5258,33 +5258,32 @@
 s.length; p++) %7B
-%0D
 %0A%09%09// Check if w
@@ -5324,33 +5324,32 @@
 th the same name
-%0D
 %0A%09%09paramInfo = f
@@ -5355,33 +5355,32 @@
 formalParams%5Bp%5D;
-%0D
 %0A%09%09paramValue = 
@@ -5381,33 +5381,32 @@
 lue = undefined;
-%0D
 %0A%09%09for(var m=0; 
@@ -5426,33 +5426,32 @@
 s.length; m++) %7B
-%0D
 %0A%09%09%09if(actualPar
@@ -5475,33 +5475,32 @@
 aramInfo.name) %7B
-%0D
 %0A%09%09%09%09paramValue 
@@ -5515,44 +5515,41 @@
 Params%5Bm%5D.value;
-%0D
 %0A%09%09%09%7D
-%0D
 %0A%09%09%7D
-%0D
 %0A%09%09// If not, us
@@ -5591,33 +5591,32 @@
 o call parameter
-%0D
 %0A%09%09while(nextAno
@@ -5682,33 +5682,32 @@
 rameter%5D.name) %7B
-%0D
 %0A%09%09%09nextAnonPara
@@ -5706,38 +5706,36 @@
 AnonParameter++;
-%0D
 %0A%09%09%7D
-%0D
 %0A%09%09if(paramValue
@@ -5786,33 +5786,32 @@
 Params.length) %7B
-%0D
 %0A%09%09%09paramValue =
@@ -5843,38 +5843,36 @@
 ameter++%5D.value;
-%0D
 %0A%09%09%7D
-%0D
 %0A%09%09// If we've s
@@ -5908,33 +5908,32 @@
  default, if any
-%0D
 %0A%09%09paramValue = 
@@ -5965,33 +5965,32 @@
 default%22%5D %7C%7C %22%22;
-%0D
 %0A%09%09// Store the 
@@ -6005,33 +6005,32 @@
 r name and value
-%0D
 %0A%09%09results.push(
@@ -6064,37 +6064,35 @@
 e: paramValue%7D);
-%0D
 %0A%09%7D
-%0D
 %0A%09return results
@@ -6084,33 +6084,32 @@
 %09return results;
-%0D
 %0A%7D;%0D%0A%0D%0AWidget.pr
@@ -6155,33 +6155,32 @@
 function(text) %7B
-%0D
 %0A%09var self = thi
@@ -6173,33 +6173,32 @@
 var self = this;
-%0D
 %0A%09return (text %7C
@@ -6259,33 +6259,32 @@
 offset,string) %7B
-%0D
 %0A%09%09return self.g
@@ -6309,39 +6309,37 @@
 aultValue: %22%22%7D);
-%0D
 %0A%09%7D);
-%0D
 %0A%7D;%0D%0A%0D%0AWidget.pr
@@ -6402,33 +6402,32 @@
 ,defaultValue) %7B
-%0D
 %0A%09if($tw.utils.h
@@ -6440,33 +6440,32 @@
 .macros,name)) %7B
-%0D
 %0A%09%09var macro = $
@@ -6480,32 +6480,30 @@
 s%5Bname%5D,
-%0D
 %0A%09%09%09args = %5B%5D;
-%0D
 %0A%09%09if(ma
@@ -6518,33 +6518,32 @@
 ms.length %3E 0) %7B
-%0D
 %0A%09%09%09var nextAnon
@@ -6600,33 +6600,32 @@
 er in macro call
-%0D
 %0A%09%09%09%09paramInfo, 
@@ -6627,33 +6627,32 @@
 nfo, paramValue;
-%0D
 %0A%09%09%09// Step thro
@@ -6693,33 +6693,32 @@
 macro definition
-%0D
 %0A%09%09%09for(var p=0;
@@ -6739,33 +6739,32 @@
 s.length; p++) %7B
-%0D
 %0A%09%09%09%09// Check if
@@ -6807,33 +6807,32 @@
 th the same name
-%0D
 %0A%09%09%09%09paramInfo =
@@ -6840,33 +6840,32 @@
 macro.params%5Bp%5D;
-%0D
 %0A%09%09%09%09paramValue 
@@ -6868,33 +6868,32 @@
 lue = undefined;
-%0D
 %0A%09%09%09%09for(var m=0
@@ -6915,33 +6915,32 @@
 s.length; m++) %7B
-%0D
 %0A%09%09%09%09%09if(actualP
@@ -6966,33 +6966,32 @@
 aramInfo.name) %7B
-%0D
 %0A%09%09%09%09%09%09paramValu
@@ -7016,32 +7016,29 @@
 %5D.value;
-%0D
 %0A%09%09%09%09%09%7D
-%0D
 %0A%09%09%09%09%7D
-%0D
 %0A%09%09%09%09// 
@@ -7090,33 +7090,32 @@
 o call parameter
-%0D
 %0A%09%09%09%09while(nextA
@@ -7183,33 +7183,32 @@
 rameter%5D.name) %7B
-%0D
 %0A%09%09%09%09%09nextAnonPa
@@ -7209,40 +7209,38 @@
 AnonParameter++;
-%0D
 %0A%09%09%09%09%7D
-%0D
 %0A%09%09%09%09if(paramVal
@@ -7293,33 +7293,32 @@
 Params.length) %7B
-%0D
 %0A%09%09%09%09%09paramValue
@@ -7352,40 +7352,38 @@
 ameter++%5D.value;
-%0D
 %0A%09%09%09%09%7D
-%0D
 %0A%09%09%09%09// If we've
@@ -7421,33 +7421,32 @@
  default, if any
-%0D
 %0A%09%09%09%09paramValue 
@@ -7480,33 +7480,32 @@
 default%22%5D %7C%7C %22%22;
-%0D
 %0A%09%09%09%09// Save the
@@ -7506,33 +7506,32 @@
 ve the parameter
-%0D
 %0A%09%09%09%09args.push(p
@@ -7533,44 +7533,41 @@
 ush(paramValue);
-%0D
 %0A%09%09%09%7D
-%0D
 %0A%09%09%7D
-%0D
 %0A%09%09else for(var 
@@ -7592,33 +7592,32 @@
 s.length; ++i) %7B
-%0D
 %0A%09%09%09args.push(ac
@@ -7629,38 +7629,36 @@
 arams%5Bi%5D.value);
-%0D
 %0A%09%09%7D
-%0D
 %0A%09%09return (macro
@@ -7689,44 +7689,42 @@
  %22%22).toString();
-%0D
 %0A%09%7D else %7B
-%0D
 %0A%09%09return defaul
@@ -7722,47 +7722,44 @@
 rn defaultValue;
-%0D
 %0A%09%7D
-%0D
 %0A%7D;%0D%0A%0D%0A/*
-%0D
 %0ACheck whether a
@@ -7806,37 +7806,35 @@
 the parent chain
-%0D
 %0A*/
-%0D
 %0AWidget.prototyp
@@ -7863,33 +7863,32 @@
 on(name,value) %7B
-%0D
 %0A%09var node = thi
@@ -7889,33 +7889,31 @@
  = this;
-%0D
 %0A%09while(node) %7B
-%0D
 %0A%09%09if($t
@@ -7987,39 +7987,36 @@
 value) %7B
-%0D
 %0A%09%09%09return true;
-%0D
 %0A%09%09%7D
-%0D
 %0A%09%09node 
@@ -8035,47 +8035,43 @@
 tWidget;
-%0D
 %0A%09%7D
-%0D
 %0A%09return false;
-%0D
 %0A%7D;%0D%0A%0D%0A/*
-%0D
 %0AConstru
@@ -8168,37 +8168,35 @@
 the parent chain
-%0D
 %0A*/
-%0D
 %0AWidget.prototyp
@@ -8225,33 +8225,32 @@
 function(name) %7B
-%0D
 %0A%09this.qualifier
@@ -8284,33 +8284,32 @@
 ct.create(null);
-%0D
 %0A%09name = name %7C%7C
@@ -8316,33 +8316,32 @@
  %22transclusion%22;
-%0D
 %0A%09if(this.qualif
@@ -8345,33 +8345,32 @@
 lifiers%5Bname%5D) %7B
-%0D
 %0A%09%09return this.q
@@ -8377,44 +8377,42 @@
 ualifiers%5Bname%5D;
-%0D
 %0A%09%7D else %7B
-%0D
 %0A%09%09var output = 
@@ -8414,34 +8414,32 @@
 ut = %5B%5D,
-%0D
 %0A%09%09%09node = this;
-%0D
 %0A%09%09while
@@ -8459,33 +8459,32 @@
 .parentWidget) %7B
-%0D
 %0A%09%09%09if($tw.utils
@@ -8516,33 +8516,32 @@
 riables,name)) %7B
-%0D
 %0A%09%09%09%09output.push
@@ -8557,39 +8557,37 @@
 Variable(name));
-%0D
 %0A%09%09%09%7D
-%0D
 %0A%09%09%09node = node.
@@ -8591,38 +8591,36 @@
 de.parentWidget;
-%0D
 %0A%09%09%7D
-%0D
 %0A%09%09var value = $
@@ -8648,33 +8648,32 @@
 utput.join(%22%22));
-%0D
 %0A%09%09this.qualifie
@@ -8689,48 +8689,44 @@
 = value;
-%0D
 %0A%09%09return value;
-%0D
 %0A%09%7D
-%0D
 %0A%7D;%0D%0A%0D%0A/*
-%0D
 %0ACompute
@@ -8836,37 +8836,35 @@
 hat have changed
-%0D
 %0A*/
-%0D
 %0AWidget.prototyp
@@ -8889,33 +8889,32 @@
 s = function() %7B
-%0D
 %0A%09var changedAtt
@@ -8926,44 +8926,139 @@
 es = %7B%7D,
-%0D
 %0A%09%09self = this,
-%0D
 %0A%09%09value;
-%0D
 %0A
+%09if (!this.attributeGizmos) %7B%0A%09%09// First-time attribute preparation%0A%09%09this.attributeGizmos = %7B%7D;%0A%09
 %09$tw.uti
@@ -9121,515 +9121,1465 @@
 ,name) %7B
-%0D
 %0A%09%09
-if(
+%09// Does the 
 attribute
-.
+ 
 type 
-=== %22filtered%22) %7B%0D%0A%09%09%09value = self.wiki.filterTiddlers(attribute.filter,self)%5B0%5D %7C%7C %22%22;%0D%0A%09%09%7D else if(attribute.type === %22indirect%22) %7B%0D%0A%09%09%09value = self.wiki.getTextReference(attribute.textReference,%22%22,self.getVariable(%22currentTiddler%22)
+have a known module?%0A%09%09%09var AttributeClass = self.attributeClasses%5Battribute.type%5D;%0A%09%09%09if (AttributeClass) %7B%0A%09%09%09%09// Instantiate an attribute object.%0A%09%09%09%09self.attributeGizmos%5Bname%5D = new AttributeClass(self,attribute);%0A%09%09%09%09value = self.attributeGizmos%5Bname%5D.value;%0A%09%09%09%7D%0A%09%09%09else %7B%0A%09%09%09%09// Unknown attribute types are treated as strings.%0A%09%09%09%09// String attributes don't change after the first computeAttributes().%0A%09%09%09%09value = attribute.value;%0A%09%09%09%7D%0A%09%09%09// Is the value changed?%0A%09%09%09if (self.attributes%5Bname%5D !== value) %7B%0A%09%09%09%09self.attributes%5Bname%5D = value;%0A%09%09%09%09changedAttributes%5Bname%5D = true;%0A%09%09%09%7D%0A%09%09%09return true;%0A%09%09%7D
 );
-%0D
 %0A%09
-%09%7D 
+%7D
 else 
-if(attribute.type === %22macro%22
+%7B%0A%09%09// Fully recompute all dynamic attributes (no selectivity is available)%0A%09%09$tw.utils.each(this.attributeGizmos,function(gizmo,name
 ) %7B
-%0D
 %0A%09%09%09value = 
-self.getVariable(attribute.value.name,%7Bparams: attribute.value.params%7D);%0D%0A%09%09%7D else %7B // String attribute%0D%0A%09%09%09value = attribute.value;%0D%0A%09%09%7D%0D%0A%09%09// Check whether the attribute has changed%0D
+gizmo.compute();%0A%09%09%09if(self.attributes%5Bname%5D !== value) %7B%0A%09%09%09%09self.attributes%5Bname%5D = value;%0A%09%09%09%09changedAttributes%5Bname%5D = true;%0A%09%09%09%7D%0A%09%09%7D);%0A%09%7D%0A%09return changedAttributes;%0A%7D;%0D%0A%0D%0A/*%0ASelectively re-compute previously computed attributes. Returns a hashmap of the names of the attributes that have changed%0A*/%0AWidget.prototype.refreshAttributes = function(changedTiddlers) %7B%0A%09if (!this.attributeGizmos) return computeAttributes();%0A%09var changedAttributes = %7B%7D,%0A%09%09self = this,%0A%09%09value;%0A%09// Fully recompute all dynamic attributes (no selectivity is available)%0A%09$tw.utils.each(this.attributeGizmos,function(gizmo,name) %7B%0A%09%09value = gizmo.refresh(changedTiddlers);
 %0A%09%09if(se
@@ -10602,33 +10602,32 @@
 me%5D !== value) %7B
-%0D
 %0A%09%09%09self.attribu
@@ -10636,33 +10636,32 @@
 s%5Bname%5D = value;
-%0D
 %0A%09%09%09changedAttri
@@ -10671,44 +10671,41 @@
 es%5Bname%5D = true;
-%0D
 %0A%09%09%7D
-%0D
 %0A%09%7D);
-%0D
 %0A%09return changed
@@ -10707,43 +10707,41 @@
 angedAttributes;
-%0D
 %0A%7D;%0D%0A%0D%0A/*
-%0D
 %0ACheck for the p
@@ -10755,37 +10755,35 @@
  of an attribute
-%0D
 %0A*/
-%0D
 %0AWidget.prototyp
@@ -10807,33 +10807,32 @@
 function(name) %7B
-%0D
 %0A%09return $tw.uti
@@ -10852,43 +10852,41 @@
 ttributes,name);
-%0D
 %0A%7D;%0D%0A%0D%0A/*
-%0D
 %0AGet the value o
@@ -10891,37 +10891,35 @@
  of an attribute
-%0D
 %0A*/
-%0D
 %0AWidget.prototyp
@@ -10955,33 +10955,32 @@
 e,defaultText) %7B
-%0D
 %0A%09if($tw.utils.h
@@ -10998,33 +10998,32 @@
 ributes,name)) %7B
-%0D
 %0A%09%09return this.a
@@ -11030,44 +11030,42 @@
 ttributes%5Bname%5D;
-%0D
 %0A%09%7D else %7B
-%0D
 %0A%09%09return defaul
@@ -11062,47 +11062,44 @@
 urn defaultText;
-%0D
 %0A%09%7D
-%0D
 %0A%7D;%0D%0A%0D%0A/*
-%0D
 %0AAssign the comp
@@ -11132,33 +11132,32 @@
 get to a domNode
-%0D
 %0Aoptions include
@@ -11149,33 +11149,32 @@
 options include:
-%0D
 %0AexcludeEventAtt
@@ -11220,37 +11220,35 @@
 begins with %22on%22
-%0D
 %0A*/
-%0D
 %0AWidget.prototyp
@@ -11287,33 +11287,32 @@
 mNode,options) %7B
-%0D
 %0A%09options = opti
@@ -11313,33 +11313,32 @@
 = options %7C%7C %7B%7D;
-%0D
 %0A%09var self = thi
@@ -11331,33 +11331,32 @@
 var self = this;
-%0D
 %0A%09$tw.utils.each
@@ -11379,33 +11379,32 @@
 ,function(v,a) %7B
-%0D
 %0A%09%09// Check excl
@@ -11401,33 +11401,32 @@
 Check exclusions
-%0D
 %0A%09%09if(options.ex
@@ -11466,33 +11466,32 @@
 0,2) === %22on%22) %7B
-%0D
 %0A%09%09%09v = undefine
@@ -11484,38 +11484,36 @@
 %09%09v = undefined;
-%0D
 %0A%09%09%7D
-%0D
 %0A%09%09if(v !== unde
@@ -11512,33 +11512,32 @@
 !== undefined) %7B
-%0D
 %0A%09%09%09var b = a.sp
@@ -11537,33 +11537,32 @@
  = a.split(%22:%22);
-%0D
 %0A%09%09%09// Setting c
@@ -11630,27 +11630,25 @@
 element)
-%0D
 %0A%09%09%09try %7B
-%0D
 %0A%09%09%09%09if 
@@ -11674,33 +11674,32 @@
 %5B0%5D == %22xlink%22)%7B
-%0D
 %0A%09%09%09%09%09domNode.se
@@ -11750,31 +11750,29 @@
 b%5B1%5D,v);
-%0D
 %0A%09%09%09%09%7D else %7B
-%0D
 %0A%09%09%09%09%09do
@@ -11802,68 +11802,61 @@
 ll,a,v);
-%0D
 %0A%09%09%09%09%7D
-%0D
 %0A%09%09%09%7D catch(e) %7B
-%0D
 %0A%09%09%09%7D
-%0D
 %0A%09%09%7D
-%0D
 %0A%09%7D);
-%0D
 %0A%7D;%0D%0A%0D%0A/*
-%0D
 %0AMake ch
@@ -11899,37 +11899,35 @@
 d parseTreeNodes
-%0D
 %0A*/
-%0D
 %0AWidget.prototyp
@@ -11965,33 +11965,32 @@
 arseTreeNodes) %7B
-%0D
 %0A%09this.children 
@@ -11986,33 +11986,32 @@
 s.children = %5B%5D;
-%0D
 %0A%09var self = thi
@@ -12004,33 +12004,32 @@
 var self = this;
-%0D
 %0A%09$tw.utils.each
@@ -12112,33 +12112,32 @@
 ion(childNode) %7B
-%0D
 %0A%09%09self.children
@@ -12175,33 +12175,30 @@
 dNode));
-%0D
 %0A%09%7D);
-%0D
 %0A%7D;%0D%0A%0D%0A/*
-%0D
 %0AConstru
@@ -12231,37 +12231,35 @@
  parse tree node
-%0D
 %0A*/
-%0D
 %0AWidget.prototyp
@@ -12295,33 +12295,32 @@
 parseTreeNode) %7B
-%0D
 %0A%09var WidgetClas
@@ -12354,33 +12354,32 @@
 eTreeNode.type%5D;
-%0D
 %0A%09if(!WidgetClas
@@ -12374,33 +12374,32 @@
 (!WidgetClass) %7B
-%0D
 %0A%09%09WidgetClass =
@@ -12415,33 +12415,32 @@
 getClasses.text;
-%0D
 %0A%09%09parseTreeNode
@@ -12504,37 +12504,35 @@
 ode.type + %22'%22%7D;
-%0D
 %0A%09%7D
-%0D
 %0A%09return new Wid
@@ -12547,33 +12547,32 @@
 (parseTreeNode,%7B
-%0D
 %0A%09%09wiki: this.wi
@@ -12566,33 +12566,32 @@
 wiki: this.wiki,
-%0D
 %0A%09%09variables: %7B%7D
@@ -12583,33 +12583,32 @@
 %09%09variables: %7B%7D,
-%0D
 %0A%09%09parentWidget:
@@ -12605,33 +12605,32 @@
 entWidget: this,
-%0D
 %0A%09%09document: thi
@@ -12639,33 +12639,30 @@
 document
-%0D
 %0A%09%7D);
-%0D
 %0A%7D;%0D%0A%0D%0A/*
-%0D
 %0AGet the
@@ -12681,37 +12681,35 @@
 g of this widget
-%0D
 %0A*/
-%0D
 %0AWidget.prototyp
@@ -12728,33 +12728,32 @@
 g = function() %7B
-%0D
 %0A%09if(this.parent
@@ -12753,33 +12753,32 @@
 .parentWidget) %7B
-%0D
 %0A%09%09var index = t
@@ -12809,33 +12809,32 @@
 n.indexOf(this);
-%0D
 %0A%09%09if(index !== 
@@ -12877,33 +12877,32 @@
 dren.length-1) %7B
-%0D
 %0A%09%09%09return this.
@@ -12932,51 +12932,46 @@
 ndex+1%5D;
-%0D
 %0A%09%09%7D
-%0D
 %0A%09%7D
-%0D
 %0A%09return null;
-%0D
 %0A%7D;%0D%0A%0D%0A/*
-%0D
 %0AGet the
@@ -12994,37 +12994,35 @@
 g of this widget
-%0D
 %0A*/
-%0D
 %0AWidget.prototyp
@@ -13045,33 +13045,32 @@
 g = function() %7B
-%0D
 %0A%09if(this.parent
@@ -13070,33 +13070,32 @@
 .parentWidget) %7B
-%0D
 %0A%09%09var index = t
@@ -13126,33 +13126,32 @@
 n.indexOf(this);
-%0D
 %0A%09%09if(index !== 
@@ -13160,33 +13160,32 @@
  && index %3E 0) %7B
-%0D
 %0A%09%09%09return this.
@@ -13215,51 +13215,46 @@
 ndex-1%5D;
-%0D
 %0A%09%09%7D
-%0D
 %0A%09%7D
-%0D
 %0A%09return null;
-%0D
 %0A%7D;%0D%0A%0D%0A/*
-%0D
 %0ARender 
@@ -13285,37 +13285,35 @@
 get into the DOM
-%0D
 %0A*/
-%0D
 %0AWidget.prototyp
@@ -13361,108 +13361,84 @@
 bling) %7B
-%0D
 %0A%09
-var children = this.children;%0D%0A%09for(var i = 0; i %3C children.length; i++
+$tw.utils.each(this.children,function(childWidget
 ) %7B
-%0D
 %0A%09%09child
-ren%5Bi%5D
+Widget
 .render(
@@ -13457,32 +13457,30 @@
 ibling);
-%0D
 %0A%09%7D
+)
 ;
-%0D
 %0A%7D;%0D%0A%0D%0A/*
-%0D
 %0AAdd a l
@@ -13530,37 +13530,35 @@
 :,handler:%7D,...%5D
-%0D
 %0A*/
-%0D
 %0AWidget.prototyp
@@ -13592,33 +13592,32 @@
 ion(listeners) %7B
-%0D
 %0A%09var self = thi
@@ -13610,33 +13610,32 @@
 var self = this;
-%0D
 %0A%09$tw.utils.each
@@ -13661,33 +13661,32 @@
 (listenerInfo) %7B
-%0D
 %0A%09%09self.addEvent
@@ -13734,33 +13734,30 @@
 andler);
-%0D
 %0A%09%7D);
-%0D
 %0A%7D;%0D%0A%0D%0A/*
-%0D
 %0AAdd an 
@@ -13762,37 +13762,35 @@
 n event listener
-%0D
 %0A*/
-%0D
 %0AWidget.prototyp
@@ -13826,33 +13826,32 @@
 (type,handler) %7B
-%0D
 %0A%09var self = thi
@@ -13844,33 +13844,32 @@
 var self = this;
-%0D
 %0A%09if(typeof hand
@@ -13926,33 +13926,32 @@
 e on this widget
-%0D
 %0A%09%09this.eventLis
@@ -13974,33 +13974,32 @@
 unction(event) %7B
-%0D
 %0A%09%09%09return self%5B
@@ -14016,39 +14016,37 @@
 all(self,event);
-%0D
 %0A%09%09%7D;
-%0D
 %0A%09%7D else %7B // Th
@@ -14060,33 +14060,32 @@
 er is a function
-%0D
 %0A%09%09this.eventLis
@@ -14108,33 +14108,32 @@
 unction(event) %7B
-%0D
 %0A%09%09%09return handl
@@ -14152,37 +14152,33 @@
 ,event);
-%0D
 %0A%09%09%7D;
-%0D
 %0A%09%7D
-%0D
 %0A%7D;%0D%0A%0D%0A/*
-%0D
 %0ADispatc
@@ -14279,37 +14279,35 @@
 he parent widget
-%0D
 %0A*/
-%0D
 %0AWidget.prototyp
@@ -14333,33 +14333,32 @@
 unction(event) %7B
-%0D
 %0A%09// Dispatch th
@@ -14382,33 +14382,32 @@
 idget handles it
-%0D
 %0A%09var listener =
@@ -14439,34 +14439,32 @@
 t.type%5D;
-%0D
 %0A%09if(listener) %7B
-%0D
 %0A%09%09// Do
@@ -14509,33 +14509,32 @@
 r returned false
-%0D
 %0A%09%09if(!listener(
@@ -14534,33 +14534,32 @@
 stener(event)) %7B
-%0D
 %0A%09%09%09return false
@@ -14551,42 +14551,39 @@
 %09%09%09return false;
-%0D
 %0A%09%09%7D
-%0D
 %0A%09%7D
-%0D
 %0A%09// Dispatch th
@@ -14602,33 +14602,32 @@
 he parent widget
-%0D
 %0A%09if(this.parent
@@ -14627,33 +14627,32 @@
 .parentWidget) %7B
-%0D
 %0A%09%09return this.p
@@ -14684,46 +14684,42 @@
 (event);
-%0D
 %0A%09%7D
-%0D
 %0A%09return true;
-%0D
 %0A%7D;%0D%0A%0D%0A/*
-%0D
 %0ASelecti
@@ -14816,37 +14816,35 @@
 ded re-rendering
-%0D
 %0A*/
-%0D
 %0AWidget.prototyp
@@ -14874,33 +14874,32 @@
 angedTiddlers) %7B
-%0D
 %0A%09return this.re
@@ -14921,43 +14921,41 @@
 hangedTiddlers);
-%0D
 %0A%7D;%0D%0A%0D%0A/*
-%0D
 %0ARebuild a previ
@@ -14967,37 +14967,35 @@
  rendered widget
-%0D
 %0A*/
-%0D
 %0AWidget.prototyp
@@ -15014,33 +15014,32 @@
 f = function() %7B
-%0D
 %0A%09var nextSiblin
@@ -15064,33 +15064,32 @@
 iblingDomNode();
-%0D
 %0A%09this.removeChi
@@ -15093,33 +15093,32 @@
 ChildDomNodes();
-%0D
 %0A%09this.render(th
@@ -15139,43 +15139,41 @@
 de,nextSibling);
-%0D
 %0A%7D;%0D%0A%0D%0A/*
-%0D
 %0ARefresh all the
@@ -15185,37 +15185,35 @@
 dren of a widget
-%0D
 %0A*/
-%0D
 %0AWidget.prototyp
@@ -15259,49 +15259,34 @@
 dlers) %7B
-%0D
 %0A%09var 
-children = this.children,%0D
+self = this,
 %0A%09%09refre
@@ -15298,63 +15298,70 @@
 = false;
-%0D
 %0A%09
-for (var i = 0; i %3C children.length; i++
+$tw.utils.each(this.children,function(childWidget
 ) %7B
-%0D
 %0A%09%09refre
@@ -15372,22 +15372,22 @@
  = child
-ren%5Bi%5D
+Widget
 .refresh
@@ -15409,37 +15409,37 @@
 s) %7C%7C refreshed;
-%0D
 %0A%09%7D
-%0D
+);
 %0A%09return refresh
@@ -15433,43 +15433,41 @@
 eturn refreshed;
-%0D
 %0A%7D;%0D%0A%0D%0A/*
-%0D
 %0AFind the next s
@@ -15616,37 +15616,35 @@
  parent DOM node
-%0D
 %0A*/
-%0D
 %0AWidget.prototyp
@@ -15684,33 +15684,32 @@
 on(startIndex) %7B
-%0D
 %0A%09// Refer to th
@@ -15750,33 +15750,32 @@
 parents children
-%0D
 %0A%09var parent = t
@@ -15783,33 +15783,32 @@
 is.parentWidget,
-%0D
 %0A%09%09index = start
@@ -15864,33 +15864,32 @@
 n.indexOf(this);
-%0D
 %0Aif(index === -1
@@ -15883,33 +15883,32 @@
 (index === -1) %7B
-%0D
 %0A%09throw %22node no
@@ -15936,20 +15936,18 @@
 ildren%22;
-%0D
 %0A%7D
-%0D
 %0A%09// Loo
@@ -15976,33 +15976,32 @@
 e later siblings
-%0D
 %0A%09while(++index 
@@ -16019,33 +16019,32 @@
 ildren.length) %7B
-%0D
 %0A%09%09var domNode =
@@ -16086,34 +16086,32 @@
 mNode();
-%0D
 %0A%09%09if(domNode) %7B
-%0D
 %0A%09%09%09retu
@@ -16113,42 +16113,39 @@
 %09return domNode;
-%0D
 %0A%09%09%7D
-%0D
 %0A%09%7D
-%0D
 %0A%09// Go back and
@@ -16209,33 +16209,32 @@
  parent dom node
-%0D
 %0A%09var grandParen
@@ -16249,33 +16249,32 @@
 nt.parentWidget;
-%0D
 %0A%09if(grandParent
@@ -16315,33 +16315,32 @@
 parentDomNode) %7B
-%0D
 %0A%09%09index = grand
@@ -16363,33 +16363,32 @@
 indexOf(parent);
-%0D
 %0A%09%09if(index !== 
@@ -16384,33 +16384,32 @@
 (index !== -1) %7B
-%0D
 %0A%09%09%09return paren
@@ -16440,51 +16440,46 @@
 (index);
-%0D
 %0A%09%09%7D
-%0D
 %0A%09%7D
-%0D
 %0A%09return null;
-%0D
 %0A%7D;%0D%0A%0D%0A/*
-%0D
 %0AFind th
@@ -16524,37 +16524,35 @@
  or its children
-%0D
 %0A*/
-%0D
 %0AWidget.prototyp
@@ -16576,33 +16576,32 @@
 e = function() %7B
-%0D
 %0A%09// Return the 
@@ -16639,33 +16639,32 @@
 if we've got one
-%0D
 %0A%09if(this.domNod
@@ -16671,33 +16671,32 @@
 es.length %3E 0) %7B
-%0D
 %0A%09%09return this.d
@@ -16698,37 +16698,35 @@
 his.domNodes%5B0%5D;
-%0D
 %0A%09%7D
-%0D
 %0A%09// Otherwise, 
@@ -16746,33 +16746,32 @@
 all our children
-%0D
 %0A%09for(var t=0; t
@@ -16791,33 +16791,32 @@
 n.length; t++) %7B
-%0D
 %0A%09%09var domNode =
@@ -16852,34 +16852,32 @@
 mNode();
-%0D
 %0A%09%09if(domNode) %7B
-%0D
 %0A%09%09%09retu
@@ -16887,51 +16887,46 @@
 domNode;
-%0D
 %0A%09%09%7D
-%0D
 %0A%09%7D
-%0D
 %0A%09return null;
-%0D
 %0A%7D;%0D%0A%0D%0A/*
-%0D
 %0ARemove 
@@ -16969,37 +16969,35 @@
  or its children
-%0D
 %0A*/
-%0D
 %0AWidget.prototyp
@@ -17024,33 +17024,32 @@
 s = function() %7B
-%0D
 %0A%09// If this wid
@@ -17210,33 +17210,32 @@
 ally be the case
-%0D
 %0A%09if(this.domNod
@@ -17242,33 +17242,32 @@
 es.length %3E 0) %7B
-%0D
 %0A%09%09$tw.utils.eac
@@ -17293,33 +17293,32 @@
 ction(domNode) %7B
-%0D
 %0A%09%09%09domNode.pare
@@ -17337,40 +17337,38 @@
 eChild(domNode);
-%0D
 %0A%09%09%7D);
-%0D
 %0A%09%09this.domNodes
@@ -17373,28 +17373,26 @@
 es = %5B%5D;
-%0D
 %0A%09%7D else %7B
-%0D
 %0A%09%09// Ot
@@ -17439,33 +17439,32 @@
  their DOM nodes
-%0D
 %0A%09%09$tw.utils.eac
@@ -17494,33 +17494,32 @@
 n(childWidget) %7B
-%0D
 %0A%09%09%09childWidget.
@@ -17540,38 +17540,34 @@
 Nodes();
-%0D
 %0A%09%09%7D);
-%0D
 %0A%09%7D
-%0D
 %0A%7D;%0D%0A%0D%0A/*
-%0D
 %0AInvoke 
@@ -17620,37 +17620,35 @@
  current widget.
-%0D
 %0A*/
-%0D
 %0AWidget.prototyp
@@ -17691,33 +17691,32 @@
 gWidget,event) %7B
-%0D
 %0A%09var handled = 
@@ -17713,33 +17713,32 @@
 handled = false;
-%0D
 %0A%09// For each ch
@@ -17739,33 +17739,32 @@
 ach child widget
-%0D
 %0A%09for(var t=0; t
@@ -17784,33 +17784,32 @@
 n.length; t++) %7B
-%0D
 %0A%09%09var child = t
@@ -17816,33 +17816,32 @@
 his.children%5Bt%5D;
-%0D
 %0A%09%09// Invoke the
@@ -17864,33 +17864,32 @@
 an action widget
-%0D
 %0A%09%09if(child.invo
@@ -17891,33 +17891,32 @@
 .invokeAction) %7B
-%0D
 %0A%09%09%09child.refres
@@ -17915,33 +17915,32 @@
 d.refreshSelf();
-%0D
 %0A%09%09%09if(child.inv
@@ -17967,33 +17967,32 @@
 Widget,event)) %7B
-%0D
 %0A%09%09%09%09handled = t
@@ -17995,28 +17995,25 @@
  = true;
-%0D
 %0A%09%09%09%7D
-%0D
 %0A%09%09%7D
-%0D
 %0A%09%09// Pr
@@ -18054,33 +18054,32 @@
 if it permits it
-%0D
 %0A%09%09if(child.allo
@@ -18140,33 +18140,32 @@
 Widget,event)) %7B
-%0D
 %0A%09%09%09handled = tr
@@ -18167,26 +18167,23 @@
  = true;
-%0D
 %0A%09%09%7D
-%0D
 %0A%09%7D
-%0D
 %0A%09return
@@ -18191,27 +18191,25 @@
 handled;
-%0D
 %0A%7D;%0D%0A%0D%0A/*
-%0D
 %0AInvoke 
@@ -18246,21 +18246,19 @@
 a string
-%0D
 %0A*/
-%0D
 %0AWidget.
@@ -18332,33 +18332,32 @@
 ent,variables) %7B
-%0D
 %0A%09actions = acti
@@ -18358,33 +18358,32 @@
 = actions %7C%7C %22%22;
-%0D
 %0A%09var parser = t
@@ -18424,33 +18424,32 @@
 ywiki%22,actions,%7B
-%0D
 %0A%09%09%09parentWidget
@@ -18447,33 +18447,32 @@
 entWidget: this,
-%0D
 %0A%09%09%09document: th
@@ -18482,24 +18482,22 @@
 document
-%0D
 %0A%09%09%7D),
-%0D
 %0A%09%09widge
@@ -18525,33 +18525,32 @@
 eWidget(parser,%7B
-%0D
 %0A%09%09%09parentWidget
@@ -18548,33 +18548,32 @@
 entWidget: this,
-%0D
 %0A%09%09%09document: th
@@ -18576,33 +18576,32 @@
 : this.document,
-%0D
 %0A%09%09%09variables: v
@@ -18608,24 +18608,22 @@
 ariables
-%0D
 %0A%09%09%7D);
-%0D
 %0A%09var co
@@ -18659,33 +18659,32 @@
 eElement(%22div%22);
-%0D
 %0A%09widgetNode.ren
@@ -18695,33 +18695,32 @@
 container,null);
-%0D
 %0A%09return widgetN
@@ -18741,33 +18741,32 @@
 ons(this,event);
-%0D
 %0A%7D;%0D%0A%0D%0AWidget.pr
@@ -18810,32 +18810,30 @@
 tion() %7B
-%0D
 %0A%09return true;
-%0D
 %0A%7D;%0D%0A%0D%0Ae
@@ -18856,18 +18856,17 @@
 Widget;%0D%0A%0D%0A%7D)();
-%0D
 %0A
