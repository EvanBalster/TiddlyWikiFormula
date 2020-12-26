// created: 20180121073220273
// modified: 20190301000537294
// module-type: widget
// revision: 0
// tags: 
// title: $:/plugins/ebalster/modloader/widgets/action-createpatch.js
// type: application/javascript

/*\
title: $:/plugins/ebalster/modloader/widgets/action-createpatch.js
type: application/javascript
module-type: widget

Action widget to create a patch tiddler for use with the modloader.

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

var Widget = require("$:/core/modules/widgets/widget.js").widget;

var modutil = require("$:/plugins/ebalster/modloader/utils.js");
var diff    = modutil.diff;


var CreatePatchWidget = function(parseTreeNode,options) {
	this.initialise(parseTreeNode,options);
};

/*
Inherit from the base widget class
*/
CreatePatchWidget.prototype = new Widget();

/*
Render this widget into the DOM
*/
CreatePatchWidget.prototype.render = function(parent,nextSibling) {
	this.computeAttributes();
	this.execute();
};

/*
Compute the internal state of the widget
*/
CreatePatchWidget.prototype.execute = function() {
	this.patchSource = this.getAttribute("source");
	this.patchSourcePlugin = this.getAttribute("source-plugin");
	this.patchDestination = this.getAttribute("destination") || this.patchSource;
	this.patchOutput = this.getAttribute("output");
	this.actionSaveTitle = this.getAttribute("savetitle");
};

/*
Refresh the widget by ensuring our attributes are up to date
*/
CreatePatchWidget.prototype.refresh = function(changedTiddlers) {
	var changedAttributes = this.computeAttributes();
	if($tw.utils.count(changedAttributes) > 0) {
		this.refreshSelf();
		return true;
	}
	return this.refreshChildren(changedTiddlers);
};

/*
Invoke the action associated with this widget
*/
var ALERT_PREFIX = "!!Patch creation failed...\n\n";

CreatePatchWidget.prototype.invokeAction = function(triggeringWidget,event) {
	var self=this;
	var outTitle = this.patchOutput || this.wiki.generateNewTitle("ModloaderPatch");

	if (!this.patchSource) {
		modutil.showGenericAlert(ALERT_PREFIX + 
			"action-createpatch requires a `source` to be set.");
		return true;
	}

	// Grab the source tiddler (which must exist as a shadow).
	//   Source plugin will be guessed if not provided.
	var sourceTiddler = modutil.findOriginalShadow(
		this.patchSource,
		this.patchSourcePlugin);
	if (!sourceTiddler) {
		modutil.showGenericAlert(ALERT_PREFIX + 
			"Patch source `" + this.patchSource + "` not found in " +
			(this.patchSourcePlugin ? "source-plugin `" + this.patchSourcePlugin + "`" : "any plugin."));
		return true;
	}

	// Grab the destination tiddler (which must exist as a non-shadow or overriding shadow.)
	if (!$tw.wiki.tiddlerExists(this.patchDestination) &&
		$tw.wiki.getShadowSource(this.patchDestination) == sourceTiddler.source) {
		modutil.showGenericAlert(ALERT_PREFIX + 
			"Patch destination `" + this.patchDestination + "` refers to the target.");
		return true;
	}
	var destTiddler = $tw.wiki.getTiddler(this.patchDestination);
	if (!destTiddler)  {
		modutil.showGenericAlert(ALERT_PREFIX + 
			"Patch destination `" + this.patchDestination + "` doesn't exist.");
		return true;
	}

	//
	var sourceData = sourceTiddler.fields.text.replace(/(\n)(\n)/g, "\r$1\r$2") || "";
	var destData = destTiddler.fields.text.replace(/(\n)(\n)/g, "\r$1\r$2") || "";
	//var destData = destTiddler.fields.text || "";

	// Generate a diff and clean it up.
	var delta = diff.diff_main(sourceData, destData, false);
	diff.diff_cleanupSemantic(delta);

	// Generate the patch.
	var patch = diff.patch_make(sourceData, delta);
	patch = diff.patch_toText(patch);

	//var patch = diff.patch_make(sourceTiddler.fields.text, destTiddler.fields.text); // DBG

	// Generate fields for the patch tiddler.
	var fields = {
		text: patch,
		type: "text/x-patch",
		"modloader-target": String(this.patchSource),
		"modloader-source": String(sourceTiddler.source),
	};

	// Add the generated patch tiddler to the wiki.
	var tiddler = this.wiki.addTiddler(new $tw.Tiddler(
		this.wiki.getCreationFields(),
		fields,
		this.wiki.getModificationFields(),
		{title: outTitle}));

	// Set the title reference, possibly.
	if(this.actionSaveTitle) {
		this.wiki.setTextReference(this.actionSaveTitle,outTitle,this.getVariable("currentTiddler"));
	}
	return true; // Action was invoked
};

exports["action-createpatch"] = CreatePatchWidget;

})();
