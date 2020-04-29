@@ -78,33 +78,35 @@
 ule-type: widget
-%0A
+%0D%0A%0D
 %0AWidget base cla
@@ -99,33 +99,35 @@
 idget base class
-%0A
+%0D%0A%0D
 %0A%5C*/%0A(function()
@@ -119,33 +119,35 @@
 %5C*/%0A(function()%7B
-%0A
+%0D%0A%0D
 %0A/*jslint node: 
@@ -197,33 +197,35 @@
 */%0A%22use strict%22;
-%0A
+%0D%0A%0D
 %0A/*%0ACreate a wid
@@ -620,32 +620,33 @@
 Node,options) %7B%0A
+%09
 %09this.initialise
@@ -664,33 +664,35 @@
 ode,options);%0A%7D;
-%0A
+%0D%0A%0D
 %0A/*%0AInitialise w
@@ -2241,35 +2241,189 @@
 ;%0A%09%09%09%7D%0A%09%09%7D);%0A%09%7D%0A
-%7D;%0A
+%09// Hashmap of the attribute classes%0A%09if(!this.attributeClasses) %7B%0A%09%09Widget.prototype.attributeClasses = $tw.modules.applyMethods(%22attributevalue%22);%0A%09%7D%0A%7D;%0D%0A%0D
 %0A/*%0ARender this 
@@ -2585,33 +2585,35 @@
 nextSibling);%0A%7D;
-%0A
+%0D%0A%0D
 %0A/*%0ACompute the 
@@ -2704,33 +2704,35 @@
 ildWidgets();%0A%7D;
-%0A
+%0D%0A%0D
 %0A/*%0ASet the valu
@@ -3167,33 +3167,35 @@
 oDefinition%7D;%0A%7D;
-%0A
+%0D%0A%0D
 %0A/*%0AGet the prev
@@ -3389,33 +3389,35 @@
 e is not defined
-%0A
+%0D%0A%0D
 %0AReturns an obje
@@ -3437,33 +3437,35 @@
 ollowing fields:
-%0A
+%0D%0A%0D
 %0Aparams: array o
@@ -4687,33 +4687,35 @@
 ultValue)%0A%09%7D;%0A%7D;
-%0A
+%0D%0A%0D
 %0A/*%0ASimplified v
@@ -4871,33 +4871,35 @@
 ptions).text;%0A%7D;
-%0A
+%0D%0A%0D
 %0AWidget.prototyp
@@ -6087,33 +6087,35 @@
 turn results;%0A%7D;
-%0A
+%0D%0A%0D
 %0AWidget.prototyp
@@ -6317,33 +6317,35 @@
 e: %22%22%7D);%0A%09%7D);%0A%7D;
-%0A
+%0D%0A%0D
 %0AWidget.prototyp
@@ -7728,33 +7728,35 @@
 aultValue;%0A%09%7D%0A%7D;
-%0A
+%0D%0A%0D
 %0A/*%0ACheck whethe
@@ -8048,33 +8048,35 @@
 return false;%0A%7D;
-%0A
+%0D%0A%0D
 %0A/*%0AConstruct a 
@@ -8703,33 +8703,35 @@
 urn value;%0A%09%7D%0A%7D;
-%0A
+%0D%0A%0D
 %0A/*%0ACompute the 
@@ -8943,32 +8943,130 @@
  this,%0A%09%09value;%0A
+%09if (!this.attributeGizmos) %7B%0A%09%09// First-time attribute preparation%0A%09%09this.attributeGizmos = %7B%7D;%0A%09
 %09$tw.utils.each(
@@ -9124,501 +9124,1462 @@
 me) %7B%0A%09%09
-if(
+%09// Does the 
 attribute
-.
+ 
 type 
-=== %22filtered%22) %7B%0A%09%09%09value = self.wiki.filterTiddlers(attribute.filter,self)%5B0%5D %7C%7C %22%22;%0A%09%09%7D else if(attribute.type === %22indirect%22) %7B%0A%09%09%09value = self.wiki.getTextReference(attribute.textReference,%22%22,self.getVariable(%22currentTiddler%22));%0A%09%09%7D else if(attribute.type === %22macro%22) %7B%0A%09%09%09value = self.getVariable(attribute.value.name,%7Bparams: attribute.value.params%7D);%0A%09%09%7D else %7B // String attribute%0A%09%09%09value = attribute.value;%0A%09%09%7D%0A%09%09// Check whether the attribute has changed
+have a known module?%0A%09%09%09var AttributeClass = self.attributeClasses%5Battribute.type%5D;%0A%09%09%09if (AttributeClass) %7B%0A%09%09%09%09// Instantiate an attribute object.%0A%09%09%09%09self.attributeGizmos%5Bname%5D = new AttributeClass(self,attribute);%0A%09%09%09%09value = self.attributeGizmos%5Bname%5D.value;%0A%09%09%09%7D%0A%09%09%09else %7B%0A%09%09%09%09// Unknown attribute types are treated as strings.%0A%09%09%09%09// String attributes don't change after the first computeAttributes().%0A%09%09%09%09value = attribute.value;%0A%09%09%09%7D%0A%09%09%09// Is the value changed?%0A%09%09%09if (self.attributes%5Bname%5D !== value) %7B%0A%09%09%09%09self.attributes%5Bname%5D = value;%0A%09%09%09%09changedAttributes%5Bname%5D = true;%0A%09%09%09%7D%0A%09%09%09return true;%0A%09%09%7D);%0A%09%7Delse %7B%0A%09%09// Fully recompute all dynamic attributes (no selectivity is available)%0A%09%09$tw.utils.each(this.attributeGizmos,function(gizmo,name) %7B%0A%09%09%09value = gizmo.compute();%0A%09%09%09if(self.attributes%5Bname%5D !== value) %7B%0A%09%09%09%09self.attributes%5Bname%5D = value;%0A%09%09%09%09changedAttributes%5Bname%5D = true;%0A%09%09%09%7D%0A%09%09%7D);%0A%09%7D%0A%09return changedAttributes;%0A%7D;%0D%0A%0D%0A/*%0ASelectively re-compute previously computed attributes. Returns a hashmap of the names of the attributes that have changed%0A*/%0AWidget.prototype.refreshAttributes = function(changedTiddlers) %7B%0A%09if (!this.attributeGizmos) return computeAttributes();%0A%09var changedAttributes = %7B%7D,%0A%09%09self = this,%0A%09%09value;%0A%09// Fully recompute all dynamic attributes (no selectivity is available)%0A%09$tw.utils.each(this.attributeGizmos,function(gizmo,name) %7B%0A%09%09value = gizmo.refresh(changedTiddlers);
 %0A%09%09if(se
@@ -10710,33 +10710,35 @@
 edAttributes;%0A%7D;
-%0A
+%0D%0A%0D
 %0A/*%0ACheck for th
@@ -10855,33 +10855,35 @@
 ibutes,name);%0A%7D;
-%0A
+%0D%0A%0D
 %0A/*%0AGet the valu
@@ -11068,33 +11068,35 @@
 faultText;%0A%09%7D%0A%7D;
-%0A
+%0D%0A%0D
 %0A/*%0AAssign the c
@@ -11833,33 +11833,35 @@
 %09%09%09%7D%0A%09%09%7D%0A%09%7D);%0A%7D;
-%0A
+%0D%0A%0D
 %0A/*%0AMake child w
@@ -12175,33 +12175,35 @@
 dNode));%0A%09%7D);%0A%7D;
-%0A
+%0D%0A%0D
 %0A/*%0AConstruct th
@@ -12639,33 +12639,35 @@
 document%0A%09%7D);%0A%7D;
-%0A
+%0D%0A%0D
 %0A/*%0AGet the next
@@ -12948,33 +12948,35 @@
 %09return null;%0A%7D;
-%0A
+%0D%0A%0D
 %0A/*%0AGet the prev
@@ -13231,33 +13231,35 @@
 %09return null;%0A%7D;
-%0A
+%0D%0A%0D
 %0A/*%0ARender the c
@@ -13363,103 +13363,82 @@
 ing) %7B%0A%09
-var children = this.children;%0A%09for(var i = 0; i %3C children.length; i++
+$tw.utils.each(this.children,function(childWidget
 ) %7B%0A%09%09child
-ren%5Bi%5D
+Widget
 .render(
@@ -13452,37 +13452,40 @@
 nextSibling);%0A%09%7D
+)
 ;%0A%7D;
-%0A
+%0D%0A%0D
 %0A/*%0AAdd a list o
@@ -13734,33 +13734,35 @@
 andler);%0A%09%7D);%0A%7D;
-%0A
+%0D%0A%0D
 %0A/*%0AAdd an event
@@ -14155,33 +14155,35 @@
 ent);%0A%09%09%7D;%0A%09%7D%0A%7D;
-%0A
+%0D%0A%0D
 %0A/*%0ADispatch an 
@@ -14696,33 +14696,35 @@
 %09return true;%0A%7D;
-%0A
+%0D%0A%0D
 %0A/*%0ASelectively 
@@ -14924,33 +14924,35 @@
 gedTiddlers);%0A%7D;
-%0A
+%0D%0A%0D
 %0A/*%0ARebuild a pr
@@ -15142,33 +15142,35 @@
 nextSibling);%0A%7D;
-%0A
+%0D%0A%0D
 %0A/*%0ARefresh all 
@@ -15265,104 +15265,100 @@
  %7B%0A%09var 
-children = this.children,%0A%09%09refreshed = false;%0A%09for (var i = 0; i %3C children.length; i++
+self = this,%0A%09%09refreshed = false;%0A%09$tw.utils.each(this.children,function(childWidget
 ) %7B%0A%09%09re
@@ -15372,22 +15372,22 @@
  = child
-ren%5Bi%5D
+Widget
 .refresh
@@ -15412,32 +15412,34 @@
 %7C%7C refreshed;%0A%09%7D
+);
 %0A%09return refresh
@@ -15436,33 +15436,35 @@
 rn refreshed;%0A%7D;
-%0A
+%0D%0A%0D
 %0A/*%0AFind the nex
@@ -16456,33 +16456,35 @@
 %09return null;%0A%7D;
-%0A
+%0D%0A%0D
 %0A/*%0AFind the fir
@@ -16903,33 +16903,35 @@
 %09return null;%0A%7D;
-%0A
+%0D%0A%0D
 %0A/*%0ARemove any D
@@ -17544,33 +17544,35 @@
 s();%0A%09%09%7D);%0A%09%7D%0A%7D;
-%0A
+%0D%0A%0D
 %0A/*%0AInvoke the a
@@ -18186,33 +18186,35 @@
 turn handled;%0A%7D;
-%0A
+%0D%0A%0D
 %0A/*%0AInvoke the a
@@ -18744,33 +18744,35 @@
 (this,event);%0A%7D;
-%0A
+%0D%0A%0D
 %0AWidget.prototyp
@@ -18819,33 +18819,35 @@
 %09return true;%0A%7D;
-%0A
+%0D%0A%0D
 %0Aexports.widget 
@@ -18847,24 +18847,26 @@
 widget = Widget;
-%0A
+%0D%0A%0D
 %0A%7D)();%0A
