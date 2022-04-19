var CreateNodeInteractor = function (graphView) {
    CreateNodeInteractor.superClass.constructor.call(this, graphView);                
};
ht.Default.def(CreateNodeInteractor, ht.graph.Interactor, {  
    handle_mousedown: function (e) {
        this.handle_touchstart(e);
    },
    handle_touchstart: function (e) {
        this.isLeftClick = ht.Default.isLeftButton(e) && ht.Default.getTouchCount(e) === 1;                 
    },    
    handle_mouseup: function (e) {
        this.handle_touchend(e);
    },
    handle_touchend: function (e) {
        var graphView = this._graphView;
        
        if(graphView.getDataAt(e) == null && !graphView._panning && this.isLeftClick && this._image){
            var node = new ht.Node();
            node.setPosition(graphView.getLogicalPoint(e));
            node.setParent(graphView.getCurrentSubGraph());
            node.setImage(this._image);
            graphView.getDataModel().add(node);   
            graphView.getSelectionModel().setSelection(node);
            delete this.isLeftClick;            
        }
    }
});
