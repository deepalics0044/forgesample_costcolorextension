var viewer;

function launchViewer(urn) {
  var options = {
    env: 'AutodeskProduction',
    getAccessToken: getForgeToken,
  };

  Autodesk.Viewing.Initializer(options, () => {
    viewer = new Autodesk.Viewing.GuiViewer3D(document.getElementById('forgeViewer'), { extensions: ['MyAwesomeExtension','HandleSelectionExtension','ModelSummaryExtension','Autodesk.Viewing.MarkupsCore','Autodesk.Viewing.MarkupsGui','Color'] });
  
    viewer.start();
    var documentId = 'urn:' + urn;
    Autodesk.Viewing.Document.load(documentId, onDocumentLoadSuccess, onDocumentLoadFailure);
  });
}

function onDocumentLoadSuccess(doc) {
  var viewables = doc.getRoot().getDefaultGeometry();
  viewer.loadDocumentNode(doc, viewables).then(i => {
    // documented loaded, any action?
  });
}

function onDocumentLoadFailure(viewerErrorCode) {
  console.error('onDocumentLoadFailure() - errorCode:' + viewerErrorCode);
}

function getForgeToken(callback) {
  fetch('/api/forge/oauth/token').then(res => {
    res.json().then(data => {
      callback(data.access_token, data.expires_in);
    });
  });
 function getAllLeafComponents(callback) {
    this.viewer.getObjectTree(function (tree) {
        let leaves = [];
        tree.enumNodeChildren(tree.getRootId(), function (dbId) {
            if (tree.getChildCount(dbId) === 0) {
                leaves.push(dbId);
            }
        }, true);
        callback(leaves);
    });
}
function getAllDbIds(viewer) {
  var instanceTree = viewer.model.getData().instanceTree;

  var allDbIdsStr = Object.keys(instanceTree.nodeAccess.dbIdToIndex);

  return allDbIdsStr.map(function(id) { return parseInt(id)});
}

}