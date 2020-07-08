// *******************************************
// Model Summary Extension
// *******************************************
function ModelSummaryExtension(viewer, options) {
    Autodesk.Viewing.Extension.call(this, viewer, options);
    this.panel = null; // create the panel variable
}

ModelSummaryExtension.prototype = Object.create(Autodesk.Viewing.Extension.prototype);
ModelSummaryExtension.prototype.constructor = ModelSummaryExtension;

ModelSummaryExtension.prototype.load = function () {
    // any custom initialization required? add here
    return true;
};

ModelSummaryExtension.prototype.onToolbarCreated = function () {
    var _this = this;

    // prepare to execute the button action
    var modelSummaryToolbarButton = new Autodesk.Viewing.UI.Button('runModelSummaryCode');
    modelSummaryToolbarButton.onClick = function (e) {

        // **********************
        //
        //
        // Execute an action here
        //
        //
        // **********************

    };
    // modelSummaryToolbarButton CSS class should be defined on your .css file
    // you may include icons, below is a sample class:
    modelSummaryToolbarButton.addClass('modelSummaryToolbarButton');
    modelSummaryToolbarButton.setToolTip('Model Summary');

    // SubToolbar
    this.subToolbar = (this.viewer.toolbar.getControl("MyAppToolbar") ?
        this.viewer.toolbar.getControl("MyAppToolbar") :
        new Autodesk.Viewing.UI.ControlGroup('MyAppToolbar'));
    this.subToolbar.addControl(modelSummaryToolbarButton);

    this.viewer.toolbar.addControl(this.subToolbar);
};

ModelSummaryExtension.prototype.unload = function () {
    if (this.viewer.toolbar) this.viewer.toolbar.removeControl(this.subToolbar);
    if (this.panel) this.panel.setVisible(false);
    return true;
};

Autodesk.Viewing.theExtensionManager.registerExtension('ModelSummaryExtension', ModelSummaryExtension);